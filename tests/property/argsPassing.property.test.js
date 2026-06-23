/**
 * Property 2: Args Passing from Descriptors
 *
 * For any extension descriptor with a `module` property and an `args` property,
 * if `args` is an array it SHALL be spread as positional parameters to `run()`,
 * if `args` is a non-array value it SHALL be passed as a single argument,
 * and if `args` is undefined/omitted the `run()` SHALL be called with no arguments.
 *
 * **Validates: Requirements 1.2, 6.1, 6.2**
 */
import { describe, test, expect, beforeEach, vi } from 'vitest';
import * as fc from 'fast-check';

import { runExtensions } from '../../src/utils/initExtensions.js';

describe('Property 2: Args Passing from Descriptors', () => {
    let LT;

    beforeEach(() => {
        LT = { extensions: {} };
    });

    test('array args are spread as positional parameters to run()', async () => {
        await fc.assert(
            fc.asyncProperty(fc.array(fc.jsonValue(), { minLength: 0, maxLength: 5 }), async argsArray => {
                const receivedArgs = [];
                const ext = {
                    name: 'testExt',
                    run: (...args) => {
                        receivedArgs.push(...args);
                    },
                };

                const descriptor = { module: ext, args: argsArray };

                LT = { extensions: {} };
                await runExtensions(LT, [descriptor], 'assessment', {
                    collectCSS: false,
                    registry: null,
                });

                // Array args should be spread as positional parameters
                expect(receivedArgs.length).toBe(argsArray.length);
                for (let i = 0; i < argsArray.length; i++) {
                    expect(receivedArgs[i]).toEqual(argsArray[i]);
                }
            }),
            { numRuns: 100 }
        );
    });

    test('single non-array value is passed as one argument', async () => {
        // Generate non-array, non-undefined single values
        const singleValueArb = fc.oneof(fc.integer(), fc.string(), fc.boolean(), fc.constant(null), fc.record({ key: fc.string() }));

        await fc.assert(
            fc.asyncProperty(singleValueArb, async singleValue => {
                const receivedArgs = [];
                const ext = {
                    name: 'testExt',
                    run: (...args) => {
                        receivedArgs.push(...args);
                    },
                };

                const descriptor = { module: ext, args: singleValue };

                LT = { extensions: {} };
                await runExtensions(LT, [descriptor], 'assessment', {
                    collectCSS: false,
                    registry: null,
                });

                // Single non-array value should be passed as one argument
                expect(receivedArgs.length).toBe(1);
                expect(receivedArgs[0]).toEqual(singleValue);
            }),
            { numRuns: 100 }
        );
    });

    test('undefined/omitted args results in run() called with no arguments', async () => {
        await fc.assert(
            fc.asyncProperty(
                // Generate a unique name for each iteration to avoid dedup
                fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z]/.test(s)),
                async name => {
                    const receivedArgs = [];
                    const ext = {
                        name,
                        run: (...args) => {
                            receivedArgs.push(...args);
                        },
                    };

                    // Descriptor with args omitted (undefined)
                    const descriptor = { module: ext };

                    LT = { extensions: {} };
                    await runExtensions(LT, [descriptor], 'assessment', {
                        collectCSS: false,
                        registry: null,
                    });

                    // No args should be passed to run()
                    expect(receivedArgs.length).toBe(0);
                }
            ),
            { numRuns: 100 }
        );
    });
});
