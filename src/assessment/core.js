import * as app from './core/app.js';
import * as activity from './core/activity.js';
import * as diagnostics from './core/diagnostics.js';
import * as items from './core/items.js';
import * as player from './core/player.js';
import * as questions from './core/questions.js';
import * as sections from './core/sections.js';
import logger from '../utils/logger.js';
import { runExtensions } from '../utils/initExtensions.js';
import { eventBus } from '../utils/eventBus.js';

let monitor = null;
let MonitorCtor = null;

// Filter out methods that are not needed in the final export
const diagnosticsFiltered = Object.fromEntries(Object.entries(diagnostics).filter(([key]) => !['extensionsListener', 'handleEvent'].includes(key)));
const appFiltered = Object.fromEntries(Object.entries(app).filter(([key]) => !['setup'].includes(key)));

// Base utils (no monitoring by default)
const utils = {
    utils: {
        logger,
        get monitor() {
            return monitor;
        },
    },
};

// Private helpers for monitoring
async function getMonitorCtor() {
    if (!MonitorCtor) {
        const mod = await import(/* webpackChunkName: "lt-memory-monitor" */ '../utils/memoryMonitor.js');

        MonitorCtor = mod.default || mod.MemoryMonitor || mod; // be tolerant to export style
    }

    return MonitorCtor;
}

async function _enableMonitoring(opts = {}) {
    const Ctor = await getMonitorCtor();

    if (!monitor) {
        monitor = new Ctor();
    }
    if (!monitor.isMonitoring) {
        monitor.startMonitoring(opts.intervalMs ?? 5000);
    }

    return monitor;
}

function _disableMonitoring() {
    monitor?.stopMonitoring();
}

/**
 * Constructor method for Learnosity Toolkit.
 * @since 0.1.0
 * @ignore
 * @param {object} app - Items API app instance
 * @example
 * // Declare and set your variable with the Items API LearnosityItems.init() method
 * const itemsApp = LearnosityItems.init(signedConfigObject);
 *
 * // Pass that app instance to the Toolkit constructor in the Items API readyListener()
 * import { LT } from '@caspingus/lt/assessment/core';
 * LT.init(itemsApp);
 *
 * // Can be handy in the global scope for development
 * window.LT = LT;
 */
async function init(itemsApp, options = {}) {
    app.setup(itemsApp);

    const { extensions = [], monitor: monitorOpt, perf = false, perfLimit = 50 } = options;

    // Opt-in monitoring
    if (monitorOpt) {
        // expose only when requested
        Object.assign(utils.utils, {
            enableMonitoring: _enableMonitoring,
            disableMonitoring: _disableMonitoring,
        });

        // start immediately if truthy
        const intervalMs = typeof monitorOpt === 'object' && Number.isFinite(monitorOpt.intervalMs) ? monitorOpt.intervalMs : undefined;

        await _enableMonitoring({ intervalMs });
    }

    if (extensions.length) {
        await runExtensions(LT, extensions, 'assessment', { perf, perfLimit });
    }
}

export const LT = {
    init,
    extensions: {},
    eventBus,
    ...appFiltered,
    ...items,
    ...activity,
    ...player,
    ...questions,
    ...sections,
    ...diagnosticsFiltered,
    ...utils,
};
