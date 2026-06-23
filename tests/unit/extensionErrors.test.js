/**
 * Unit tests for deprecation and error handling paths in initExtensions.js.
 *
 * Tests:
 * - Deprecation warning emitted once per call when strings passed without registry
 * - No deprecation warning when registry is provided
 * - Error logged for unknown string identifiers
 * - Error logged for entries without run() method
 * - Error logged for descriptor with invalid module (no run)
 *
 * Requirements traced: 4.2, 4.4, 1.6, 6.4, 8.4
 */
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock the logger module to capture error/warn calls
vi.mock('../../src/utils/logger.js', () => ({
    default: {
        debug: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        log: vi.fn(),
        warn: vi.fn(),
    },
}));

// Mock extensionsRegistry.js to provide loaders for known string IDs
vi.mock('../../src/utils/extensionsRegistry.js', () => {
    const knownExtensions = ['magnifier', 'readingMask', 'contentTabs'];

    const createRegistry = () => {
        const reg = {};
        for (const id of knownExtensions) {
            reg[id] = () =>
                Promise.resolve({
                    [id]: {
                        name: id,
                        run: vi.fn(),
                    },
                });
        }
        return reg;
    };

    return {
        EXTENSIONS: {
            assessment: createRegistry(),
            authoring: createRegistry(),
        },
    };
});

let runExtensions;
let logger;

beforeEach(async () => {
    vi.clearAllMocks();
    const initMod = await import('../../src/utils/initExtensions.js');
    runExtensions = initMod.runExtensions;

    const loggerMod = await import('../../src/utils/logger.js');
    logger = loggerMod.default;
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('Deprecation warning for string-based loading', () => {
    test('emits exactly one deprecation warning when strings passed without registry (core path)', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const LT = {};

        await runExtensions(LT, ['magnifier', 'readingMask', 'contentTabs'], 'assessment', {
            collectCSS: false,
            registry: null,
        });

        const deprecationCalls = warnSpy.mock.calls.filter(call => call.some(arg => typeof arg === 'string' && arg.toLowerCase().includes('deprecat')));

        expect(deprecationCalls.length).toBe(1);
        // Verify the warning message mentions deprecation and suggests using objects
        expect(deprecationCalls[0].join(' ')).toContain('deprecated');

        warnSpy.mockRestore();
    });

    test('emits no deprecation warning when registry is provided (bundle path)', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        const LT = {};

        // Build a registry that resolves the given strings
        const registry = {
            assessment: {
                magnifier: () => Promise.resolve({ magnifier: { name: 'magnifier', run: vi.fn() } }),
                readingMask: () => Promise.resolve({ readingMask: { name: 'readingMask', run: vi.fn() } }),
            },
        };

        await runExtensions(LT, ['magnifier', 'readingMask'], 'assessment', {
            collectCSS: false,
            registry,
        });

        const deprecationCalls = warnSpy.mock.calls.filter(call => call.some(arg => typeof arg === 'string' && arg.toLowerCase().includes('deprecat')));

        expect(deprecationCalls.length).toBe(0);

        warnSpy.mockRestore();
    });
});

describe('Error handling for unknown string identifiers', () => {
    test('logs error for a string not found in the provided registry', async () => {
        const LT = {};

        // Provide a registry that doesn't contain 'unknownExtension'
        const registry = {
            assessment: {
                magnifier: () => Promise.resolve({ magnifier: { name: 'magnifier', run: vi.fn() } }),
            },
        };

        await runExtensions(LT, ['unknownExtension'], 'assessment', {
            collectCSS: false,
            registry,
        });

        // logger.error should have been called with a message referencing the unknown name
        const errorCalls = logger.error.mock.calls;
        const hasUnknownError = errorCalls.some(call => call.some(arg => typeof arg === 'string' && arg.includes('unknownExtension')));

        expect(hasUnknownError).toBe(true);
    });

    test('continues processing valid entries after encountering unknown string', async () => {
        const LT = {};
        const validRun = vi.fn();

        const registry = {
            assessment: {
                validExt: () => Promise.resolve({ validExt: { name: 'validExt', run: validRun } }),
            },
        };

        await runExtensions(LT, ['unknownExt', 'validExt'], 'assessment', {
            collectCSS: false,
            registry,
        });

        // The valid extension should still have been run despite the unknown one preceding it
        expect(validRun).toHaveBeenCalledTimes(1);
        expect(LT.extensions.validExt).toBeDefined();
    });
});

describe('Error handling for entries without run() method', () => {
    test('logs error for an object with name but no run() method', async () => {
        const LT = {};

        const invalidEntry = { name: 'brokenExtension' };

        await runExtensions(LT, [invalidEntry], 'assessment', {
            collectCSS: false,
        });

        const errorCalls = logger.error.mock.calls;
        const hasError = errorCalls.some(call => call.some(arg => typeof arg === 'string' && (arg.includes('brokenExtension') || arg.includes('index 0'))));

        expect(hasError).toBe(true);
        // The invalid entry should NOT be registered
        expect(LT.extensions.brokenExtension).toBeUndefined();
    });

    test('logs error for descriptor with module lacking run() method', async () => {
        const LT = {};

        const invalidDescriptor = { module: { name: 'foo' } };

        await runExtensions(LT, [invalidDescriptor], 'assessment', {
            collectCSS: false,
        });

        const errorCalls = logger.error.mock.calls;
        const hasError = errorCalls.some(call => call.some(arg => typeof arg === 'string' && (arg.includes('foo') || arg.includes('run()'))));

        expect(hasError).toBe(true);
        // The invalid entry should NOT be registered
        expect(LT.extensions.foo).toBeUndefined();
    });

    test('valid entries still process when invalid entries are present', async () => {
        const LT = {};
        const validModule = { name: 'goodExt', run: vi.fn() };
        const invalidModule = { name: 'badExt' }; // no run()

        await runExtensions(LT, [invalidModule, validModule], 'assessment', {
            collectCSS: false,
        });

        // Valid module should have been run
        expect(validModule.run).toHaveBeenCalledTimes(1);
        expect(LT.extensions.goodExt).toBe(validModule);
        // Invalid module should not be registered
        expect(LT.extensions.badExt).toBeUndefined();
    });
});
