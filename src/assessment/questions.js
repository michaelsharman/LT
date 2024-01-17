import * as app from './app';
import * as items from './items';
import * as logger from '../utils/logger';

/**
 * Everything relating to questions currently
 * loaded by Items API.
 * @module Questions
 */

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
 * Returns {} if no questions found on the item.
 * @since 0.1.0
 * @param {string=} response_id
 * @returns {object} The score object for the question, null if no attempts yet
 */
export function questionScore(response_id) {
    let id = response_id ? response_id : questionResponseIds()[0];

    if (id) {
        return app.appInstance().getScores()[id];
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
