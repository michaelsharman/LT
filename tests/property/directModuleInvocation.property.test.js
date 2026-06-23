/**
 * Property-Based Test: Direct Module Invocation and Registration
 *
 * **Validates: Requirements 1.1, 1.7, 8.5**
 *
 * For any array of valid Extension_Module objects (each having a unique `name`
 * string and `run` function) passed to `runExtensions`, each module's `run()`
 * method SHALL be invoked exactly once in array order, and after completion each
 * module SHALL be registered at `LT.extensions[module.name]`.
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
 * Arbitrary that generates a unique set of Extension_Module names.
 * Names are non-empty ASCII strings without special chars to keep things deterministic.
 */
const extensionNameArb = fc.string({ minLength: 1, maxLength: 20 }).filter(s => s.trim().length > 0 && !s.includes(' '));

/**
 * Generates an array of unique extension names (1 to 20 modules).
 */
const uniqueNamesArb = fc.uniqueArray(extensionNameArb, { minLength: 1, maxLength: 20 });

describe('Property 1: Direct Module Invocation and Registration', () => {
    beforeEach(() => {
        // Ensure performance.now() is available
        if (typeof performance === 'undefined') {
            globalThis.performance = { now: () => Date.now() };
        }
        // Ensure window.__LT_PERF is clean
        if (typeof window !== 'undefined') {
            delete window.__LT_PERF;
        }
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('each module run() is called exactly once in array order and registered at LT.extensions[name]', async () => {
        const { runExtensions } = await import('../../src/utils/initExtensions.js');

        await fc.assert(
            fc.asyncProperty(uniqueNamesArb, async names => {
                // Track invocation order
                const callOrder = [];

                // Create Extension_Module objects with unique names and tracked run functions
                const modules = names.map(name => ({
                    name,
                    run: vi.fn(() => {
                        callOrder.splice(callOrder.length, 0, name);
                    }),
                }));

                // Create fresh LT object for each test run
                const LT = {};

                // Reset call order tracking
                callOrder.length = 0;

                // Execute runExtensions with collectCSS: false to simplify
                await runExtensions(LT, modules, 'assessment', {
                    collectCSS: false,
                    registry: null,
                });

                // Property 1a: Each run() called exactly once
                for (const mod of modules) {
                    expect(mod.run).toHaveBeenCalledTimes(1);
                }

                // Property 1b: Called in array order
                expect(callOrder).toEqual(names);

                // Property 1c: Each module registered at LT.extensions[module.name]
                for (const mod of modules) {
                    expect(LT.extensions[mod.name]).toBe(mod);
                }
            }),
            { numRuns: 100 }
        );
    });
});
