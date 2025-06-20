/**
 * index.js is a "kitchen sink" file that will load everything when imported. The
 * core LT library, plus all extensions (excluding themes). Probably only use this
 * for development because of the size. In production, try importing core.js and
 * any extensions you might want separately.
 */

import { LT as core } from './core.js';

import * as ariaCountOnNav from './extensions/accessibility/aria/ariaCountOnNav.js';
import * as blockGrammarChecks from './extensions/validation/blockGrammarChecks.js';
import * as checkAnswerValidation from './extensions/validation/checkAnswerValidation.js';
import * as columnResizer from './extensions/accessibility/ux/columnResizer.js';
import * as contentTabs from './extensions/ui/contentTabs/index.js';
import * as disableOnValidate from './extensions/validation/disableOnValidate.js';
import * as essayLimitByCharacter from './extensions/validation/essayLimitByCharacter.js';
import * as hideAlternatives from './extensions/accessibility/ux/hideAlternatives.js';
import * as keyboardShortcuts from './extensions/accessibility/ux/keyboardShortcuts.js';
import * as magnifier from './extensions/accessibility/ux/magnifier.js';
import * as mcqLabelPrefix from './extensions/accessibility/ux/mcqLabelPrefix.js';
import * as networkStatus from './extensions/ui/networkStatus/index.js';
import * as pageOverlay from './extensions/accessibility/ux/pageOverlay.js';
import * as renderPDF from './extensions/ui/renderPDF/index.js';
import * as resetResponse from './extensions/accessibility/ux/resetResponse.js';
import * as telemetry from './extensions/telemetry/index.js';
import * as toggleTimer from './extensions/accessibility/ux/toggleTimer.js';
import * as whiteNoise from './extensions/accessibility/ux/whiteNoise/index.js';

const extensions = {
    extensions: {
        ariaCountOnNav: { ...ariaCountOnNav },
        blockGrammarChecks: { ...blockGrammarChecks },
        checkAnswerValidation: { ...checkAnswerValidation },
        columnResizer: { ...columnResizer },
        contentTabs: { ...contentTabs },
        disableOnValidate: { ...disableOnValidate },
        essayLimitByCharacter: { ...essayLimitByCharacter },
        hideAlternatives: { ...hideAlternatives },
        keyboardShortcuts: { ...keyboardShortcuts },
        magnifier: { ...magnifier },
        mcqLabelPrefix: { ...mcqLabelPrefix },
        networkStatus: { ...networkStatus },
        pageOverlay: { ...pageOverlay },
        renderPDF: { ...renderPDF },
        resetResponse: { ...resetResponse },
        telemetry: { ...telemetry },
        toggleTimer: { ...toggleTimer },
        whiteNoise: { ...whiteNoise },
    },
};

export const LT = { ...core, ...extensions };
