import { createExtension, LT } from '../../../../utils/extensionsFactory.js';

/**
 * This extension is used to disable the question after it has been validated
 * using the "Check Answer" button.
 *
 * @example
 * LT.init(itemsApp, {
 *     extensions: ['disableOnValidate'],
 * });
 *
 * @module Extensions/Assessment/disableOnValidate
 */

/**
 * @since 2.17.0
 * @ignore
 */
function run() {
    LT.eventBus.on('item:load', setup, 'disableOnValidate');
}

/**
 * Determines if the "Check Answer" button is enabled for the current question.
 * If so, the question is disabled after validation (click of the button).
 * @since 2.17.0
 * @ignore
 */
function setup() {
    const responses = LT.questionResponseIds();

    for (const response_id of responses) {
        if (LT.hasCheckAnswer(response_id)) {
            LT.itemsApp()
                .question(response_id)
                .on('validated', () => {
                    LT.questionInstance(response_id).disable();
                });
        }
    }
}

export const disableOnValidate = createExtension('disableOnValidate', run);
