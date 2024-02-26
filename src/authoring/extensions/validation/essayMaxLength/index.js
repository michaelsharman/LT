import * as app from '../../../core/app';
import * as widgets from '../../../core/widgets';

/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds custom validation to ensure that only numbers are added
 * to the `max_length` field for the listed types.
 *
 * The extension will strip any invalid characters. Eg:
 * ```
 * 10.5
 * ```
 *
 * Will be changed to:
 * ```
 * 10
 * ```
 *
 * @module _Extensions/Authoring/validation/essayMaxLength
 */

const state = {
    validTypes: ['longtextV2', 'plaintext'],
};

/**
 * Extension constructor.
 * @example
 * import { LT } from '@caspingus/lt/src/authoring/index';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.essayMaxLength.run();
 * @since 2.4.0
 */
export function run() {
    setupListeners();
}

/**
 * Sets up listeners to add input validation.
 * @since 2.4.0
 * @ignore
 */
function setupListeners() {
    app.appInstance().on('widgetedit:editor:ready', () => {
        // Race condition with the event firing and the instance
        // actually being loaded
        setTimeout(() => {
            const widgetType = widgets.type();

            if (state.validTypes.includes(widgetType)) {
                const elMaxLength = document.querySelector('[data-lrn-qe-input-path="max_length"] input.lrn-qe-input');

                if (elMaxLength) {
                    elMaxLength.addEventListener('input', () => {
                        validateInput(elMaxLength);
                    });
                }
            }
        }, 500);
    });
}

/**
 * Inspects the value of the passed DOM element. If the
 * value contains non-numeric values (including period)
 * those invalid characters are removed.
 * @since 2.4.0
 * @param {*} el
 * @ignore
 */
function validateInput(el) {
    const regex = /^\d+$/;

    if (!regex.test(el.value)) {
        el.value = el.value.replace(/[^0-9]/g, '');
    }
}
