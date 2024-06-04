import * as app from '../../core/app';
import * as questions from '../../core/questions';
import logger from '../../../utils/logger';
import { dialog, hideDialog } from '../../core/player';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * This extension is used in scenarios where you want the
 * user to attempt all questions, and check the answer,
 * prior to navigating to the next question.
 *
 * Autoscorable questions that have disabled auto scoring
 * will be ignored.
 *
 * Items API configuration overrides take precedence:
 * ```
 * {
 *     "config": {
 *         "questions_api_init_options": {
 *             "attribute_overrides": {
 *                 "instant_feedback": false
 *             }
 *         }
 *     }
 * }
 * ```
 * @module Extensions/Assessment/checkAnswerValidation
 */

const LOG_LEVEL = 'ERROR';
const state = {
    message: {
        header: 'Please check your answers',
        body: `<p>Before moving on, attempt all questions and click the "Check Answer" button.</p>
            <p>Note: the "Check Answer" button may not appear on every question.</p>`,
    },
};

/**
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/core';
 * import * as checkAnswerValidation from '@caspingus/lt/src/assessment/extensions/validation/checkAnswerValidation
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 *
 * // These are the default values. Override as needed.
 * const config = {
 *     message: {
 *         header: 'Please check your answers',
 *         body: '<p>Before moving on, attempt all questions and click the "Check Answer" button.</p><p>Note: the "Check Answer" button may not appear on every question.</p>'
 *     }
 * }
 * checkAnswerValidation.run(config);
 * @param {object=} config Object of configuration options. Currently only supports a message object with
 *  2 keys, `header` and `body`.
 * @since 2.11.0
 */
export function run(config) {
    if (config && config?.message) {
        if (state.message?.header.length) {
            state.message.header = config.message.header;
        }
        if (state.message?.body.length) {
            state.message.body = config.message.body;
        }
    }

    app.appInstance().on('item:beforeunload', e => {
        setup(e);
    });
}

/**
 * Runs the setup logic for the check answer extension every time
 * a user tries to navigate away from the current item.
 * @param {object} e Item event object
 * @since 2.11.0
 * @ignore
 */
function setup(e) {
    const itemHasCheckAnswer = hasCheckAnswer();

    if (itemHasCheckAnswer) {
        if (!hasUsedCheckAnswer()) {
            logger.debug('Disabling navigation.', LOG_LEVEL);
            e.preventDefault();
            launchMessage();
        }
    }
}

/**
 * Sets up the logic for whether to disable navigation and wait
 * for the user to check the answer.
 *
 * If we don't find a check answer button, do nothing (check on question JSON and activity override)
 * If we don't find a scorable question, do nothing
 * We don't consider fully attempted. Simply checking answer is sufficient
 * @since 2.11.0
 * @ignore
 * @returns {boolean}
 */
function hasCheckAnswer() {
    const itemQuestions = questions.questions();
    let hasCheckAnswer = false;

    for (let q of itemQuestions) {
        let response_id = q.response_id;

        if (questions.hasCheckAnswer(response_id)) {
            hasCheckAnswer = true;
            break;
        }
    }

    return hasCheckAnswer;
}

/**
 * Determines whether the user has used the "Check Answer" button
 * on all valid questions on the current item. If there is no
 * check answer button (or we're on a feature-only item), we
 * return true.
 * @since 2.11.0
 * @ignore
 * @returns {boolean}
 */
function hasUsedCheckAnswer() {
    const itemQuestions = questions.questions();

    for (let q of itemQuestions) {
        let response_id = q.response_id;

        if (
            questions.hasCheckAnswer(response_id) &&
            (!questions.questionResponse(response_id) || !questions.questionResponse(response_id).hasOwnProperty('feedbackAttemptsCount'))
        ) {
            return false;
        }
    }

    return true;
}

/**
 * Launches a message to the user to check their answer before
 * navigating to the next question.
 * @since 2.11.0
 * @ignore
 */
function launchMessage() {
    dialog({
        header: state.message.header,
        body: state.message.body,
        buttons: [
            {
                button_id: 'lt__check_answer_validation',
                label: 'Close',
                is_primary: false,
            },
        ],
    });
    app.assessApp().on('button:lt__check_answer_validation:clicked', () => {
        hideDialog();
    });
}
