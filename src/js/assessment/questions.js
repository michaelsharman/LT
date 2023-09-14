import * as app from '../app';
import * as items from './items';
import * as logger from '../utils/logger';

/**
 * Everything relating to questions currently
 * loaded by Items API.
 * @module Questions
 */

/**
 * Returns the question JSON of the active item. If the item
 * is multi-part, pass `index` to return the desired question.
 * Returns {} if no question was found on the active item.
 * @since 0.1.0
 * @param {number=} index Which question to retrieve. Numbered
 * from 1, top to bottom, left to right.
 * @returns {object} A question object
 */
export function question(index = 1) {
    const item = items.item();
    if (index <= item.questions.length) {
        return item.questions[index - 1];
    } else {
        logger.error(`Question not found (index ${index})`);
    }
}

/**
 * Returns all question JSON on the active item.
 * Returns [] if no questions were found.
 * @since 0.1.0
 * @returns {array}
 */
export function questions() {
    return items.item().questions;
}

/**
 * Retrieve a response object for a question on the
 * active item. Defaults to the first question. Pass `index`
 * if you want a different question response returned in the
 * case of a multi-part item.
 * Returns {} if no questions found on the item.
 * @since 0.1.0
 * @param {number=} index - Which question response to retrieve.
 * Numbered from 1, top to bottom, left to right.
 * @returns {object} The response object for the question, null if no attempts yet.
 */
export function questionResponse(index = 1) {
    const q = question(index);
    if (q !== undefined) {
        return response(q.response_id);
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
 * The score object for a question on the active item.
 * Defaults to the first question. Pass `index`
 * if you want a different question response returned in the
 * case of a multi-part item.
 * Returns {} if no questions found on the item.
 * @since 0.1.0
 * @param {number=} index - Which question response to retrieve.
 * Numbered from 1, top to bottom, left to right.
 * @returns {object} The score object for the question, null if no attempts yet
 */
export function questionScore(index = 1) {
    const q = question(index);
    if (q !== undefined) {
        return app.appInstance().getScores()[q.response_id];
    }
}

/**
 * A response object for a single question on the active item.
 * This is generally used internally. You should instead use
 * `questionResponse()`.
 * Returns {} if a response isn't found.
 * @since 0.1.0
 * @param {string} response_id
 * @returns {object | null} The response object for the question
 */
export function response(response_id) {
    const r = app.appInstance().question(response_id);

    if (r) {
        return app.appInstance().question(response_id).getResponse();
    } else {
        logger.error(`Response not found ${response_id}`);
        return undefined;
    }
}
