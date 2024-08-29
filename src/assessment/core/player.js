import { hasAnswerMasking } from './activity';
import * as app from './app';
import * as items from './items';
import logger from '../../utils/logger';

/**
 * Everything relating to the assessment player.
 * @module Assessment/Player
 */

const state = {
    answerMasking: {
        enabled: null,
    },
    lineReader: {
        enabled: null,
        id: null,
    },
};

/**
 * Shows or hides the player answer masking tool. Answer masking has to be enabled in
 * Items API configuration for this to work.
 * @since 2.15.0
 * @param {boolean} action - Whether to show (`true`) or hide (`false`).
 */
export function answerMasking(action) {
    if (state.answerMasking.enabled === null) {
        const buttonElement = document.querySelector('.test-answer-masking');

        if (buttonElement) {
            state.answerMasking.enabled = true;
        } else {
            state.answerMasking.enabled = false;
        }
    }

    if (state.answerMasking.enabled) {
        if (action !== undefined) app.appInstance().questionsApp().masking(action);
    } else {
        logger.warn('Answer masking is not enabled in the Items API configuration.');
    }
}

/**
 * Renders an Items API custom dialog.
 * @since 0.1.0
 * @param {object} config - Dialog configuration
 * @see https://help.learnosity.com/hc/en-us/articles/360000755558-Using-Custom-Dialogs-During-Assessments
 * @example
 * LT.dialog({
 *     "header": "My heading",
 *     "body":  "Custom body with <strong>html</strong> support",
 *     "buttons": [
 *         {
 *             "button_id": "my_primary_button",
 *             "label": "My Primary Button",
 *             "is_primary": true
 *         },
 *         {
 *             "button_id": "my_standard_button",
 *             "label": "My Standard Button",
 *             "is_primary": false
 *         }
 *     ]
 * });
 */
export function dialog(config) {
    app.assessApp().dialogs().custom.show(config);
}

/**
 * Hides a custom dialog.
 * @since 1.1.0
 */
export function hideDialog() {
    app.assessApp().dialogs().custom.hide();
}

/**
 * Checks whether the player is in responsive mode. This will be either the
 * small or medium breakpoints. See more https://help.learnosity.com/hc/en-us/articles/360000758337-Customizing-the-Assessment-Player-experience-with-User-Interface-Regions#responsive-behavior
 * @since 1.2.0
 * @returns {boolean}
 */
export function isResponsiveMode() {
    return Boolean(document.querySelector('.has-menu-region'));
}

/**
 * Check that the review screen has been loaded.
 * @since 0.1.0
 * @returns {boolean}
 */
export function isReviewScreen() {
    let loaded = false;
    // The API event fires when loading the panel. We need a delay to
    // detect that this particular panel has loaded.
    setTimeout(() => {
        if (document.getElementsByClassName('review-screen')[0].getAttribute('aria-hidden') === null) {
            loaded = true;
        }
        return loaded;
    }, 500);
}

/**
 * Shows or hides the player line reader. The line reader has to be enabled in
 * Items API configuration for this to work.
 * @since 2.15.0
 * @param {string=} action - Whether to `toggle` (default), `show` or `hide` the line reader.
 */
export function lineReader(action) {
    if (state.lineReader.enabled === null) {
        const buttonElement = document.querySelector('.lrn_linereader-toggle');

        if (buttonElement) {
            state.lineReader.enabled = true;

            const dataAttributeValue = buttonElement.querySelector('[data-lrn-widget-container]').getAttribute('data-lrn-widget-container');
            const uniqueValue = dataAttributeValue.match(/\d+$/);

            if (uniqueValue) {
                state.lineReader.id = uniqueValue[0];
            } else {
                logger.warn('Could not find the line reader unique id.');
            }
        } else {
            state.lineReader.enabled = false;
        }
    }

    if (state.lineReader.enabled && state.lineReader.id !== null) {
        const lineReader = app.appInstance().features()[`lrn-assessapp-feature_${state.lineReader.id}`];

        switch (action) {
            case 'show':
                lineReader.show();
                break;
            case 'hide':
                lineReader.hide();
                break;
            default:
                lineReader.toggle();
        }
    } else {
        logger.warn('Line reader is not enabled in the Items API configuration.');
    }
}

/**
 * Generic function to call API navigation methods. Supports:
 *  - `previous`
 *  - `next`
 *  - `review`
 *  - `submit`
 *  - Number (0-based) representing the item index
 *
 * Internally this calls `next()`, `previous()`, `review()`, or `goto()`
 * and `submit()`.
 * @since 0.1.0
 * @param {string} target
 */
export function navigate(target) {
    switch (target) {
        case 'previous':
            app.appInstance().items().previous();
            break;
        case 'next':
            if (!items.isLastItem()) {
                app.appInstance().items().next();
            }
            break;
        case 'review':
            // Allow opening and closing the `Review progress` modal.
            if (document.getElementsByClassName('review-screen')[0].getAttribute('aria-hidden') === null) {
                app.appInstance().dialogs().reviewScreen.hide();
            } else {
                app.appInstance().dialogs().reviewScreen.show();
            }
            break;
        case 'submit':
            let submitSettings = {
                show_submit_confirmation: true,
                show_submit_ui: true,
                success: function (response_ids) {
                    alert('Test saved!');
                },
                error: function (event) {
                    alert('Test submit failed...check browser log');
                    console.log('Submission failed: ', event);
                },
            };
            app.appInstance().submit(submitSettings);
            break;
        default:
            if (typeof Number(target) === 'number' && Number(target) >= 0) {
                app.appInstance().items().goto(Number(target));
            } else {
                logger.warn(`Invalid target (${target})`);
            }
    }
}

/**
 * Navigates to the next item. No-op if on
 * the last item.
 * @since 0.1.0
 */
export function next() {
    navigate('next');
}

/**
 * Navigates to the previous item. No-op if on
 * item #1.
 * @since 0.1.0
 */
export function previous() {
    navigate('previous');
}

/**
 * Toggles the review screen.
 * @since 0.1.0
 */
export function review() {
    navigate('review');
}

/**
 * Submits the session.
 * @since 0.1.0
 */
export function submit() {
    navigate('submit');
}
