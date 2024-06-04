import * as app from './app';
import * as items from './items';
import { activity } from './activity';
import logger from '../../utils/logger';
import { hasValue } from '../../utils/validation';

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
    if (!isAutoScorable(response_id)) return false;

    const hasActivityOverride =
        activity()?.config?.questions_api_init_options?.attribute_overrides &&
        activity().config.questions_api_init_options.attribute_overrides.hasOwnProperty('instant_feedback') &&
        typeof activity().config.questions_api_init_options.attribute_overrides.instant_feedback === 'boolean';
    const q = question(response_id);

    if (hasActivityOverride) return activity().config.questions_api_init_options.attribute_overrides.instant_feedback;

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
    const q = question(response_id);
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
 * @returns {object} A question JSON object.
 */
export function question(response_id) {
    let id = response_id ? response_id : questionResponseIds()[0];

    if (id) {
        return app.appInstance().question(id).getQuestion();
    } else {
        logger.error(`Question not found (index ${id})`);
        return {};
    }
}

/**
 * Returns the question app instance on the current item.
 *
 * If the item is multi-part, pass `response_id` to return the
 * desired question.
 * @since 0.4.0
 * @param {string=} response_id
 * @returns {object} A question app instance.
 */
export function questionInstance(response_id) {
    let id = response_id ? response_id : questionResponseIds()[0];

    if (id) {
        return app.appInstance().question(id);
    } else {
        return {};
    }
}

/**
 * Returns all question JSON on the current item.
 *
 * Returns [] if no questions were found.
 * @since 0.1.0
 * @returns {array}
 */
export function questions() {
    return items.item().questions;
}

/**
 * A response object for a question on the
 * current item. Defaults to the first question.
 *
 * Pass `response_id` if you want a different question
 * response returned in the case of a multi-part item.
 *
 * Returns {} if no questions found on the item.
 * @since 0.1.0
 * @param {string=} response_id
 * @returns {object} The response object for the question, null if no attempts yet.
 */
export function questionResponse(response_id) {
    let id = response_id ? response_id : questionResponseIds()[0];

    if (id) {
        return response(id);
    } else {
        return {};
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
 * The score object for a question on the current item.
 * Defaults to the first question.
 *
 * Pass `response_id` if you want a different question
 * response returned in the case of a multi-part item.
 *
 * Returns {} if no questions found on the item, or a
 * non-autoscoreable question.
 * @since 0.1.0
 * @param {string=} response_id
 * @returns {object} The score object for the question.
 */
export function questionScore(response_id) {
    let id = response_id ? response_id : questionResponseIds()[0];

    if (id) {
        return app.appInstance().getScores()[id] || {};
    } else {
        return {};
    }
}

/**
 * A response object for a single question on the current item.
 *
 * Returns {} if a response isn't found.
 * @since 0.1.0
 * @param {string} response_id
 * @returns {object | null} The response object for the question
 * @ignore
 */
function response(response_id) {
    const r = app.appInstance().question(response_id);

    if (r) {
        return app.appInstance().question(response_id).getResponse();
    } else {
        logger.error(`Response not found ${response_id}`);
        return undefined;
    }
}
