import * as app from '../../../../core/app.js';
import * as questions from '../../../../core/questions.js';
import { createModule } from '../../../../../utils/moduleFactory.js';
import { waitForElement } from '../../../../../utils/dom.js';
import logger from '../../../../../utils/logger.js';
import seedrandom from 'seedrandom';
import { shuffle } from 'lodash-es';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Hides a number of MCQ distractors/alternatives, that aren't
 * the correct answer, as an accommodation capability for
 * students wanting to avoid cognitive load.
 * @module Extensions/Assessment/hideAlternatives
 */

/**
 * Sets up an item load listener to hide distractor(s).
 * @param {number=} num The number of MCQ options to hide. Defaults to `1`.
 * @example
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.hideAlternatives.run();
 * @since 0.3.0
 */
function run(num) {
    const numToHide = num || 1;
    const qt = 'mcq'; // Limited to MCQ only (see targeted classnames when hiding options)
    const logPrefix = 'LRN Hide Alternatives:';

    app.appInstance().on('item:load', () => {
        const qs = questions.questions();

        Object.values(qs).forEach(question => {
            if (question.type === qt) {
                if (isSingleResponseMode(question)) {
                    if (hasValidNumToHide(question, numToHide)) {
                        if (hasValidationObject(question)) {
                            if (hasCorrectAnswers(question.validation)) {
                                // Create a question options list excluding the correct answer
                                const optionsList = [];
                                const correctAnswers = getCorrectAnswers(question.validation);
                                Object.values(correctAnswers).forEach(answer => {
                                    Object.values(question.options).forEach(option => {
                                        if (answer !== option.value) {
                                            optionsList.push(String(option.value));
                                        }
                                    });
                                });

                                // Shuffle the options list
                                const optionsToHide = [];
                                for (let j = 0; j < numToHide; j++) {
                                    optionsToHide.push(shuffleArrayWithSeed(optionsList, question.response_id)[j]);
                                }
                                // Hide the option(s)
                                waitForElement(question.response_id, responseParent => {
                                    if (!responseParent) {
                                        return; // Ensure responseParent is valid
                                    }

                                    const responsesEl = responseParent.getElementsByClassName('lrn_mcqgroup');
                                    if (responsesEl.length === 0) {
                                        return; // Ensure the element exists
                                    }

                                    for (let i = 0; i < responsesEl[0].children.length; i++) {
                                        const inputEl = responsesEl[0].children[i].getElementsByClassName('lrn-input');
                                        if (inputEl.length === 0) {
                                            continue; // Ensure input exists
                                        }

                                        for (const val of optionsToHide) {
                                            if (inputEl[0].getAttribute('value') === val) {
                                                responsesEl[0].children[i].style.display = 'none';
                                            }
                                        }
                                    }
                                });
                            } else {
                                logger.info(logPrefix, 'No correct answer found in validation object');
                            }
                        } else {
                            logger.info(logPrefix, ' No validation object found');
                        }
                    } else {
                        logger.info(logPrefix, 'Invalid number of options to hide:', numToHide);
                    }
                } else {
                    logger.info(logPrefix, 'Only supports single response mode');
                }
            }
        });
    });
}

/**
 * @param {object} question The question JSON object to inspect
 * @return {boolean} Whether the question was set up with single responses
 * @since 0.3.0
 * @ignore
 */
function isSingleResponseMode(question) {
    return !question.multiple_responses || question.multiple_responses === false;
}

/**
 * @param {object} question The question JSON object to inspect
 * @return {boolean} Whether the caller passes a correct number of options to hide
 * @since 0.3.0
 * @ignore
 */
function hasValidNumToHide(question, num) {
    return question.options.length - num > 1;
}

/**
 * @param {object} question The question JSON object to inspect
 * @return {boolean} Whether the object contains a `validation` key
 * @since 0.3.0
 * @ignore
 */
function hasValidationObject(question) {
    return 'validation' in question ? question.validation : false;
}

/**
 * @param {object} validation The question validation object to inspect
 * @return {boolean} Whether the object contains a `validation` key
 * @since 0.3.0
 * @ignore
 */
function hasCorrectAnswers(validation) {
    return Boolean(validation.valid_response.value && validation.valid_response.value.length);
}

/**
 * @param {object} validation The question validation object
 * @return {array} The correct responses as set by the author
 * @since 0.3.0
 * @ignore
 */
function getCorrectAnswers(validation) {
    return validation.valid_response.value;
}

/**
 * Utility function to randomise an array with a seed.
 * @param {array} arr Array to randomise
 * @param {string} seed
 * @since 0.3.0
 * @returns array
 * @ignore
 */
function shuffleArrayWithSeed(arr, seed) {
    const prng = seedrandom(seed);

    return shuffle(arr.map(value => ({ value, sort: prng() })))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

export const hideAlternatives = createModule('hideAlternatives', run);
