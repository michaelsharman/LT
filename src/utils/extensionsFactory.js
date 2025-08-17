/**
 * Creates a module with a tracked run() method and optional extra methods.
 * Automatically dispatches a 'module:run' event.
 *
 * @param {string} name - The module name
 * @param {Function} runFn - The function to invoke when `run()` is called
 * @param {Object} [methods={}] - Optional additional public methods
 * @returns {Object} - A wrapped module object
 */
export function createExtension(name, runFn, methods = {}) {
    let running = false;

    return {
        run(...args) {
            if (running) {
                return;
            }
            dispatch('extension:run', name);

            // User Timing marks (show up in Performance panel)
            const startMark = `lt:ext:${name}:start`;
            const endMark = `lt:ext:${name}:end`;
            performance.mark(startMark);
            const t0 = performance.now();

            const finish = () => {
                const ms = performance.now() - t0;
                performance.mark(endMark);
                // Name your measure per extension so you can filter in the Performance panel
                performance.measure(`lt:ext:${name}`, startMark, endMark);
                recordPerf(name, ms);
            };

            try {
                const maybe = runFn(...args); // may be sync or a Promise
                running = true;

                if (maybe && typeof maybe.then === 'function') {
                    finish();
                    maybe.catch(err => {
                        running = false;
                        console.error(err);
                    });
                } else {
                    finish();
                }
            } catch (e) {
                finish();
                running = false;
                throw e;
            }
        },

        isRunning: () => running,

        name,
        ...methods,
    };
}

/**
 * Internal event dispatcher for module usage tracking.
 * @param {string} type - Event type (e.g., 'module:run')
 * @param {string} name - Module name
 * @param {Object} [extra] - Optional additional metadata
 */
function dispatch(type, name, extra = {}) {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(
            new CustomEvent(type, {
                detail: {
                    name,
                    timestamp: Date.now(),
                    ...extra,
                },
            })
        );
    }
}

function recordPerf(name, ms) {
    (window.__LT_PERF ??= []).push({ name, ms, at: new Date().toISOString() });
    // Optional: log tersely in dev
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
        console.debug(`[LT] ${name} init ${ms.toFixed(1)}ms`);
    }
}
