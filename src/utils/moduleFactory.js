/**
 * Creates a module with a tracked run() method and optional extra methods.
 * Automatically dispatches a 'module:run' event.
 *
 * @param {string} name - The module name
 * @param {Function} runFn - The function to invoke when `run()` is called
 * @param {Object} [methods={}] - Optional additional public methods
 * @returns {Object} - A wrapped module object
 */
export function createModule(name, runFn, methods = {}) {
    let running = false;

    return {
        async run(...args) {
            if (running) {
                return;
            }
            running = true;

            await runFn(...args);

            dispatch('module:run', name);
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
