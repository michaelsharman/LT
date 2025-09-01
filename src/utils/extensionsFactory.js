export let LT = null;
export let apiSecurity = null;
export let apiRequest = null;

export function attachDependencies(instance, security, request) {
    LT = instance;
    apiSecurity = security;
    apiRequest = request;
}

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
    let hasRun = false;
    let ready = null;

    function run(...args) {
        if (hasRun) {
            return ready ?? undefined;
        }

        dispatch('extension:run', name);

        try {
            const result = runFn(...args); // sync or Promise
            hasRun = true;

            if (result && typeof result.then === 'function') {
                // cache promise so subsequent calls await the same work
                ready = result;
                return ready;
            }

            // sync path: normalize to a resolved promise if callers await
            ready = Promise.resolve();
            return result;
        } catch (e) {
            // allow retry on next call
            hasRun = false;
            throw e;
        }
    }

    return {
        name,
        run,
        hasRun: () => hasRun,
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
