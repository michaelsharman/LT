import * as app from './core/app.js';
import * as activity from './core/activity.js';
import * as diagnostics from './core/diagnostics.js';
import * as items from './core/items.js';
import * as player from './core/player.js';
import * as questions from './core/questions.js';
import * as sections from './core/sections.js';
import logger from '../utils/logger.js';

const utils = {
    utils: {
        logger,
    },
};

export const LT = { ...app, ...items, ...activity, ...player, ...questions, ...sections, ...diagnostics, ...utils };
