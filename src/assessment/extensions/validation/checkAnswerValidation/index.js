import { createExtension, LT } from '../../../../utils/extensionsFactory.js';

/**
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
 *
 * @param {object=} options Object of configuration options.
 * @param {string=} options.message.header The header text for the message dialog.
 * @param {string=} options.message.body The body text for the message dialog.
 *
 * @example
 * const options = {
 *     message: {
 *         header: 'Please check your answers',
 *         body: '<p>Before moving on, attempt all questions and click the "Check Answer" button.</p><p>Note: the "Check Answer" button may not appear on every question.</p>'
 *     }
 * }
 *
 * LT.init(itemsApp, {
 *     extensions: [
 *         { id: 'checkAnswerValidation', args: options },
 *     ],
 * });
 *
 * @module Extensions/Assessment/checkAnswerValidation
 */

const state = {
    message: {
        header: 'Please check your answers',
        body: `<p>Before moving on, attempt all questions and click the "Check Answer" button.</p>
            <p>Note: the "Check Answer" button may not appear on every question.</p>`,
    },
};

/**
 * @param {object=} config Object of configuration options. Currently only supports a message object with 2 keys, `header` and `body`.
 * @since 2.11.0
 * @ignore
 */
function run(config) {
    const { header, body } = config?.message || {};

    if (header?.length) {
        state.message.header = header;
    }
    if (body?.length) {
        state.message.body = body;
    }

    LT.eventBus.on('item:beforeunload', e => {
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
    const itemHasCheckAnswer = hasCheckAnswerButton();

    if (itemHasCheckAnswer) {
        if (!hasUsedCheckAnswer()) {
            LT.utils.logger.debug('Disabling navigation.');
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
function hasCheckAnswerButton() {
    const itemQuestions = LT.questions();
    let hasCheckAnswerButton = false;

    for (const q of itemQuestions) {
        const response_id = q.response_id;

        if (LT.hasCheckAnswer(response_id)) {
            hasCheckAnswerButton = true;
            break;
        }
    }

    return hasCheckAnswerButton;
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
    const itemQuestions = LT.questions();

    for (const q of itemQuestions) {
        const response_id = q.response_id;

        if (
            LT.hasCheckAnswer(response_id) &&
            (!LT.questionResponse(response_id) || !LT.questionResponse(response_id).hasOwnProperty('feedbackAttemptsCount'))
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
    LT.dialog({
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
    LT.assessApp().on('button:lt__check_answer_validation:clicked', () => {
        LT.hideDialog();
    });
}

export const checkAnswerValidation = createExtension('checkAnswerValidation', run);
