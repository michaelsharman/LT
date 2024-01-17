import * as app from './app';
import * as items from './items';
import * as logger from '../utils/logger';

/**
 * Everything relating to the assessment player.
 * @module Player
 */

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
 * Generic function to call API navigation methods. Supports:
 *  - `previous`
 *  - `next`
 *  - `review`
 *  - `submit`
 *
 * Internally this calls `next()`, `previous()`, `review()`,
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
            logger.warn(`Invalid target (${target})`);
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
