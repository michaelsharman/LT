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
 * If the value contains leading zeros, the input field
 * will be styled with a red border.
 *
 * @module _Extensions/Authoring/validation/essayMaxLength
 */

const state = {
    renderedCss: false,
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
    if (!state.renderedCss) injectCSS();
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
 * If the value contains leading zero(s), the input field
 * is styled with a red border indicating that this is
 * an invalid value.
 * @since 2.4.0
 * @param {*} el
 * @ignore
 */
function validateInput(el) {
    const regex = /^\d+$/;
    const leadingZeroRegEx = /^(0|[1-9]\d*)$/;
    const invalidClass = 'lt__input-invalid';

    if (!regex.test(el.value)) {
        el.value = el.value.replace(/[^0-9]/g, '');
    }

    if (el.value.length && !leadingZeroRegEx.test(el.value)) {
        el.classList.add(invalidClass);
    } else {
        el.classList.remove(invalidClass);
    }
}

/**
 * Injects the necessary CSS to the header
 * @since 2.5.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity essay validate max length styles */
.lrn-qe-ui .lrn-qe-form-group .lrn-qe-form-control.lt__input-invalid,
.lrn-qe-ui .lrn-qe-form-group .lrn-qe-form-control.lt__input-invalid:active:not(:disabled):not([readonly]),
.lrn-qe-ui .lrn-qe-form-group .lrn-qe-form-control.lt__input-invalid:focus:not(:disabled):not([readonly]) {
    border-color: #ff0000;
    outline: 0.0714285714em solid #dd002f;
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
