/**
 * Property 9: Unknown String Identifier Error Handling
 *
 * For any string identifier passed in the extensions array that does not match any key
 * in the provided registry (or the fallback registry), the system SHALL log an error
 * identifying the unrecognized name and continue processing remaining entries without throwing.
 *
 * **Validates: Requirements 4.4**
 */
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';

// Mock the logger module so we can spy on logger.error
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
 * Arbitrary: generate a valid extension name (alphabetic, 3-12 chars)
 */
const extNameArb = fc.string({
    minLength: 3,
    maxLength: 12,
    unit: fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')),
});

/**
 * Arbitrary: generate arrays mixing unknown string identifiers and valid Extension_Module objects.
 * Returns { entries, unknownStrings, validModules, registry }
 */
const mixedEntriesArb = fc
    .tuple(
        // Unknown string identifiers (1-5)
        fc.uniqueArray(extNameArb, { minLength: 1, maxLength: 5 }),
        // Valid module names (0-5)
        fc.uniqueArray(extNameArb, { minLength: 0, maxLength: 5 })
    )
    .filter(([unknowns, valids]) => {
        // Ensure no overlap between unknown strings and valid module names
        const unknownSet = new Set(unknowns);
        return valids.every(name => !unknownSet.has(name));
    })
    .chain(([unknownStrings, validNames]) => {
        // Generate a shuffled order for interleaving
        const totalLen = unknownStrings.length + validNames.length;
        return fc
            .shuffledSubarray(
                Array.from({ length: totalLen }, (_, i) => i),
                { minLength: totalLen, maxLength: totalLen }
            )
            .map(order => {
                // Build the entries array: interleave unknown strings and valid modules
                const unknownEntries = unknownStrings.map(s => ({ kind: 'unknown', value: s }));
                const validEntries = validNames.map(name => ({
                    kind: 'valid',
                    value: { name, run: vi.fn() },
                }));
                const allTagged = [...unknownEntries, ...validEntries];

                // Reorder by the shuffled order
                const entries = order.map(i => allTagged[i].value);
                const validModules = allTagged.filter(t => t.kind === 'valid').map(t => t.value);

                // Build a registry that does NOT contain any of the unknown strings
                // (empty for the 'assessment' type ensures all strings are unknown)
                const registry = { assessment: {} };

                return { entries, unknownStrings, validModules, registry };
            });
    });

describe('Property 9: Unknown String Identifier Error Handling', () => {
    test('an error is logged for each unrecognized string identifier, valid modules still run, and execution does not throw', async () => {
        await fc.assert(
            fc.asyncProperty(mixedEntriesArb, async ({ entries, unknownStrings, validModules, registry }) => {
                // Clear mocks from previous iteration
                logger.error.mockClear();
                logger.warn.mockClear();
                for (const mod of validModules) {
                    mod.run.mockClear();
                }

                const LT = { extensions: {} };

                // Should NOT throw
                await expect(
                    runExtensions(LT, entries, 'assessment', {
                        collectCSS: false,
                        registry,
                    })
                ).resolves.not.toThrow();

                // 1. logger.error is called for each unrecognized string identifier
                const errorCalls = logger.error.mock.calls;
                for (const unknownName of unknownStrings) {
                    const found = errorCalls.some(call => call.some(arg => typeof arg === 'string' && arg.includes(unknownName)));
                    expect(found, `Expected error logged for unknown string "${unknownName}"`).toBe(true);
                }

                // 2. Valid Extension_Module entries still have their run() called
                for (const mod of validModules) {
                    expect(mod.run, `Expected run() called for valid module "${mod.name}"`).toHaveBeenCalledTimes(1);
                }

                // 3. Valid modules are registered on LT.extensions
                for (const mod of validModules) {
                    expect(LT.extensions[mod.name]).toBe(mod);
                }
            }),
            { numRuns: 100 }
        );
    });
});
