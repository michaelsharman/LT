import * as app from './app';
import * as activity from './activity';
import * as items from './items';
import * as player from './player';
import * as questions from './questions';
import * as sections from './sections';
import * as diagnostics from './diagnostics';
import * as logger from '../utils/logger';

import * as blockGrammarChecks from './extensions/validation/blockGrammarChecks';
import * as ariaCountOnNav from './extensions/accessibility/aria/ariaCountOnNav';
import * as columnResizer from './extensions/accessibility/ux/columnResizer';
import * as essayLimitByCharacter from './extensions/validation/essayLimitByCharacter';
import * as hideAlternatives from './extensions/accessibility/ux/hideAlternatives';
import * as keyboardShortcuts from './extensions/accessibility/ux/keyboardShortcuts';
import * as magnifier from './extensions/accessibility/ux/magnifier';
import * as mcqLabelPrefix from './extensions/accessibility/ux/mcqLabelPrefix';
import * as pageOverlay from './extensions/accessibility/ux/pageOverlay';
import * as resetResponse from './extensions/accessibility/ux/resetResponse';

const extensions = {
    extensions: {
        blockGrammarChecks: { ...blockGrammarChecks },
        ariaCountOnNav: { ...ariaCountOnNav },
        columnResizer: { ...columnResizer },
        essayLimitByCharacter: { ...essayLimitByCharacter },
        hideAlternatives: { ...hideAlternatives },
        keyboardShortcuts: { ...keyboardShortcuts },
        magnifier: { ...magnifier },
        mcqLabelPrefix: { ...mcqLabelPrefix },
        pageOverlay: { ...pageOverlay },
        resetResponse: { ...resetResponse },
    },
};
export const LT = { ...app, ...items, ...activity, ...player, ...questions, ...sections, ...diagnostics, ...logger, ...extensions };
