import * as app from './core/app.js';
import * as diagnostics from './core/diagnostics.js';
import * as navigation from './core/navigation.js';
import * as widgets from './core/widgets.js';
import logger from '../utils/logger.js';
import { runExtensions } from '../utils/initExtensions.js';
import MemoryMonitor from '../utils/memoryMonitor.js';

let monitor = null;

// Filter out methods that are not needed in the final export
const diagnosticsFiltered = Object.fromEntries(Object.entries(diagnostics).filter(([key]) => !['extensionsListener', 'handleEvent'].includes(key)));
const appFiltered = Object.fromEntries(Object.entries(app).filter(([key]) => !['setup'].includes(key)));
const utils = {
    utils: {
        logger,
        get monitor() {
            return monitor;
        },

        // optional convenience APIs
        enableMonitoring(opts = {}) {
            if (!monitor) {
                monitor = new MemoryMonitor();
            }
            if (!monitor.isMonitoring) {
                monitor.startMonitoring(opts.intervalMs ?? 5000);
            }
            return monitor;
        },

        disableMonitoring() {
            monitor?.stopMonitoring();
        },
    },
};

/**
 * Constructor method for Learnosity Toolkit.
 * @since 0.1.0
 * @ignore
 * @param {object} app - Author API app instance
 * @example
 * // Declare and set your variable with the Author API LearnosityAuthor.init() method
 * const authorApp = LearnosityAuthor.init(signedConfigObject);
 *
 * // Pass that app instance to the Toolkit constructor in the Author API readyListener()
 * import { LT } from '@caspingus/lt/authoring/core';
 * LT.init(authorApp);
 *
 * // Can be handy in the global scope for development
 * window.LT = LT;
 */
async function init(authorApp, options = {}) {
    app.setup(authorApp);

    const { extensions = [], security, request, monitor: monitorOpt, perf = false, perfLimit = 50 } = options;

    // Opt-in monitoring
    if (monitorOpt) {
        const intervalMs = typeof monitorOpt === 'object' && Number.isFinite(monitorOpt.intervalMs) ? monitorOpt.intervalMs : undefined;
        if (!monitor) {
            monitor = new MemoryMonitor();
        }
        if (!monitor.isMonitoring) {
            monitor.startMonitoring(intervalMs);
        }
    }

    if (extensions.length) {
        await runExtensions(LT, extensions, 'authoring', {
            security,
            request,
            perf,
            perfLimit,
        });
    }
}

export const LT = { init, extensions: {}, ...appFiltered, ...diagnosticsFiltered, ...navigation, ...widgets, ...utils };
