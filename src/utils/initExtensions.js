import { attachDependencies } from '../utils/extensionsFactory.js';
import logger from './logger.js';

/**
 * Lazily import the extensions registry only when needed (for string-based resolution).
 * This keeps the registry out of the static import graph for tree-shaking.
 */
async function getRegistry() {
    const mod = await import('./extensionsRegistry.js');

    return mod.EXTENSIONS;
}

/**
 * Classify an entry in the extensions array to determine its type and extract relevant data.
 *
 * @param {*} entry - An item from the extensions array
 * @returns {{ type: string, module?: object, args?: any, id?: string, entry?: * }}
 */
export function classifyEntry(entry) {
    // Bare Extension_Module: has name + run
    if (entry && typeof entry.run === 'function' && typeof entry.name === 'string') {
        return { type: 'module', module: entry, args: [] };
    }
    // Descriptor with module property: { module: ExtModule, args }
    if (entry && entry.module && typeof entry.module === 'object') {
        return { type: 'descriptor', module: entry.module, args: entry.args };
    }
    // Legacy string identifier
    if (typeof entry === 'string') {
        return { type: 'string', id: entry };
    }
    // Legacy object descriptor: { id: 'name', args }
    if (entry && typeof entry.id === 'string') {
        return { type: 'legacy-descriptor', id: entry.id, args: entry.args };
    }
    // Invalid
    return { type: 'invalid', entry };
}

const now = () => performance.now();

let PERF = null;

function getPerfBuffer() {
    if (!PERF) {
        PERF = window.__LT_PERF = window.__LT_PERF || [];
    }
    return PERF;
}

function perfPush(enabled, row) {
    if (!enabled) {
        return;
    }
    getPerfBuffer().push(row); // row: { id, phase, ms }
}

/**
 * table reporter with grouping + totals (no-op when disabled)
 */
export function reportExtensionPerf(enabled, { limit = 50 } = {}) {
    if (!enabled || !PERF || !PERF.length) {
        return;
    }

    const DP = 3;
    const f = 10 ** DP;
    const r = n => (Number.isFinite(n) ? Math.round((n + Number.EPSILON) * f) / f : n);
    const sum = (arr, key) => arr.reduce((acc, row) => acc + (Number.isFinite(row[key]) ? row[key] : 0), 0);

    // Aggregate by id
    const byId = new Map();

    for (const rec of PERF) {
        if (!byId.has(rec.id)) {
            byId.set(rec.id, []);
        }
        byId.get(rec.id).push(rec);
    }

    const rows = [];

    for (const [id, entries] of byId) {
        if (id === '__init__') {
            continue;
        }
        const acc = { id, importMs: 0, cssMs: 0, runMs: 0, totalMs: 0 };

        for (const e of entries) {
            if (e.phase === 'import') {
                acc.importMs += e.ms;
            } else if (e.phase === 'css') {
                acc.cssMs += e.ms;
            } else if (e.phase === 'run') {
                acc.runMs += e.ms;
            }
        }
        acc.totalMs = acc.importMs + acc.cssMs + acc.runMs;
        rows.push(acc);
    }

    rows.sort((a, b) => b.totalMs - a.totalMs);

    const view = rows.slice(0, limit).map(row => ({
        id: row.id,
        importMs: r(row.importMs),
        cssMs: r(row.cssMs),
        runMs: r(row.runMs),
        totalMs: r(row.totalMs),
    }));

    // totals row (computed from unrounded rows)
    view.push({
        id: 'TOTAL',
        importMs: r(sum(rows, 'importMs')),
        cssMs: r(sum(rows, 'cssMs')),
        runMs: r(sum(rows, 'runMs')),
        totalMs: r(sum(rows, 'totalMs')),
    });

    console.groupCollapsed('[LT] extension performance');
    console.table(view, ['id', 'importMs', 'cssMs', 'runMs', 'totalMs']);
    console.groupEnd();
}

/**
 * Inject a single <style> with all module CSS (SSR-safe).
 */
function injectCombinedCSS(cssText, mountId = 'lt-extensions') {
    if (!cssText || typeof document === 'undefined') {
        return;
    }
    let el = document.head.querySelector(`style#${mountId}`);
    if (!el) {
        el = document.createElement('style');
        el.id = mountId;
        el.setAttribute('data-style', 'LT Extension Styles');
        document.head.append(el);
    }
    el.textContent = cssText;
}

/**
 * Extract CSS from an extension.
 */
function getCssFromExtension(id, ext, perfEnabled) {
    const t0 = now();

    let css = '';
    try {
        if (typeof ext.getStyles === 'function') {
            css = String(ext.getStyles() || '');
        } else if (typeof ext.styles === 'string') {
            css = ext.styles || '';
        }
    } catch (e) {
        logger.warn(`[LT] getStyles() threw for "${id}"`, e);
    } finally {
        if (perfEnabled && css) {
            perfPush(true, { id, phase: 'css', ms: now() - t0 });
        }
    }
    return css;
}

/**
 * Load, run, and (optionally) collect CSS from extensions.
 *
 * @param {object} LT - Your LT root object (populates LT.extensions[name])
 * @param {Array} list - Array of extension entries (modules, descriptors, strings, legacy descriptors)
 * @param {string} type - Extension domain: 'assessment' or 'authoring'
 * @param {object} [opts]
 * @param {'sequential'|'parallel'} [opts.mode='sequential']
 * @param {boolean} [opts.collectCSS=true]
 * @param {boolean} [opts.dedupeCSS=true]
 * @param {string}  [opts.mountId='lt-extensions']
 * @param {boolean} [opts.perf=false]
 * @param {number}  [opts.perfLimit=50]
 * @param {object}  [opts.security={}]
 * @param {object}  [opts.request={}]
 * @param {object|null} [opts.registry=null] - Optional pre-loaded registry for string resolution (passed from bundle.js)
 */
