import * as app from '../../../app';
import logger from '../../../../utils/logger';
import * as question from '../../../questions';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds a prefix to all multiple-choice labels (correct
 * answer and distractors).
 *
 * Ignores block UI and radio button under option.
 *
 * Supports
 *  - multi-select MCQs
 *  - shuffle responses
 *  - columns
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/mcqprefix.png" alt="" width="660"></p>
 * @module _Extensions/Assessment/mcqLabelPrefix
 */

const state = {
    chosenMask: 'upperAlpha',
    prefixMask: {
        lowerAlpha: 97,
        upperAlpha: 65,
        numeric: 49,
    },
    explicitPrefixes: [],
    renderedCss: false,
    suffix: '.',
};

/**
 * Sets up an item load listener to add a prefix to all
 * MCQ possible response labels.
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.mcqLabelPrefix.run();
 * @param {string} mask Which mask pattern to use. Supports `upperAlpha` (default), `lowerAlpha`, and `numeric`.
 * @param {string} suffix Any suffix you want added to the label prefix. Defaults to `.`.
 * @param {array} prefixes Array of custom string prefixes to use.
 * @since 0.6.0
 */
export function run(mask = 'upperAlpha', suffix = '.', prefixes) {
    if (state.prefixMask.hasOwnProperty(mask)) {
        state.chosenMask = mask;
    }
    if (suffix && typeof suffix === 'string') {
        state.suffix = suffix;
    }
    if (prefixes && Array.isArray(prefixes)) {
        state.explicitPrefixes = prefixes;
    }

    if (!state.renderedCss) injectCSS();

    app.appInstance().on('item:load', () => {
        addPrefix(question.questions());
    });
}

/**
 *
 * @param {array} q Array of questions, if any, on the current item
 * @since 0.6.0
 * @ignore
 */
function addPrefix(itemQuestions) {
    const asciiStart = state.prefixMask[state.chosenMask];
    const suffix = state.suffix;

    try {
        for (let q of itemQuestions) {
            if (q.type === 'mcq' && q?.ui_style?.type !== 'block' && q?.ui_style?.type !== 'horizontal-input-bottom') {
                let r = q.response_id;
                let elOptions = document.getElementById(r).querySelectorAll('.lrn-mcq-option');
                let responseIndex = 0;
                for (let o of elOptions) {
                    let elLabels = o.querySelector('.lrn-possible-answer').children;
                    let elExistingPrefixes = o.querySelector('.lrn-prefix-label');
                    // If we haven't already printed prefixes
                    if (!elExistingPrefixes) {
                        let prefixValue;
                        // Check whether we're using a prefix mask or an explicit set of prefixes
                        if (
                            Array.isArray(state.explicitPrefixes) &&
                            state.explicitPrefixes.length &&
                            typeof state.explicitPrefixes[responseIndex] === 'string'
                        ) {
                            prefixValue = state.explicitPrefixes[responseIndex];
                        } else {
                            prefixValue = String.fromCharCode(asciiStart + responseIndex);
                        }
                        for (let i = 0; i < elLabels.length; i++) {
                            let p = document.createElement('span');
                            p.classList.add('lrn-prefix-label');
                            p.append(`${prefixValue}${suffix}`);
                            elLabels[i].prepend(p);
                        }
                        responseIndex++;
                    }
                }
            }
        }
    } catch (err) {
        logger.error(err);
    }
}

/**
 * Injects the necessary CSS to the header
 * @since 0.6.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity MCQ label prefix styles */
.lrn-prefix-label {
    padding-right: 15px;
    font-weight: 500;
}
@media (max-width: 750px) {
    .lrn-prefix-label {
        padding-right: 10px;
    }
}
@media (max-width: 650px) {
    .lrn-prefix-label {
        padding-right: 5px;
    }
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
