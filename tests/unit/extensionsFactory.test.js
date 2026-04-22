/**
 * Unit tests for src/utils/extensionsFactory.js.
 * Exercises createExtension and attachDependencies.
 */
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

let factory;

beforeEach(async () => {
    vi.resetModules();
    factory = await import('../../src/utils/extensionsFactory.js');
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('attachDependencies()', () => {
    test('stores LT, apiSecurity, and apiRequest references', () => {
        const lt = { tag: 'LT' };
        const security = { tag: 'sec' };
        const request = { tag: 'req' };

        factory.attachDependencies(lt, security, request);

        expect(factory.LT).toBe(lt);
        expect(factory.apiSecurity).toBe(security);
        expect(factory.apiRequest).toBe(request);
    });
});

describe('createExtension() - shape', () => {
    test('returns an object with name, run, hasRun and any extra methods', () => {
        const extra = { foo: () => 'bar' };
        const ext = factory.createExtension('myExt', () => {}, extra);

        expect(ext.name).toBe('myExt');
        expect(typeof ext.run).toBe('function');
        expect(typeof ext.hasRun).toBe('function');
        expect(ext.foo()).toBe('bar');
    });

    test('hasRun() is false before run is invoked', () => {
        const ext = factory.createExtension('x', () => {});
        expect(ext.hasRun()).toBe(false);
    });
});

describe('createExtension() - sync run', () => {
    test('invokes runFn with args and returns its value', () => {
        const runFn = vi.fn((a, b) => a + b);
        const ext = factory.createExtension('sum', runFn);

        const result = ext.run(2, 3);

        expect(runFn).toHaveBeenCalledWith(2, 3);
        expect(result).toBe(5);
        expect(ext.hasRun()).toBe(true);
    });

    test('does not re-invoke runFn on subsequent calls once hasRun is true', () => {
        const runFn = vi.fn(() => 'first');
        const ext = factory.createExtension('once', runFn);

        ext.run();
        const second = ext.run();

        expect(runFn).toHaveBeenCalledTimes(1);
        // On repeat calls, returns the cached resolved-promise (sync path).
        expect(second).toBeInstanceOf(Promise);
    });

    test('dispatches an extension:run CustomEvent on window with the module name', () => {
        const handler = vi.fn();
        window.addEventListener('extension:run', handler);

        const ext = factory.createExtension('dispatchMe', () => {});
        ext.run();

        expect(handler).toHaveBeenCalledTimes(1);
        const event = handler.mock.calls[0][0];
        expect(event).toBeInstanceOf(CustomEvent);
        expect(event.detail.name).toBe('dispatchMe');
        expect(typeof event.detail.timestamp).toBe('number');

        window.removeEventListener('extension:run', handler);
    });
});

describe('createExtension() - async run', () => {
    test('caches the in-flight promise so parallel calls share the same work', async () => {
        let resolveInner;
        const runFn = vi.fn(
            () =>
                new Promise(resolve => {
                    resolveInner = resolve;
                })
        );
        const ext = factory.createExtension('asyncOnce', runFn);

        const p1 = ext.run();
        const p2 = ext.run();

        expect(runFn).toHaveBeenCalledTimes(1);
        expect(p1).toBe(p2);

        resolveInner('done');
        await expect(p1).resolves.toBe('done');
    });

    test('returns the cached promise on subsequent calls after resolution', async () => {
        const runFn = vi.fn(async () => 'ok');
        const ext = factory.createExtension('asyncDone', runFn);

        await ext.run();
        const again = ext.run();

        expect(runFn).toHaveBeenCalledTimes(1);
        await expect(again).resolves.toBe('ok');
    });
});

describe('createExtension() - error handling', () => {
    test('throws synchronously and allows retry (hasRun stays false on throw)', () => {
        let attempts = 0;
        const runFn = vi.fn(() => {
            attempts += 1;
            if (attempts === 1) {
                throw new Error('first fail');
            }
            return 'recovered';
        });

        const ext = factory.createExtension('retry', runFn);

        expect(() => ext.run()).toThrow('first fail');
        expect(ext.hasRun()).toBe(false);

        const result = ext.run();

        expect(result).toBe('recovered');
        expect(ext.hasRun()).toBe(true);
        expect(runFn).toHaveBeenCalledTimes(2);
    });
});
