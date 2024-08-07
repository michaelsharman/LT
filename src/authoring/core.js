import * as app from './core/app';
import * as diagnostics from './core/diagnostics';
import * as navigation from './core/navigation';
import * as widgets from './core/widgets';
import logger from '../utils/logger';

const utils = {
    utils: {
        logger,
    },
};

export const LT = { ...app, ...diagnostics, ...navigation, ...widgets, ...utils };
