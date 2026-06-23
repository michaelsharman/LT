/**
 * Property-Based Test: Bundle Subset Filtering
 *
 * **Validates: Requirements 2.3**
 *
 * For any subset S of known extension name strings passed to the Bundle_Entry_Point's
 * `LT.init()`, only the extensions whose names are in S SHALL have their `run()` method
 * invoked, and `LT.extensions` SHALL contain exactly the keys in S after initialization.
 */
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';

// Mock the logger to suppress output during tests
vi.mock('../../src/utils/logger.js', () => ({
    default: {
        debug: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        log: vi.fn(),
        warn: vi.fn(),
    },
}));

/**
 * Arbitrary that generates a unique set of extension names (3-10).
 * Names are simple ASCII identifiers to keep things deterministic.
 */
const extensionNameArb = fc.string({ minLength: 1, maxLength: 15 }).filter(s => /^[a-zA-Z][a-zA-Z0-9]*$/.test(s));

const uniqueNamesArb = fc.uniqueArray(extensionNameArb, { minLength: 3, maxLength: 10 });

/**
 * Given a set of all names, generate a random non-empty subset (1 to N).
 */
function subsetArb(allNames) {
    return fc.subarray(allNames, { minLength: 1, maxLength: allNames.length }).map(subset => [...subset]);
}

describe('Property 10: Bundle Subset Filtering', () => {
    beforeEach(() => {
        if (typeof performance === 'undefined') {
            globalThis.performance = { now: () => Date.now() };
        }
        if (typeof window !== 'undefined') {
            delete window.__LT_PERF;
        }
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('only extensions in subset S have run() invoked and LT.extensions contains exactly keys in S', async () => {
        const { runExtensions } = await import('../../src/utils/initExtensions.js');

        await fc.assert(
            fc.asyncProperty(uniqueNamesArb, async allNames => {
                // Generate a random subset from allNames
                const subset = await fc.sample(subsetArb(allNames), 1)[0];

                // Track which extensions had run() called
                const runCalled = new Map();

                // Build a mock registry mapping each name to a loader function
                // Loader returns a module: { [name]: { name, run: mockFn } }
                const registry = {
                    assessment: {},
                };

                for (const name of allNames) {
                    const mockRun = vi.fn();
                    runCalled.set(name, mockRun);

                    registry.assessment[name] = async () => ({
                        [name]: {
                            name,
                            run: mockRun,
                        },
                    });
                }

                // Create fresh LT object
                const LT = {};

                // Call runExtensions with only the subset as string identifiers
                // and provide the registry (simulating bundle path)
                await runExtensions(LT, subset, 'assessment', {
                    collectCSS: false,
                    registry,
                });

                // Property 10a: Only extensions in S have run() invoked
                for (const name of subset) {
                    expect(runCalled.get(name)).toHaveBeenCalledTimes(1);
                }

                // Property 10b: Extensions NOT in S do NOT have run() invoked
                const notInSubset = allNames.filter(n => !subset.includes(n));
                for (const name of notInSubset) {
                    expect(runCalled.get(name)).not.toHaveBeenCalled();
                }

                // Property 10c: LT.extensions contains exactly the keys in S
                const registeredKeys = Object.keys(LT.extensions).sort();
                const expectedKeys = [...subset].sort();
                expect(registeredKeys).toEqual(expectedKeys);
            }),
            { numRuns: 100 }
        );
    });
});
