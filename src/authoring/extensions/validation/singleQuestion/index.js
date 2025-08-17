import { appInstance } from '../../../core/app.js';
import { checkAppVersion } from '../../../utils/styling.js';
import { createExtension } from '../../../../utils/extensionsFactory.js';

/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Restricts authors to add only one question to an item.
 * Allows multiple features to be added to the item, but only one question.
 *
 * If you want any features, they must be added first.
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/singleQuestion/singlequestion.gif" alt="" width="860"></p>
 * @module Extensions/Authoring/singleQuestion
 */

const state = {
    classNamePrefix: null,
    elements: {},
};

/**
 * Sets up a listener to hide the "+" button if a question is
 * already added to the item.
 * @example
 * import { LT } from '@caspingus/lt/authoring';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.singleQuestion.run();
 * @since 2.20.0
 */
function run() {
    cacheElements();
    appInstance().on('render:item', checkQuestions);
    appInstance().on('render:widgets', checkQuestions);
    appInstance().on('itemedit:changed', checkQuestions);
}

/**
 * Hides or shows the "+" button based on the number of
 * questions in the item.
 * @since 2.20.0
 * @ignore
 */
function checkQuestions() {
    // Have to call this here because in run() the `diagnostics().versions` object isn't yet populated
    state.classNamePrefix = checkAppVersion(state.classNamePrefix);

    const item = appInstance().getItem();
    if (item.questions.length) {
        hideAddButton();
    } else {
        showAddButton();
    }
}

/**
 * Hides the "+" button.
 * @since 2.20.0
 * @ignore
 */
function hideAddButton() {
    const elButtons = state.elements.apiWrapper.querySelectorAll('[data-authorapi-selector="add-button"]');
    const elExtras = state.elements.apiWrapper.querySelectorAll('.lrn-author-ui-add-extras');
    const allElements = [...elButtons, ...elExtras];

    if (allElements) {
        allElements.forEach(el => {
            el.classList.add(`lrn-${state.classNamePrefix}hide`);
        });
    }
}

/**
 * Shows the "+" button.
 * @since 2.20.0
 * @ignore
 */
function showAddButton() {
    const elButtons = state.elements.apiWrapper.querySelectorAll('[data-authorapi-selector="add-button"]');
    const elExtras = state.elements.apiWrapper.querySelectorAll('.lrn-author-ui-add-extras');
    const allElements = [...elButtons, ...elExtras];

    if (allElements) {
        allElements.forEach(el => {
            el.classList.remove(`lrn-${state.classNamePrefix}hide`);
        });
    }
}

/**
 * Caches DOM lookups for performance.
 * @since 2.20.0
 * @ignore
 */
function cacheElements() {
    state.elements.apiWrapper = document.querySelector('.lrn-author');
}

export const singleQuestion = createExtension('singleQuestion', run);
