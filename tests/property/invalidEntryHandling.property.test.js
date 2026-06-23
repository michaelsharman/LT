/**
 * Property 6: Invalid Entry Error Handling and Continuation
 *
 * For any array containing a mix of valid Extension_Module objects and invalid entries
 * (entries without a `run()` method, non-string/non-object types, or descriptors with
 * a `module` lacking `run()`), the system SHALL log an error for each invalid entry
 * identifying it by name or index, skip it, and successfully process all valid entries
 * in the array.
 *
 * **Validates: Requirements 1.6, 6.4, 8.4**
 */
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';

// Mock the logger module to capture error calls
vi.mock('../../src/utils/logger.js', () => ({
    default: {
        debug: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        log: vi.fn(),
        warn: vi.fn(),
    },
}));

let runExtensions;
let logger;

beforeEach(async () => {
    const initMod = await import('../../src/utils/initExtensions.js');
    runExtensions = initMod.runExtensions;

    const loggerMod = await import('../../src/utils/logger.js');
    logger = loggerMod.default;
});

afterEach(() => {
    vi.restoreAllMocks();
});

/**
 * Arbitrary: generate a unique extension name (alphabetic, 3-10 chars)
 */
const extNameArb = fc.string({
    minLength: 3,
    maxLength: 10,
    unit: fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')),
});

/**
 * Arbitrary: generate an invalid entry (various invalid types).
 * Returns { entry, description } for debugging.
 */
const invalidEntryArb = fc.oneof(
    // Object without run() method (but may have a name)
    extNameArb.map(name => ({ entry: { name, noRun: true }, kind: 'object-no-run' })),
    // Number
    fc.integer().map(n => ({ entry: n, kind: 'number' })),
    // Boolean
    fc.boolean().map(b => ({ entry: b, kind: 'boolean' })),
    // null
    fc.constant({ entry: null, kind: 'null' }),
    // Descriptor with module lacking run()
    extNameArb.map(name => ({
        entry: { module: { name, noRun: true } },
        kind: 'descriptor-no-run',
    })),
    // undefined
    fc.constant({ entry: undefined, kind: 'undefined' })
);

/**
 * Arbitrary: generates a mixed array with valid modules and invalid entries.
 * Returns { entries, validModules, invalidIndices }
 */
const mixedEntriesArb = fc
    .tuple(
        // Generate between 1-5 valid modules
        fc.integer({ min: 1, max: 5 }),
        // Generate between 1-5 invalid entries
        fc.integer({ min: 1, max: 5 })
    )
    .chain(([validCount, invalidCount]) => {
        const total = validCount + invalidCount;

        return fc
            .tuple(
                // Unique names for valid modules
                fc.uniqueArray(extNameArb, { minLength: validCount, maxLength: validCount }),
                // Invalid entries
                fc.array(invalidEntryArb, { minLength: invalidCount, maxLength: invalidCount }),
                // Positions for invalid entries within the total array (indices 0..total-1)
                fc.uniqueArray(fc.integer({ min: 0, max: total - 1 }), {
                    minLength: invalidCount,
                    maxLength: invalidCount,
                })
            )
            .map(([names, invalidItems, invalidPositions]) => {
                const invalidPosSet = new Set(invalidPositions);
                const entries = new Array(total);
                const validModules = [];
                const invalidIndices = [];

                let validIdx = 0;
                let invalidIdx = 0;

                for (let i = 0; i < total; i++) {
                    if (invalidPosSet.has(i)) {
                        entries[i] = invalidItems[invalidIdx].entry;
                        invalidIndices.push(i);
                        invalidIdx++;
                    } else {
                        const mod = {
                            name: names[validIdx],
                            run: vi.fn(),
                        };
                        entries[i] = mod;
                        validModules.push(mod);
                        validIdx++;
                    }
                }

                return { entries, validModules, invalidIndices };
            });
    });

describe('Property 6: Invalid Entry Error Handling and Continuation', () => {
    test('errors are logged for each invalid entry, invalid entries are skipped, and valid entries are processed', async () => {
        await fc.assert(
            fc.asyncProperty(mixedEntriesArb, async ({ entries, validModules, invalidIndices }) => {
                // Clear mocks from previous iteration
                logger.error.mockClear();
                logger.warn.mockClear();

                const LT = {};

                await runExtensions(LT, entries, 'assessment', {
                    collectCSS: false,
                    registry: null,
                });

                // 1. logger.error was called for each invalid entry
                expect(
                    logger.error.mock.calls.length,
                    `Expected ${invalidIndices.length} error(s) but got ${logger.error.mock.calls.length}`
                ).toBeGreaterThanOrEqual(invalidIndices.length);

                // 2. Invalid entries were skipped — they should NOT appear in LT.extensions
                // (Invalid entries either have no name or if they do, they shouldn't be registered)
                for (const idx of invalidIndices) {
                    const entry = entries[idx];
                    if (entry && entry.name) {
                        expect(LT.extensions[entry.name], `Invalid entry "${entry.name}" should NOT be registered`).toBeUndefined();
                    }
                }

                // 3. All valid entries had their run() called exactly once
                for (const mod of validModules) {
                    expect(mod.run, `Valid module "${mod.name}" run() should be called exactly once`).toHaveBeenCalledTimes(1);
                }

                // 4. Valid entries are registered on LT.extensions
                for (const mod of validModules) {
                    expect(LT.extensions[mod.name], `Valid module "${mod.name}" should be registered on LT.extensions`).toBe(mod);
                }
            }),
            { numRuns: 100 }
        );
    });
});
