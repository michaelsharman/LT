/**
 * Unit tests for src/utils/initExtensions.js
 *
 * Tests classifyEntry() for each entry type and runExtensions() polymorphic handling
 * including direct module invocation and CSS collection.
 *
 * Requirements traced: 1.1, 1.2, 1.3, 1.6, 6.1, 6.2, 6.4
 */
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';

// Mock the logger to suppress output and allow assertion
vi.mock('../../src/utils/logger.js', () => ({
    default: {
        debug: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        log: vi.fn(),
        warn: vi.fn(),
    },
}));

let classifyEntry;
let runExtensions;
let logger;

beforeEach(async () => {
    // Ensure performance.now() is available
    if (typeof performance === 'undefined') {
        globalThis.performance = { now: () => Date.now() };
    }
    // Clean window.__LT_PERF
    if (typeof window !== 'undefined') {
        delete window.__LT_PERF;
    }
    // Clean any leftover style elements
    const existing = document.head.querySelector('style#lt-extensions');
    if (existing) {
        existing.remove();
    }

    const mod = await import('../../src/utils/initExtensions.js');
    classifyEntry = mod.classifyEntry;
    runExtensions = mod.runExtensions;

    logger = (await import('../../src/utils/logger.js')).default;
});

afterEach(() => {
    const existing = document.head.querySelector('style#lt-extensions');
    if (existing) {
        existing.remove();
    }
    vi.restoreAllMocks();
});

// ─────────────────────────────────────────────────────────────────────────────
// classifyEntry()
// ─────────────────────────────────────────────────────────────────────────────

