import * as app from './core/app.js';
import * as diagnostics from './core/diagnostics.js';
import * as navigation from './core/navigation.js';
import * as widgets from './core/widgets.js';
import logger from '../utils/logger.js';

const utils = {
    utils: {
        logger,
    },
};

export const LT = { ...app, ...diagnostics, ...navigation, ...widgets, ...utils };
