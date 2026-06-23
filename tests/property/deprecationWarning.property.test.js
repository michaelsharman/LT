/**
 * Property 8: Deprecation Warning for String-Based Loading on Core
 *
 * **Validates: Requirements 4.2**
 *
 * For any call to `runExtensions` without a provided registry (core path) where the
 * extensions array contains one or more string entries, the system SHALL emit exactly
 * one deprecation warning per call regardless of how many strings are in the array.
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

// Mock the dynamic import of extensionsRegistry.js to provide loaders for any string ID.
// This prevents actual file resolution and lets us control the registry for generated IDs.
vi.mock('../../src/utils/extensionsRegistry.js', () => {
    // Return a Proxy-based registry that provides a loader for any requested extension ID
    const createProxyRegistry = () =>
        new Proxy(
            {},
            {
                get(_, id) {
                    // Return a loader function that resolves to a valid Extension_Module
                    return () =>
                        Promise.resolve({
                            [id]: {
                                name: id,
                                run: () => {},
                            },
                        });
                },
            }
        );

    return {
        EXTENSIONS: {
            assessment: createProxyRegistry(),
            authoring: createProxyRegistry(),
        },
    };
});

/**
 * Arbitrary: generate a valid extension name string (alphabetic, 3-15 chars).
 * These represent string-based extension identifiers.
 */
const extStringIdArb = fc.string({
    minLength: 3,
    maxLength: 15,
    unit: fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')),
});

/**
 * Arbitrary: generate arrays of 1-10 string entries (extension IDs).
 */
const stringEntriesArb = fc.array(extStringIdArb, { minLength: 1, maxLength: 10 });

/**
 * Arbitrary: generate a valid Extension_Module object (bare module).
 */
const extensionModuleArb = fc
    .string({
        minLength: 3,
        maxLength: 15,
        unit: fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')),
    })
    .map(name => ({
        name: `mod_${name}`,
        run: vi.fn(),
    }));

/**
 * Arbitrary: generate arrays with 1-10 string entries, optionally interleaved
 * with Extension_Module objects to verify that modules don't affect the warning count.
 */
const mixedWithStringsArb = fc.tuple(stringEntriesArb, fc.array(extensionModuleArb, { minLength: 0, maxLength: 5 })).map(([strings, modules]) => {
    // Interleave strings and modules
    const combined = [];
    let si = 0;
    let mi = 0;
    while (si < strings.length || mi < modules.length) {
        if (si < strings.length) {
            combined.push(strings[si++]);
        }
        if (mi < modules.length) {
            combined.push(modules[mi++]);
        }
    }
    return { combined, stringCount: strings.length };
});

describe('Property 8: Deprecation Warning for String-Based Loading on Core', () => {
    let runExtensions;

    beforeEach(async () => {
        const initMod = await import('../../src/utils/initExtensions.js');
        runExtensions = initMod.runExtensions;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('exactly one deprecation warning is emitted per call regardless of string count', async () => {
        await fc.assert(
            fc.asyncProperty(stringEntriesArb, async stringEntries => {
                // Spy on console.warn
                const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

                const LT = {};

                await runExtensions(LT, stringEntries, 'assessment', {
                    collectCSS: false,
                    registry: null, // core path: no registry provided
                });

                // Filter for deprecation-specific warnings
                const deprecationWarnings = warnSpy.mock.calls.filter(call =>
                    call.some(arg => typeof arg === 'string' && arg.toLowerCase().includes('deprecat'))
                );

                // Exactly ONE deprecation warning regardless of how many strings
                expect(deprecationWarnings.length).toBe(1);

                warnSpy.mockRestore();
            }),
            { numRuns: 100 }
        );
    });

    test('exactly one deprecation warning when mixed with Extension_Module objects', async () => {
        await fc.assert(
            fc.asyncProperty(mixedWithStringsArb, async ({ combined, stringCount }) => {
                // Spy on console.warn
                const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

                const LT = {};

                await runExtensions(LT, combined, 'assessment', {
                    collectCSS: false,
                    registry: null, // core path: no registry provided
                });

                // Filter for deprecation-specific warnings
                const deprecationWarnings = warnSpy.mock.calls.filter(call =>
                    call.some(arg => typeof arg === 'string' && arg.toLowerCase().includes('deprecat'))
                );

                // Exactly ONE deprecation warning per call, regardless of string count
                expect(deprecationWarnings.length).toBe(1);

                // Verify the string count was > 0 (precondition)
                expect(stringCount).toBeGreaterThan(0);

                warnSpy.mockRestore();
            }),
            { numRuns: 100 }
        );
    });
});
