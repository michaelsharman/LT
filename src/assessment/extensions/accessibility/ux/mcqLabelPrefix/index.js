import { createExtension, LT } from '../../../../../utils/extensionsFactory.js';

/**
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
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/mcqprefix.png" alt="" width="660"></p>
 *
 * Sets up an item load listener to add a prefix to all
 * MCQ possible response labels.
 *
 * @param {object=} options Object of configuration options.
 * @param {string=} options.mask Which mask pattern to use. Supports `upperAlpha` (default), `lowerAlpha`, and `numeric`.
 * @param {string=} options.suffix Any suffix you want added to the label prefix. Defaults to `.`.
 * @param {array=} options.prefixes Array of custom string prefixes to use.
 *
 * @example
 * const options = {
 *      mask: 'upperAlpha',
 *      suffix: '.',
 *      prefixes: [],
 * }
 *
 * LT.init(itemsApp, {
 *     extensions: [
 *         { id: 'mcqLabelPrefix', args: options },
 *     ],
 * });
 *
 * @module Extensions/Assessment/mcqLabelPrefix
 */

const state = {
    chosenMask: 'upperAlpha',
    logPrefix: 'LRN MCQ Label Prefix:',
    prefixMask: {
        lowerAlpha: 97,
        upperAlpha: 65,
        numeric: 49,
    },
    explicitPrefixes: [],
    suffix: '.',
};

/**
 * Sets up an item load listener to add a prefix to all
 * MCQ possible response labels.
 * @param {object=} config The optional configuration for the extension.
 * @since 0.6.0
 * @ignore
 */
function run(config) {
    const { mask, suffix, prefixes } = config || {};

    if (state.prefixMask.hasOwnProperty(mask)) {
        state.chosenMask = mask;
    }
    if (suffix && typeof suffix === 'string') {
        state.suffix = suffix;
    }
    if (prefixes && Array.isArray(prefixes)) {
        state.explicitPrefixes = prefixes;
    }

    LT.eventBus.on('item:load', () => {
        addPrefix(LT.questions());
    }, 'mcqLabelPrefix');
}

/**
 *
 * @param {array} itemQuestions Array of questions, if any, on the current item
 * @since 0.6.0
 * @ignore
 */
function addPrefix(itemQuestions) {
    const asciiStart = state.prefixMask[state.chosenMask];
    const suffix = state.suffix;

    try {
        for (const q of itemQuestions) {
            if (q.type === 'mcq' && q?.ui_style?.type !== 'block' && q?.ui_style?.type !== 'horizontal-input-bottom') {
                const r = q.response_id;
                const elOptions = document.getElementById(r).querySelectorAll('.lrn-mcq-option');
                if (elOptions) {
                    let responseIndex = 0;
                    for (const o of elOptions) {
                        const elLabels = o.querySelector('.lrn-possible-answer').children;
                        const elExistingPrefixes = o.querySelector('.lrn-prefix-label');
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
                                const p = document.createElement('span');
                                p.classList.add('lrn-prefix-label');
                                p.append(`${prefixValue}${suffix}`);
                                elLabels[i].prepend(p);
                            }
                            responseIndex++;
                        }
                    }
                } else {
                    LT.utils.logger.warn(state.logPrefix, 'Options element not found');
                }
            }
        }
    } catch (err) {
        LT.utils.logger.error(err);
    }
}

/**
 * Returns the extension CSS
 * @since 3.0.0
 * @ignore
 */
function getStyles() {
    return `
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
}

export const mcqLabelPrefix = createExtension('mcqLabelPrefix', run, { getStyles });
