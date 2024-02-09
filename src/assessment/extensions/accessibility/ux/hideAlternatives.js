import * as app from '../../../core/app';
import * as questions from '../../../core/questions';
import * as shuffleSeed from 'shuffle-seed';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Hides a number of MCQ distractors/alternatives, that aren't
 * the correct answer, as an accommodation capability for
 * students wanting to avoid cognitive load.
 * @module _Extensions/Assessment/hideAlternatives
 */

/**
 * Sets up an item load listener to hide distractor(s).
 * @param {number=} num The number of MCQ options to hide. Defaults to `1`.
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.hideAlternatives.run();
 * @since 0.3.0
 */
export function run(num) {
    let numToHide = num || 1;
    let qt = 'mcq'; // Limited to MCQ only (see targeted classnames when hiding options)
    let logPrefix = 'LRN Hide Alternatives:';

    app.appInstance().on('item:load', () => {
        let qs = questions.questions();

        Object.values(qs).forEach(function (question) {
            if (question.type === qt) {
                if (isSingleResponseMode(question)) {
                    if (hasValidNumToHide(question, numToHide)) {
                        if (hasValidationObject(question)) {
                            if (hasCorrectAnswers(question.validation)) {
                                // Create a question options list excluding the correct answer
                                let optionsList = [];
                                let correctAnswers = getCorrectAnswers(question.validation);
                                Object.values(correctAnswers).forEach(function (answer) {
                                    Object.values(question.options).forEach(function (option) {
                                        if (answer !== option.value) {
                                            optionsList.push(option.value);
                                        }
                                    });
                                });
                                // Shuffle the options list
                                let optionsToHide = [];
                                for (let j = 0; j < numToHide; j++) {
                                    optionsToHide.push(shuffleSeed.shuffle(optionsList, question.response_id)[j]);
                                }
                                // Hide the option(s)
                                let responsesEl = document.getElementById(question.response_id).getElementsByClassName('lrn_mcqgroup');
                                for (let i = 0; i < responsesEl[0].children.length; i++) {
                                    let inputEl = responsesEl[0].children[i].getElementsByClassName('lrn-input');
                                    for (const val of optionsToHide) {
                                        if (inputEl[0].getAttribute('value') === val) {
                                            responsesEl[0].children[i].style.display = 'none';
                                        }
                                    }
                                }
                            } else {
                                console.info(logPrefix, 'No correct answer found in validation object');
                            }
                        } else {
                            console.info(logPrefix, ' No validation object found');
                        }
                    } else {
                        console.info(logPrefix, 'Invalid number of options to hide:', numToHide);
                    }
                } else {
                    console.info(logPrefix, 'Only supports single response mode');
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
