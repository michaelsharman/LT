import * as app from '../../../core/app.js';
import { hasCheckAnswer, questionInstance, questionResponseIds } from '../../../core/questions.js';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * This extension is used to disable the question after it has been validated
 * using the "Check Answer" button.
 *
 * @module Extensions/Assessment/disableOnValidate
 */

/**
 * @example
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.disableOnValidate.run();
 * @since 2.17.0
 */
export function run() {
    app.appInstance().on('item:load', setup);
}

/**
 * Determines if the "Check Answer" button is enabled for the current question.
 * If so, the question is disabled after validation (click of the button).
 * @since 2.17.0
 * @ignore
 */
function setup() {
    const responses = questionResponseIds();

    for (const response_id of responses) {
        if (hasCheckAnswer(response_id)) {
            app.appInstance()
                .question(response_id)
                .on('validated', () => {
                    questionInstance(response_id).disable();
                });
        }
    }
}
