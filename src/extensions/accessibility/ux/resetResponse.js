import * as app from '../../../app';
import * as logger from '../../../utils/logger';
import * as question from '../../../assessment/questions';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Resets a question by clearing (resetting) the UI
 * and setting the `attempted` status to false.
 *
 * Supports
 *  - single-select MCQ
 *  - multi-select MCQ
 *  - true/false
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/resetresponse.gif" alt="" width="600"></p>
 * @module _Extensions/resetResponse
 */

const state = {
    label: 'Reset question',
    types: ['mcq'],
    class: 'lrn__resetResponse',
};

/**
 * Sets up an item load listener and injects a reset
 * response button to the UI at the bottom of each
 * MC question on the item.
 *
 * @example
 * import { LT } from '@caspingus/lt/src/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.resetResponse.run();
 * @param {string} label A custom label to use for the reset button.
 * @since 0.8.0
 */
export function run(customLabel) {
    if (customLabel && typeof customLabel === 'string') {
        state.label = customLabel;
    }

    injectCSS();

    app.appInstance().on('item:load', () => {
        setupResetUI();
    });
}

/**
 * Injects a custom button to supported types.
 * Adds an event listener on click.
 * @since 0.8.0
 * @ignore
 */
function setupResetUI() {
    const itemQuestions = question.questions();

    // Add a reset UI to each supported question type on the item
    try {
        for (const q of itemQuestions) {
            if (state.types.includes(q.type)) {
                const r = q.response_id;
                const elQuestion = document.getElementById(r);
                const elResponse = elQuestion.querySelector('.lrn_response');
                let elResetUI = elQuestion.querySelector(`.${state.class}`);
                if (!elResetUI) {
                    elResponse.append(getResetUI());
                    elResetUI = elQuestion.querySelector(`.${state.class}`);
                    elResetUI.addEventListener('click', resetResponse);
                }
            }
        }
    } catch (err) {
        logger.error(err);
    }
}

/**
 * Injects the necessary CSS to the header
 * @since 0.8.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity MCQ reset styles */
.lrn .lrn_btn.${state.class} {
    margin-top: 1em;
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);
}

/**
 * Generates the HTML for the UI to reset a question.
 * @since 0.8.0
 * @ignore
 * @returns {object} HTML of reset UI element
 */
function getResetUI() {
    const elWrapper = document.createElement('button');
    const elLabel = document.createElement('span');

    elWrapper.classList.add('lds-btn', 'lds-btn-secondary', 'lrn_btn', state.class);
    elLabel.append(state.label);
    elWrapper.append(elLabel);

    return elWrapper;
}

/**
 * Calls resetResponse() on the question instance
 * @param {object} e Question instance where the button was clicked
 * @since 0.8.0
 * @ignore
 */
function resetResponse(e) {
    const elQuestion = e.srcElement.closest('.lrn_widget');
    const responseId = elQuestion.getAttribute('id');
    const questionInstance = app.questionsApp().question(responseId);
    questionInstance.resetResponse();
}
