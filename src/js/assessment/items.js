import * as app from '../app';
import * as activity from './activity';
import * as sections from './sections';

/**
 * Everything relating to the items in the activity.
 * @module Items
 */

/**
 * Whether the current item is the first item in the activity.
 * This ignores sections, so will be a global check.
 * @since 0.1.0
 * @returns {boolean}
 */
export function isFirstItem() {
    if (activity.hasSections()) {
        return sections.sections()[0].items[0].reference === app.appInstance().getCurrentItem().reference;
    } else {
        return activity.activity().items[0].reference === app.appInstance().getCurrentItem().reference;
    }
}

/**
 * Whether the current item is the last item in the activity.
 * This ignores sections, so will be a global check.
 * @since 0.1.0
 * @returns {boolean}
 */
export function isLastItem() {
    return app.appInstance().getCurrentItem().is_last_item;
}

/**
 * Whether the current item has been flagged by the user.
 * @since 0.1.0
 * @returns {boolean}
 */
export function isFlagged() {
    return app.appInstance().getCurrentItem().user_flagged;
}

/**
 * Checks whether the entire item has been fully attempted.
 * Returns `false` if _all_ possible responses haven't been
 * attempted (eg on cloze types). Handles multi-part items.
 * @since 0.1.0
 * @returns {boolean}
 */
export function isItemFullyAttempted() {
    const questions = app.appInstance().getCurrentItem().questions;
    let attempted;
    let r;

    if (Array.isArray(questions) && questions.length) {
        for (let i = 0; i < questions.length; i++) {
            let q = questions[i];
            r = this.getResponse(q.response_id);
            if (r) {
                if (q.hasOwnProperty('metadata') && q.metadata.hasOwnProperty('valid_response_count')) {
                    if (Array.isArray(r.value)) {
                        const undefinedValues = r.value.filter(v => v === undefined);
                        if (undefinedValues.length) {
                            // A single question wasn't fully attempted
                            return false;
                        }
                    }
                }
                attempted = true;
            } else {
                // We found at least one question with no response object
                return false;
            }
        }
    } else {
        attempted = true; // Technically not correct, but avoids logic problems by the caller
    }

    return attempted;
}

/**
 * The active item object.
 * @since 0.1.0
 * @returns {object}
 */
export function item() {
    return app.appInstance().getCurrentItem();
}

/**
 * Whether the active item has been attempted. Return value can be:
 *  - `not_attempted`
 *  - `fully_attempted`
 *  - `partially_attempted`
 *
 * Partially attempted items may be where there are 2+ questions
 * on the item and only 1 has been attempted.
 *
 * Note that if a question accepts multiple responses, eg multiple
 * dropdown elements, this method will return `fully_attempted` even
 * if not all responses have been attempted. If you want to check _all_
 * responses have been attempted use `isItemFullyAttempted()`.
 * @since 0.1.0
 * @returns {string}
 */
export function itemAttemptStatus() {
    return app.appInstance().getCurrentItem().attempt_status;
}

/**
 * The current item position, 1-based (not 0-based), in the activity.
 * This ignores sections, so returns the global item position.
 * @since 0.1.0
 * @returns {number}
 */
export function itemPosition() {
    return app.appInstance().assessApp().getItemPosition(itemReference()) + 1;
}

/**
 * The reference of the current item.
 * @since 0.1.0
 * @returns {string}
 */
export function itemReference() {
    return app.appInstance().getCurrentItem().reference;
}
