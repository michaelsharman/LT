import { appInstance, assessApp } from './app.js';
import { activity, hasSections } from './activity.js';
import { questions, questionResponse } from './questions.js';
import { sections } from './sections.js';

/**
 * Everything relating to the items in the activity.
 * @module Assessment/Items
 */

/**
 * The dynamic object for the current item. Useful when
 * using dynamic content with try again.
 * https://reference.learnosity.com/items-api/methods/item/dynamic
 * @since 1.4.0
 * @returns {object}
 */
export function dynamic() {
    const reference = itemReference();
    return assessApp().item(reference).dynamic || {};
}

/**
 * Toggles the `user_flagged` state on the current item.
 * @since 1.4.0
 */
export function flag() {
    const reference = itemReference();
    assessApp().item(reference).flag();
}

/**
 * Whether the current item has dynamic content.
 * @since 1.4.0
 * @returns {boolean}
 */
export function isDynamicItem() {
    return item()?.source.hasOwnProperty('data_table_seed');
}

/**
 * Whether the current item is the first item in the activity.
 * This ignores sections, so will be a global check.
 * @since 0.1.0
 * @returns {boolean}
 */
export function isFirstItem() {
    let reference;

    if (hasSections()) {
        reference = typeof sections()[0].items[0] === 'object' ? sections()[0].items[0].reference : sections()[0].items[0];
        return reference === item().reference;
    } else {
        reference = typeof activity().items[0] === 'object' ? activity().items[0].reference : activity().items[0];
        return reference === item().reference;
    }
}

/**
 * Whether the current item is the last item in the activity.
 * This ignores sections, so will be a global check.
 * @since 0.1.0
 * @returns {boolean}
 */
export function isLastItem() {
    return item().is_last_item;
}

/**
 * Whether the current item has been flagged by the user.
 * @since 0.1.0
 * @returns {boolean}
 */
export function isFlagged() {
    return item().user_flagged;
}

/**
 * Checks whether the entire item has been fully attempted.
 * Returns `false` if _all_ possible responses haven't been
 * attempted (eg on cloze types). Handles multi-part items.
 * @since 0.1.0
 * @param {string} reference Optionally pass an exact item reference.
 * @returns {boolean}
 */
export function isItemFullyAttempted(reference = undefined) {
    let itemQuestions;
    let attempted;
    let r;

    if (reference) {
        itemQuestions = appInstance().getItems()[reference].questions;
    } else {
        itemQuestions = questions();
    }

    if (Array.isArray(itemQuestions) && itemQuestions.length) {
        for (let i = 0; i < itemQuestions.length; i++) {
            const q = itemQuestions[i];
            r = questionResponse(q.response_id);
            if (r) {
                if (q.hasOwnProperty('metadata') && q.metadata.hasOwnProperty('valid_response_count')) {
                    if (Array.isArray(r.value)) {
                        const undefinedValues = r.value.filter(v => v === undefined);
                        if (undefinedValues.length) {
                            // A single question wasn't fully attempted
                            return false;
                        }
                        const nullValues = r.value.filter(v => v === null);
                        if (nullValues.length) {
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
 * Whether the current item has answer masking enabled.
 * @since 0.4.0
 * @returns {boolean}
 */
export function isMaskingEnabled() {
    return Boolean(document.querySelector('.lrn-masking'));
}

/**
 * JSON object for the current item.
 * @since 0.1.0
 * @param {string} reference Optionally pass an exact item reference.
 * @returns {object} An item JSON object.
 */
export function item(reference = undefined) {
    if (reference) {
        return appInstance().getItems()[reference];
    }
    return appInstance().getCurrentItem();
}

/**
 * Whether the current item has been attempted. Return value can be:
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
    return appInstance().getCurrentItem().attempt_status;
}

/**
 * Returns an item object by response id.
 * @since 1.1.0
 * @param {string} response_id
 * @returns {object} An item JSON object.
 */
export function itemByResponseId(response_id) {
    const items = appInstance().getItems();
    let item;

    for (const ref in items) {
        if (items[ref].response_ids.includes(response_id)) {
            item = items[ref];
            break;
        }
    }

    return item;
}

/**
 * The current item DOM element.
 * @since 0.4.0
 * @returns {object} HTML DOM element
 * ```
 * <div data-reference="[item-reference]" class="learnosity-item lrn-scrollable-container item lrn-assess-item">
 *   ...
 * </div>
 * ```
 */
export function itemElement() {
    return document.querySelector(`div[data-reference='${itemReference()}']`);
}

/**
 * The current item position, 1-based (not 0-based), in the activity.
 * This ignores sections, so returns the global item position.
 * @since 0.1.0
 * @returns {number}
 */
export function itemPosition() {
    return appInstance().assessApp().getItemPosition(itemReference()) + 1;
}

/**
 * The reference of the current item.
 * @since 0.1.0
 * @returns {string}
 */
export function itemReference() {
    return appInstance().getCurrentItem()?.reference;
}

/**
 * All tags that have been set against the current item.
 * Requires `retrieve_tags` to be set to `true` in the
 * Items API configuration.
 * @since 2.9.0
 * @returns {array}
 */
export function itemTags(reference = undefined) {
    const tags = appInstance().getTags();
    const itemRef = reference || itemReference();

    return tags[itemRef] || [];
}
