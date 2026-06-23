/**
 * Property 7: Mixed Array Processing in Order
 *
 * For any array containing an arbitrary interleaving of Extension_Module objects,
 * extension descriptors, string identifiers, and legacy descriptors, the system
 * SHALL process each entry in its original array index order, applying the correct
 * resolution strategy for each type, and produce the same final state as if all
 * entries had been resolved to modules before processing.
 *
 * **Validates: Requirements 4.3, 8.1**
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

import { runExtensions } from '../../src/utils/initExtensions.js';

/**
 * Generate a unique extension name (alphanumeric starting with a letter).
 */
const extNameArb = fc.stringMatching(/^[a-z][a-z0-9]{1,12}$/);

describe('Property 7: Mixed Array Processing in Order', () => {
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

    test('all entry types are processed in array index order', async () => {
        // Arbitrary for the entry type tag
        const entryTypeArb = fc.constantFrom('module', 'descriptor', 'string', 'legacy-descriptor');

        // Generate an array of (name, entryType) pairs with unique names
        const mixedEntriesArb = fc
            .uniqueArray(extNameArb, { minLength: 1, maxLength: 10 })
            .chain(names => fc.tuple(fc.constant(names), fc.tuple(...names.map(() => entryTypeArb))));

        await fc.assert(
            fc.asyncProperty(mixedEntriesArb, async ([names, entryTypes]) => {
                // Track invocation order across all entries
                const callOrder = [];

                // Build the mock registry for string-based entries
                const registryLoaders = {};

                // Build the extensions array with mixed entry types
                const extensionsArray = names.map((name, i) => {
                    const type = entryTypes[i];
                    const runFn = () => {
                        callOrder.push(name);
                    };

                    switch (type) {
                        case 'module':
                            // Bare Extension_Module: { name, run }
                            return { name, run: runFn };

                        case 'descriptor':
                            // Descriptor: { module: { name, run }, args }
                            return { module: { name, run: runFn }, args: undefined };

                        case 'string':
                            // String identifier - needs registry entry
                            registryLoaders[name] = () => Promise.resolve({ [name]: { name, run: runFn } });
                            return name;

                        case 'legacy-descriptor':
                            // Legacy descriptor: { id, args }
                            registryLoaders[name] = () => Promise.resolve({ [name]: { name, run: runFn } });
                            return { id: name, args: undefined };

                        default:
                            return { name, run: runFn };
                    }
                });

                // Construct mock registry with assessment domain
                const mockRegistry = {
                    assessment: registryLoaders,
                };

                const LT = { extensions: {} };

                await runExtensions(LT, extensionsArray, 'assessment', {
                    collectCSS: false,
                    registry: mockRegistry,
                });

                // Verify: all entries processed in array index order
                expect(callOrder).toEqual(names);

                // Verify: all entries registered on LT.extensions
                for (const name of names) {
                    expect(LT.extensions[name]).toBeDefined();
                    expect(LT.extensions[name].name).toBe(name);
                }
            }),
            { numRuns: 100 }
        );
    });
});
