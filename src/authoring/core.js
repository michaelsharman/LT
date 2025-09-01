import * as app from './core/app.js';
import * as diagnostics from './core/diagnostics.js';
import * as navigation from './core/navigation.js';
import * as widgets from './core/widgets.js';
import logger from '../utils/logger.js';
import { runExtensions } from '../utils/initExtensions.js';

// Filter out methods that are not needed in the final export
const diagnosticsFiltered = Object.fromEntries(Object.entries(diagnostics).filter(([key]) => !['extensionsListener', 'handleEvent'].includes(key)));
const appFiltered = Object.fromEntries(Object.entries(app).filter(([key]) => !['setup'].includes(key)));
const utils = {
    utils: {
        logger,
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

    const { extensions = [], security, request } = options;
    if (extensions.length) {
        await runExtensions(LT, extensions, 'authoring', {
            security,
            request,
        });
    }
}

export const LT = { init, extensions: {}, ...appFiltered, ...diagnosticsFiltered, ...navigation, ...widgets, ...utils };
