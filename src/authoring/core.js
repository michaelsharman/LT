import * as app from './core/app.js';
import * as diagnostics from './core/diagnostics.js';
import * as navigation from './core/navigation.js';
import * as widgets from './core/widgets.js';
import logger from '../utils/logger.js';

// Filter out methods that are not needed in the final export
const diagnosticsFiltered = Object.fromEntries(Object.entries(diagnostics).filter(([key]) => !['extensionsListener', 'handleEvent'].includes(key)));

const utils = {
    utils: {
        logger,
    },
};

export const LT = { ...app, ...diagnosticsFiltered, ...navigation, ...widgets, ...utils };
