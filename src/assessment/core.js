import * as app from './core/app';
import * as activity from './core/activity';
import * as diagnostics from './core/diagnostics';
import * as items from './core/items';
import * as player from './core/player';
import * as questions from './core/questions';
import * as sections from './core/sections';
import logger from '../utils/logger';

const utils = {
    utils: {
        logger,
    },
};

export const LT = { ...app, ...items, ...activity, ...player, ...questions, ...sections, ...diagnostics, ...utils };
window.LT = LT;