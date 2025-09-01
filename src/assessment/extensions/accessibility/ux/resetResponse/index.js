import { createExtension, LT } from '../../../../../utils/extensionsFactory.js';

/**
 * Resets a question by clearing (resetting) the UI
 * and setting the `attempted` status to false.
 *
 * Supports all question types, however we set to multiple choice (`mcq`) by default.
 * If you want all types, pass `['*']` as the second argument.
 * If you want a subset, pass an array of type alias' as the second argument.
 * See the `type` property for each type here https://reference.learnosity.com/questions-api/questiontypes
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/resetresponse.gif" alt="" width="600"></p>
 *
 * @param {object=} options Object of configuration options.
 * @param {string=} options.label A custom label to use for the reset button.
 * @param {array=} options.types Which question types to support. `['*']` for all types.
 *
 * @example
 * const options = {
 *     label: 'Reset question',
 *     types: ['mcq']
 * }
 *
 * LT.init(itemsApp, {
 *     extensions: [
 *         { id: 'resetResponse', args: options },
 *     ],
 * });
 *
 * @module Extensions/Assessment/resetResponse
 */

const state = {
    class: 'lrn__resetResponse',
    label: 'Reset question',
    logPrefix: 'LRN Reset Responses:',
    types: ['mcq'],
};

/**
 * Sets up an item load listener and injects a reset response button
 * to the UI at the bottom of each configured question on the item.
 * @param {object} config Optional config object to override defaults
 * @since 0.8.0
 * @ignore
 */
function run(config) {
    const { label, types } = config || {};

    if (label && typeof label === 'string') {
        state.label = label;
    }
    if (types && Array.isArray(types)) {
        state.types = types;
    }

    LT.itemsApp().on('item:changed', setupResetUI);
}

/**
 * Injects a custom button to supported types.
 * Adds an event listener on click.
 * @since 0.8.0
 * @ignore
 */
function setupResetUI() {
    const itemQuestions = LT.questions();

    // Add a reset UI to each supported question type on the item
    try {
        for (const q of itemQuestions) {
            if (state.types.includes('*') || state.types.includes(q.type)) {
                const r = q.response_id;
                const elQuestion = document.getElementById(r);
                if (elQuestion) {
                    const elResponse = elQuestion.querySelector('.lrn_response');
                    let elResetUI = elQuestion.querySelector(`.${state.class}`);
                    if (!elResetUI) {
                        elResponse.append(getResetUI());
                        elResetUI = elQuestion.querySelector(`.${state.class}`);
                        elResetUI.addEventListener('click', doResetResponse);
                    }
                } else {
                    LT.utils.logger.warn(state.logPrefix, 'Question element not found');
                }
            }
        }
    } catch (err) {
        LT.utils.logger.error(err);
    }
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
function doResetResponse(e) {
    const elQuestion = e.srcElement.closest('.lrn_widget');
    const responseId = elQuestion.getAttribute('id');
    const questionInstance = LT.questionsApp().question(responseId);
    questionInstance.resetResponse();
}

/**
 * Returns the extension CSS
 * @since 3.0.0
 * @ignore
 */
function getStyles() {
    return `
        /* Learnosity reset question styles */
        .lrn .lrn_btn.${state.class} {
            margin-top: 1em;
            margin-bottom: 0.5em;
            clear: both;
            display: block;
        }
    `;
}

export const resetResponse = createExtension('resetResponse', run, {
    getStyles,
});
