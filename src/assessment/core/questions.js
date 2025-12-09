import { itemsApp } from './app.js';
import { item } from './items.js';
import { activity } from './activity.js';
import logger from '../../utils/logger.js';

/**
 * Everything relating to questions currently
 * loaded by Items API.
 * @module Assessment/Questions
 */

/**
 * Checks whether the "Check Answer" button is enabled for the
 * current question, including if enabled via activity override.
 * @since 2.11.0
 * @param {string=} response_id
 * @returns {boolean}
 */
export function hasCheckAnswer(response_id) {
    if (!isAutoScorable(response_id)) {
        return false;
    }

    const hasActivityOverride =
        activity()?.config?.questions_api_init_options?.attribute_overrides &&
        activity().config.questions_api_init_options.attribute_overrides.hasOwnProperty('instant_feedback') &&
        typeof activity().config.questions_api_init_options.attribute_overrides.instant_feedback === 'boolean';
    const q = question(response_id);

    if (hasActivityOverride) {
        return activity().config.questions_api_init_options.attribute_overrides.instant_feedback;
    }

    return q.hasOwnProperty('instant_feedback') && typeof q.instant_feedback === 'boolean' ? q.instant_feedback : false;
}

/**
 * Checks whether the question is auto-scorable. This includes
 * questions that are technically auto-scorable but don't have
 * a validation object set (including when the validation is
 * ignored in Items API configuration).
 * @since 2.11.0
 * @param {string=} response_id
 * @returns {boolean}
 */
export function isAutoScorable(response_id) {
    const check = questionInstance(response_id).checkValidation();
    return check.has_validation;
}

/**
 * Returns the question JSON on the current item.
 *
 * If the item is multi-part, pass `response_id` to return
 * the desired question. This argument will also look across
 * all items for the requested `response_id`.
 *
 * Returns {} if no question was found on the current item.
 * @since 0.1.0
 * @param {string=} response_id
 * @returns {object}
 */
export function question(response_id) {
    const id = response_id ? response_id : questionResponseIds()[0];

    if (id) {
        return itemsApp().question(id).getQuestion();
    } else {
        logger.error(`Question not found (index ${id})`);
        return {};
    }
}

/**
 * Returns the question app instance on the current item.
 *
 * Returns null if no question was found on the current item,
 * or an invalid response_id was provided.
 *
 * If the item is multi-part, pass `response_id` to return the
 * desired question.
 * @since 0.4.0
 * @param {string=} response_id
 * @returns {object|null}
 */
export function questionInstance(response_id) {
    const id = response_id ?? questionResponseIds()[0];

    return id ? itemsApp().question(id) || null : null;
}

/**
 * A response object for a question on the
 * current item. Defaults to the first question.
 *
 * Returns null if the question hasn't been attempted,
 * or if no questions were found on the item.
 *
 * Pass `response_id` if you want a different question
 * response returned in the case of a multi-part item.
 * @since 0.1.0
 * @param {string=} response_id
 * @returns {object|null}
 */
export function questionResponse(response_id) {
    const id = response_id ? response_id : questionResponseIds()[0];

    if (id) {
        const r = itemsApp().question(id);

        if (r) {
            return itemsApp().question(id).getResponse();
        } else {
            logger.error(`Response not found ${id}`);
            return null;
        }
    } else {
        return null;
    }
}

/**
 * Array of `response_id` string values for all questions on the current item.
 * @since 0.1.0
 * @returns {array}
 */
export function questionResponseIds() {
    return questions().map(r => r.response_id);
}

/**
 * Returns all question JSON on the current item.
 *
 * Returns [] if no questions were found.
 * @since 0.1.0
 * @returns {array}
 */
export function questions() {
    return item().questions;
}

/**
 * The score object for a question on the current item.
 * Defaults to the first question.
 *
 * Pass `response_id` if you want a different question
 * response returned in the case of a multi-part item.
 *
 * Returns null if no questions found on the item, or a
 * non-autoscoreable question.
 * @since 0.1.0
 * @param {string=} response_id
 * @returns {object}
 */
export function questionScore(response_id) {
    const id = response_id ? response_id : questionResponseIds()[0];

    if (id) {
        return itemsApp().getScores()[id] || null;
    } else {
        return null;
    }
}
