import * as app from './app';
import * as activity from './assessment/activity';
import * as items from './assessment/items';
import * as player from './assessment/player';
import * as questions from './assessment/questions';
import * as sections from './assessment/sections';
import * as diagnostics from './assessment/diagnostics';
import * as logger from './utils/logger';

import * as blockGrammarChecks from './extensions/validation/blockGrammarChecks';
import * as ariaCountOnNav from './extensions/accessibility/aria/ariaCountOnNav';
import * as columnResizer from './extensions/accessibility/ux/columnResizer';
import * as hideAlternatives from './extensions/accessibility/ux/hideAlternatives';
import * as keyboardShortcuts from './extensions/accessibility/ux/keyboardShortcuts';
import * as magnifier from './extensions/accessibility/ux/magnifier';
import * as mcqLabelPrefix from './extensions/accessibility/ux/mcqLabelPrefix';
import * as resetResponse from './extensions/accessibility/ux/resetResponse';

const extensions = {
    extensions: {
        blockGrammarChecks: { ...blockGrammarChecks },
        ariaCountOnNav: { ...ariaCountOnNav },
        columnResizer: { ...columnResizer },
        hideAlternatives: { ...hideAlternatives },
        keyboardShortcuts: { ...keyboardShortcuts },
        magnifier: { ...magnifier },
        mcqLabelPrefix: { ...mcqLabelPrefix },
        resetResponse: { ...resetResponse },
    },
};
export const LT = { ...app, ...items, ...activity, ...player, ...questions, ...sections, ...diagnostics, ...logger, ...extensions };
