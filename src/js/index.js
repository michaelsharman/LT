import * as app from './app';
import * as activity from './assessment/activity';
import * as items from './assessment/items';
import * as player from './assessment/player';
import * as questions from './assessment/questions';
import * as sections from './assessment/sections';
import * as diagnostics from './assessment/diagnostics';

export const LT = { ...app, ...items, ...activity, ...player, ...questions, ...sections, ...diagnostics };