export async function runExtensions(
    LT,
    list,
    type,
    {
        mode = 'sequential',
        collectCSS = true,
        dedupeCSS = true,
        mountId = 'lt-extensions',
        perf = false,
        perfLimit = 50,
        security = {},
        request = {},
        registry = null,
    } = {}
) {
    const tInit0 = now();

    attachDependencies(LT, security, request);

    LT.extensions ||= {};
    const cssChunks = [];
    const seenCss = new Set();
    const toArgArray = args => (Array.isArray(args) ? args : args === undefined ? [] : [args]);

    const entries = (list || []).map((entry, index) => ({ ...classifyEntry(entry), _index: index }));

    // Emit a single deprecation warning if strings are used without a registry (core path)
    if (!registry && entries.some(e => e.type === 'string' || e.type === 'legacy-descriptor')) {
        console.warn(
            '[LT] Deprecation: passing extension names as strings to the core entry point is deprecated. ' +
                'Import extension modules directly and pass them as objects. ' +
                'See: https://github.com/michaelsharman/LT#tree-shakeable-extensions'
        );
    }

    /**
     * Resolve a string-based entry to an extension module using the provided registry
     * or falling back to dynamic import of the registry.
     */
    async function resolveStringEntry(id, perfEnabled) {
        const reg = registry || (await getRegistry());
        const loader = reg[type]?.[id];

        if (!loader) {
            throw new Error(`[LT] Unknown extension id "${id}"`);
        }

        const t0 = now();
        const mod = await loader();

        perfPush(perfEnabled, { id, phase: 'import', ms: now() - t0 });

        // Preferred: named export matching the id
        if (mod[id]?.run) {
            return mod[id];
        }
        // Or a default export with .run()
        if (mod.default?.run) {
            return mod.default;
        }
        // Or the first export that has .run()
        for (const v of Object.values(mod)) {
            if (v && typeof v.run === 'function') {
                return v;
            }
        }
        throw new Error(`[LT] Extension "${id}" does not export a runnable module`);
    }

    /**
     * Resolve and run a single classified entry.
     */
    async function resolveAndRun(classified) {
        const { type: entryType, _index: index } = classified;

        // Handle invalid entries
        if (entryType === 'invalid') {
            const name = classified.entry?.name || `index ${index}`;

            logger.error(`[LT] Invalid extension entry at ${name}:`, classified.entry);
            return;
        }

        let ext;
        let args;
        let name;

        switch (entryType) {
            case 'module': {
                ext = classified.module;
                args = [];
                name = ext.name;

                if (typeof ext.run !== 'function') {
                    logger.error(`[LT] Extension module at index ${index} ("${ext.name || ''}") has no run() method`);
                    return;
                }
                break;
            }
            case 'descriptor': {
                ext = classified.module;
                args = classified.args;
                name = ext?.name;

                if (!ext || typeof ext.run !== 'function') {
                    logger.error(`[LT] Extension descriptor at index ${index} ("${name || ''}") has a module without a run() method`);
                    return;
                }
                break;
            }
            case 'string': {
                name = classified.id;
                ext = await resolveStringEntry(name, perf);
                args = [];
                break;
            }
            case 'legacy-descriptor': {
                name = classified.id;
                ext = await resolveStringEntry(name, perf);
                args = classified.args;
                break;
            }
        }

        // run()
        const tRun0 = now();

        try {
            const ret = ext.run(...toArgArray(args));

            if (ret && typeof ret.then === 'function') {
                await ret;
            }
        } finally {
            perfPush(perf, { id: name, phase: 'run', ms: now() - tRun0 });
        }

        // Register successful extensions on LT.extensions
        LT.extensions[name] = ext;

        // CSS collection
        if (collectCSS) {
            const css = getCssFromExtension(name, ext, perf).trim();

            if (css && (!dedupeCSS || !seenCss.has(name))) {
                cssChunks.push(`/* ${name} */\n${css}`);
                if (dedupeCSS) {
                    seenCss.add(name);
                }
            }
        }
    }

    if (mode === 'parallel') {
        const tasks = entries.map(e =>
            resolveAndRun(e).catch(err => {
                const id = e.module?.name || e.id || `index ${e._index}`;

                logger.error(`[LT] Failed to init extension "${id}"`, err);
            })
        );

        await Promise.allSettled(tasks);
    } else {
        for (const e of entries) {
            try {
                await resolveAndRun(e);
            } catch (err) {
                const id = e.module?.name || e.id || `index ${e._index}`;

                logger.error(`[LT] Failed to init extension "${id}"`, err);
            }
        }
    }

    if (collectCSS && cssChunks.length) {
        const tCssInject0 = now();

        injectCombinedCSS(cssChunks.join('\n\n'), mountId);
        perfPush(perf, { id: '__init__', phase: 'css:inject', ms: now() - tCssInject0 });
    }

    // Mark eventBus as ready (clears buffered events after all extensions have loaded)
    if (type === 'assessment' && LT.eventBus) {
        const tReady0 = now();

        LT.eventBus.markReady();
        perfPush(perf, { id: '__init__', phase: 'eventBus:ready', ms: now() - tReady0 });
    }

    perfPush(perf, { id: '__init__', phase: 'total', ms: now() - tInit0 });

    // Only print when asked
    reportExtensionPerf(perf, { limit: perfLimit });
}
