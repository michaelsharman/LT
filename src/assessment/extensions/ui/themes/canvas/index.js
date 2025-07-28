import * as app from '../../../../core/app.js';
import styles from './styles/index.css?inline';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * This script loads a custom UI theme for Items API.
 *
 * Canvas is a minimal theme based on the Canvas LMS New Quizzes look and feel.
 *
 * Items are vertically stacked with a flag button for each item. Because the assessment
 * player is still present, you can have a timed test, auto-save, and other features.
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/themes/theme-canvas.png" alt="" width="900"></p>
 *
 * Use the following custom region configuration in Items API to load this theme:
 *
 * ```
 * {
 *     "config": {
 *         "title": "Assessment title",
 *         "subtitle": "Assessment subtitle",
 *         "regions": {
 *             "items": [
 *                 {
 *                     "type": "vertical_element",
 *                     "vertical_stretch_option": false,
 *                     "scrollable_option": false
 *                 }
 *             ],
 *             "top-left": [
 *                 {
 *                     "type": "title_element"
 *                 }
 *             ],
 *             "bottom-right": [
 *                 {
 *                     "type": "submit_button"
 *                 }
 *             ]
 *         },
 *         "configuration": {
 *             "question_indexing": true,
 *             "accessibility": {
 *                 "headings": {
 *                     "question": false
 *                 }
 *             }
 *         }
 *     }
 * }
 * ```
 *
 * @module Extensions/Assessment/themes/canvas
 */

const state = {
    elements: {},
    renderedCss: false,
    theme: 'canvas',
};

/**
 * Loads the `Canvas` theme for Items API (the player).
 *
 * @example
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.themes.canvas.run();
 * @since 2.14.0
 */
export function run() {
    state.renderedCss || injectCSS();

    cacheElements();
    addThemeWrapperElement();
    setupItemFlags();
    setupShowQuestionScore();
    checkLegacyItemLayout();
}

/**
 * Adds a custom element around the div with `lrn-assess` for hooks and specificity.
 * @since 2.14.0
 * @ignore
 */
function addThemeWrapperElement() {
    const elApiWrapper = state.elements.apiWrapper;
    const elWrapper = document.createElement('main');

    elWrapper.className = `lt__theme lt__theme-${state.theme}`;
    elApiWrapper.parentNode.insertBefore(elWrapper, elApiWrapper);
    elWrapper.appendChild(elApiWrapper);
}

/**
 * Caches DOM lookups for performance.
 * @since 2.14.0
 * @ignore
 */
function cacheElements() {
    state.elements.apiWrapper = document.querySelector('.lrn-assess');
    state.elements.items = document.querySelectorAll('.inline-item');
}

/**
 * Adds a flag button to each item.
 * @since 2.14.0
 * @ignore
 */
function setupItemFlags() {
    state.elements.items.forEach(item => {
        const reference = item.getAttribute('data-reference');
        item.querySelector('.lrn-assess-content').insertAdjacentHTML('afterbegin', flagTemplate(reference));
    });

    const elFlags = document.querySelectorAll('.item-flag');

    elFlags.forEach(flag => {
        flag.addEventListener('click', flagItem);
    });

    function flagTemplate(reference) {
        return `<button type="button" class="item-flag" aria-label="Flag item" data-reference="${reference}">
            <span class="btn-label sr-only">Flag</span>
            <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" aria-label="Flag item">
                <defs></defs>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M68.2505357,3.69288674 C69.3983251,2.54509738 71.2585777,2.54441581 72.4113235,3.69716157 L95.9533021,27.2391402 C97.1034524,28.3892904 97.1016597,30.2558452 95.9575769,31.399928 L93.1873296,34.1701753 C92.0395402,35.3179647 90.1792875,35.3186462 89.0265418,34.1659005 L65.4845632,10.6239219 C64.3344129,9.47377159 64.3362056,7.60721684 65.4802884,6.46313407 L68.2505357,3.69288674 L68.2505357,3.69288674 Z" stroke-width="4"></path>
                    <path d="M65.0919375,57.6126738 L85.7185269,30.8578856 L68.8818314,14.0211901 L42.0592684,34.5649228 C47.335976,36.1382935 52.3084627,39.0083833 56.4752716,43.1751921 C60.6477335,47.3476541 63.5199555,52.3279816 65.0919375,57.6126738 L65.0919375,57.6126738 L65.0919375,57.6126738 Z" stroke-width="4"></path>
                    <path d="M56.4752716,43.1751921 C43.0858673,29.7857878 21.3773537,29.7857878 7.98794943,43.1751921 L56.4752716,91.6625142 C69.8646759,78.2731099 69.8646759,56.5645964 56.4752716,43.1751921 L56.4752716,43.1751921 Z" stroke-width="4"></path>
                    <path d="M32.2316105,68.1115292 L2.44654118,97.8965985" stroke-width="4"></path>
                </g>
            </svg>
        </button>`;
    }
}

/**
 * Toggles the flag state for each item when clicked.
 * @since 2.14.0
 * @ignore
 */
function flagItem(el) {
    const reference = el.target.getAttribute('data-reference');

    app.appInstance().assessApp().item(reference).flag();
    el.target.classList.toggle('flagged');
}

/**
 * Adds a question score for each item.
 * @since 2.14.0
 * @ignore
 */
function setupShowQuestionScore() {
    state.elements.items.forEach(elItem => {
        const reference = elItem.getAttribute('data-reference');
        const item = app.appInstance().getItems()[reference];
        const questions = item.questions;

        questions.forEach((question, index) => {
            const score =
                (app.appInstance().question(question.response_id).checkValidation().has_validation && question?.validation?.valid_response?.score) ||
                question?.validation?.max_score ||
                0;

            elItem.querySelectorAll('.question-number')[index].insertAdjacentHTML('afterend', scoreTemplate(score));

            function scoreTemplate(score) {
                return `<span class="question-score">${score} point${score !== 1 ? 's' : ''}</span>`;
            }
        });
    });
}

/**
 * Checks for very old item layouts and applies a fix for layout.
 * @since 2.14.0
 * @ignore
 */
function checkLegacyItemLayout() {
    state.elements.items.forEach(elItem => {
        const row = elItem.querySelector('.row');

        if (!row) {
            const elQuestionNumberWrapper = elItem.querySelector('.numbered-question');
            const elQuestionNumber = elItem.querySelector('.question-number');

            elQuestionNumberWrapper.classList.add('position-relative');
            elQuestionNumber.classList.add('extra-left-position');
        }
    });
}

/**
 * Injects the necessary CSS to the header
 * @since 3.0.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = styles;

    elStyle.setAttribute('data-style', 'LT Theme Canvas');
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
