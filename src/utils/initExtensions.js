import { EXTENSIONS } from './extensionsRegistry.js';
import { attachDependencies } from '../utils/extensionsFactory.js';
import logger from './logger.js';

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
 * Accept "foo" or { id: "foo", args } and normalize to a descriptor.
 */
function toDescriptor(x) {
    if (typeof x === 'string') {
        return { id: x, args: [] };
    }
    return x || { id: '' };
}

/**
 * Resolve a dynamic import for a known extension id and return the exported object with .run().
 */
async function loadExtension(type, id, perfEnabled) {
    const loader = EXTENSIONS[type]?.[id];
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
 * @param {object} LT - Your LT root object (populates LT.extensions[id])
 * @param {(string|{id:string,args?:any|any[]})[]} list
 * @param {object} [opts]
 * @param {'sequential'|'parallel'} [opts.mode='sequential']
 * @param {boolean} [opts.collectCSS=true]
 * @param {boolean} [opts.dedupeCSS=true]
 * @param {string}  [opts.mountId='lt-extensions']
 * @param {boolean} [opts.perf=false]
 * @param {number}  [opts.perfLimit=50]
 * @param {object}  [opts.security={}]
 * @param {object}  [opts.request={}]
 */
export async function runExtensions(
    LT,
    list,
    type,
    { mode = 'sequential', collectCSS = true, dedupeCSS = true, mountId = 'lt-extensions', perf = false, perfLimit = 50, security = {}, request = {} } = {}
) {
    const tInit0 = now();

    attachDependencies(LT, security, request);

    const items = (list || []).map(toDescriptor);
    LT.extensions ||= {};
    const cssChunks = [];
    const seenCss = new Set();
    const toArgArray = args => (Array.isArray(args) ? args : args === undefined ? [] : [args]);

    async function runOne({ id, args = [] }) {
        const ext = await loadExtension(type, id, perf);
        LT.extensions[id] = ext;

        // run()
        const tRun0 = now();
        try {
            const ret = ext.run(...toArgArray(args));
            if (ret && typeof ret.then === 'function') {
                await ret;
            }
        } finally {
            perfPush(perf, { id, phase: 'run', ms: now() - tRun0 });
        }

        // CSS
        if (collectCSS) {
            const css = getCssFromExtension(id, ext, perf).trim();
            if (css && (!dedupeCSS || !seenCss.has(id))) {
                cssChunks.push(`/* ${id} */\n${css}`);
                if (dedupeCSS) {
                    seenCss.add(id);
                }
            }
        }
    }

    if (mode === 'parallel') {
        const tasks = items.map(d => runOne(d).catch(err => logger.error(`[LT] Failed to init extension "${d.id}"`, err)));
        await Promise.allSettled(tasks);
    } else {
        for (const d of items) {
            try {
                await runOne(d);
            } catch (err) {
                logger.error(`[LT] Failed to init extension "${d.id}"`, err);
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
