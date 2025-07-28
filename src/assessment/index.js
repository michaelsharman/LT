/**
 * index.js is a "kitchen sink" file that will load everything when imported. The
 * core LT library, plus all extensions (excluding themes). Probably only use this
 * for development because of the size. In production, try importing core.js and
 * any extensions you might want separately.
 */

import { LT as core } from './core.js';

import * as ariaCountOnNav from './extensions/accessibility/aria/ariaCountOnNav/index.js';
import * as blockGrammarChecks from './extensions/validation/blockGrammarChecks/index.js';
import * as blueLightFilter from './extensions/accessibility/ux/blueLightFilter/index.js';
import * as checkAnswerValidation from './extensions/validation/checkAnswerValidation/index.js';
import * as columnResizer from './extensions/accessibility/ux/columnResizer/index.js';
import * as contentTabs from './extensions/ui/contentTabs/index.js';
import * as disableOnValidate from './extensions/validation/disableOnValidate/index.js';
import * as essayLimitByCharacter from './extensions/validation/essayLimitByCharacter/index.js';
import * as hideAlternatives from './extensions/accessibility/ux/hideAlternatives/index.js';
import * as keyboardShortcuts from './extensions/accessibility/ux/keyboardShortcuts/index.js';
import * as magnifier from './extensions/accessibility/ux/magnifier/index.js';
import * as mcqLabelPrefix from './extensions/accessibility/ux/mcqLabelPrefix/index.js';
import * as networkStatus from './extensions/ui/networkStatus/index.js';
import * as readingMask from './extensions/accessibility/ux/readingMask/index.js';
import * as renderPDF from './extensions/ui/renderPDF/index.js';
import * as resetResponse from './extensions/accessibility/ux/resetResponse/index.js';
import * as telemetry from './extensions/telemetry/index.js';
import * as toggleTimer from './extensions/accessibility/ux/toggleTimer/index.js';
import * as whiteNoise from './extensions/accessibility/ux/whiteNoise/index.js';

const extensions = {
    extensions: {
        ariaCountOnNav: { ...ariaCountOnNav },
        blockGrammarChecks: { ...blockGrammarChecks },
        blueLightFilter: { ...blueLightFilter },
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
        readingMask: { ...readingMask },
        renderPDF: { ...renderPDF },
        resetResponse: { ...resetResponse },
        telemetry: { ...telemetry },
        toggleTimer: { ...toggleTimer },
        whiteNoise: { ...whiteNoise },
    },
};

export const LT = { ...core, ...extensions };