describe('classifyEntry()', () => {
    test('bare Extension_Module (has name + run) returns type "module"', () => {
        const mod = { name: 'magnifier', run: () => {} };
        const result = classifyEntry(mod);

        expect(result).toEqual({ type: 'module', module: mod, args: [] });
    });

    test('descriptor with module property returns type "descriptor"', () => {
        const mod = { name: 'readingMask', run: () => {} };
        const entry = { module: mod, args: ['arg1', 'arg2'] };
        const result = classifyEntry(entry);

        expect(result).toEqual({ type: 'descriptor', module: mod, args: ['arg1', 'arg2'] });
    });

    test('descriptor with module but no args returns args as undefined', () => {
        const mod = { name: 'ruler', run: () => {} };
        const entry = { module: mod };
        const result = classifyEntry(entry);

        expect(result).toEqual({ type: 'descriptor', module: mod, args: undefined });
    });

    test('string entry returns type "string"', () => {
        const result = classifyEntry('magnifier');

        expect(result).toEqual({ type: 'string', id: 'magnifier' });
    });

    test('empty string returns type "string"', () => {
        const result = classifyEntry('');

        expect(result).toEqual({ type: 'string', id: '' });
    });

    test('legacy descriptor (has id property) returns type "legacy-descriptor"', () => {
        const entry = { id: 'contentTabs', args: { option: true } };
        const result = classifyEntry(entry);

        expect(result).toEqual({ type: 'legacy-descriptor', id: 'contentTabs', args: { option: true } });
    });

    test('legacy descriptor without args returns args as undefined', () => {
        const entry = { id: 'readAloud' };
        const result = classifyEntry(entry);

        expect(result).toEqual({ type: 'legacy-descriptor', id: 'readAloud', args: undefined });
    });

    test('number returns type "invalid"', () => {
        const result = classifyEntry(42);

        expect(result).toEqual({ type: 'invalid', entry: 42 });
    });

    test('null returns type "invalid"', () => {
        const result = classifyEntry(null);

        expect(result).toEqual({ type: 'invalid', entry: null });
    });

    test('undefined returns type "invalid"', () => {
        const result = classifyEntry(undefined);

        expect(result).toEqual({ type: 'invalid', entry: undefined });
    });

    test('object without name/run/module/id returns type "invalid"', () => {
        const entry = { foo: 'bar', baz: 123 };
        const result = classifyEntry(entry);

        expect(result).toEqual({ type: 'invalid', entry });
    });

    test('boolean returns type "invalid"', () => {
        const result = classifyEntry(true);

        expect(result).toEqual({ type: 'invalid', entry: true });
    });

    test('priority: object with name+run takes precedence over module property', () => {
        // An object that has both name+run AND module property — should be classified as 'module'
        const entry = { name: 'test', run: () => {}, module: { name: 'other', run: () => {} } };
        const result = classifyEntry(entry);

        expect(result.type).toBe('module');
        expect(result.module).toBe(entry);
    });

    test('priority: descriptor (has module) takes precedence over id property', () => {
        const mod = { name: 'foo', run: () => {} };
        const entry = { module: mod, id: 'bar', args: [] };
        const result = classifyEntry(entry);

        expect(result.type).toBe('descriptor');
        expect(result.module).toBe(mod);
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// runExtensions() — direct module invocation (no registry interaction)
// ─────────────────────────────────────────────────────────────────────────────

describe('runExtensions() - module entries invoke run() directly', () => {
    test('invokes run() on a bare module without registry interaction', async () => {
        const runFn = vi.fn();
        const mod = { name: 'directExt', run: runFn };
        const LT = {};

        await runExtensions(LT, [mod], 'assessment', {
            collectCSS: false,
            registry: null,
        });

        expect(runFn).toHaveBeenCalledTimes(1);
        expect(LT.extensions.directExt).toBe(mod);
    });

    test('multiple modules are invoked in array order', async () => {
        const order = [];
        const modA = { name: 'alpha', run: vi.fn(() => order.push('alpha')) };
        const modB = { name: 'beta', run: vi.fn(() => order.push('beta')) };
        const modC = { name: 'gamma', run: vi.fn(() => order.push('gamma')) };
        const LT = {};

        await runExtensions(LT, [modA, modB, modC], 'assessment', {
            collectCSS: false,
            registry: null,
        });

        expect(order).toEqual(['alpha', 'beta', 'gamma']);
        expect(modA.run).toHaveBeenCalledTimes(1);
        expect(modB.run).toHaveBeenCalledTimes(1);
        expect(modC.run).toHaveBeenCalledTimes(1);
    });

    test('descriptor args as array are spread to run()', async () => {
        const runFn = vi.fn();
        const mod = { name: 'withArgs', run: runFn };
        const entry = { module: mod, args: ['a', 'b', 'c'] };
        const LT = {};

        await runExtensions(LT, [entry], 'assessment', {
            collectCSS: false,
            registry: null,
        });

        expect(runFn).toHaveBeenCalledWith('a', 'b', 'c');
    });

    test('descriptor args as single value is passed as one argument', async () => {
        const runFn = vi.fn();
        const mod = { name: 'singleArg', run: runFn };
        const entry = { module: mod, args: { option: true } };
        const LT = {};

        await runExtensions(LT, [entry], 'assessment', {
            collectCSS: false,
            registry: null,
        });

        expect(runFn).toHaveBeenCalledWith({ option: true });
    });

    test('descriptor with no args calls run() with no arguments', async () => {
        const runFn = vi.fn();
        const mod = { name: 'noArgs', run: runFn };
        const entry = { module: mod };
        const LT = {};

        await runExtensions(LT, [entry], 'assessment', {
            collectCSS: false,
            registry: null,
        });

        expect(runFn).toHaveBeenCalledWith();
    });

    test('bare module run() receives no arguments', async () => {
        const runFn = vi.fn();
        const mod = { name: 'bareNoArgs', run: runFn };
        const LT = {};

        await runExtensions(LT, [mod], 'assessment', {
            collectCSS: false,
            registry: null,
        });

        expect(runFn).toHaveBeenCalledWith();
    });

    test('invalid entries are skipped and logged, valid entries still run', async () => {
        const runFn = vi.fn();
        const validMod = { name: 'valid', run: runFn };
        const LT = {};

        await runExtensions(LT, [null, validMod, 42], 'assessment', {
            collectCSS: false,
            registry: null,
        });

        expect(runFn).toHaveBeenCalledTimes(1);
        expect(LT.extensions.valid).toBe(validMod);
        // Logger should have been called for invalid entries
        expect(logger.error).toHaveBeenCalled();
    });
});

// ─────────────────────────────────────────────────────────────────────────────
// runExtensions() — CSS collection
// ─────────────────────────────────────────────────────────────────────────────

describe('runExtensions() - CSS collection', () => {
    test('getStyles() method returns CSS that is collected and injected', async () => {
        const mod = {
            name: 'styledExt',
            run: () => {},
            getStyles: () => '.styledExt { color: red; }',
        };
        const LT = {};

        await runExtensions(LT, [mod], 'assessment', {
            collectCSS: true,
            registry: null,
        });

        const styleEl = document.head.querySelector('style#lt-extensions');
        expect(styleEl).not.toBeNull();
        expect(styleEl.textContent).toContain('/* styledExt */');
        expect(styleEl.textContent).toContain('.styledExt { color: red; }');
    });

    test('styles property is collected and injected', async () => {
        const mod = {
            name: 'propStyled',
            run: () => {},
            styles: '.propStyled { display: flex; }',
        };
        const LT = {};

        await runExtensions(LT, [mod], 'assessment', {
            collectCSS: true,
            registry: null,
        });

        const styleEl = document.head.querySelector('style#lt-extensions');
        expect(styleEl).not.toBeNull();
        expect(styleEl.textContent).toContain('/* propStyled */');
        expect(styleEl.textContent).toContain('.propStyled { display: flex; }');
    });

    test('CSS format is "/* name */\\n<css>" for each extension', async () => {
        const modA = {
            name: 'extA',
            run: () => {},
            getStyles: () => '.a { margin: 0; }',
        };
        const modB = {
            name: 'extB',
            run: () => {},
            styles: '.b { padding: 0; }',
        };
        const LT = {};

        await runExtensions(LT, [modA, modB], 'assessment', {
            collectCSS: true,
            registry: null,
        });

        const styleEl = document.head.querySelector('style#lt-extensions');
        const content = styleEl.textContent;

        // Each chunk follows "/* name */\n<css>" format
        expect(content).toContain('/* extA */\n.a { margin: 0; }');
        expect(content).toContain('/* extB */\n.b { padding: 0; }');
    });

    test('CSS chunks are in array order', async () => {
        const modA = { name: 'first', run: () => {}, styles: '.first {}' };
        const modB = { name: 'second', run: () => {}, styles: '.second {}' };
        const modC = { name: 'third', run: () => {}, styles: '.third {}' };
        const LT = {};

        await runExtensions(LT, [modA, modB, modC], 'assessment', {
            collectCSS: true,
            registry: null,
        });

        const content = document.head.querySelector('style#lt-extensions').textContent;
        const firstIdx = content.indexOf('/* first */');
        const secondIdx = content.indexOf('/* second */');
        const thirdIdx = content.indexOf('/* third */');

        expect(firstIdx).toBeLessThan(secondIdx);
        expect(secondIdx).toBeLessThan(thirdIdx);
    });

    test('both getStyles() and styles produce correct format in same array', async () => {
        const modGet = {
            name: 'getter',
            run: () => {},
            getStyles: () => '.getter { color: blue; }',
        };
        const modProp = {
            name: 'propper',
            run: () => {},
            styles: '.propper { color: green; }',
        };
        const LT = {};

        await runExtensions(LT, [modGet, modProp], 'assessment', {
            collectCSS: true,
            registry: null,
        });

        const content = document.head.querySelector('style#lt-extensions').textContent;
        expect(content).toContain('/* getter */\n.getter { color: blue; }');
        expect(content).toContain('/* propper */\n.propper { color: green; }');
    });

    test('modules without CSS do not create a style element', async () => {
        const mod = { name: 'noCss', run: () => {} };
        const LT = {};

        await runExtensions(LT, [mod], 'assessment', {
            collectCSS: true,
            registry: null,
        });

        const styleEl = document.head.querySelector('style#lt-extensions');
        expect(styleEl).toBeNull();
    });
});
