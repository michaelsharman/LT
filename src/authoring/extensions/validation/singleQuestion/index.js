import * as app from '../../../core/app';

/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Restricts authors to add only none question to an item.
 * Allows multiple features to be added to the item, but only one question.
 *
 * If you want any features, they must be added first.
 * @module Extensions/Authoring/singleQuestion
 */

const state = {
    elements: {},
};

/**
 * Sets up a listener to hide the "+" button if a question is
 * already added to the item.
 * @example
 * import { LT } from '@caspingus/lt/src/index';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.singleQuestion.run();
 * @since 2.20.0
 */
export function run() {
    cacheElements();
    app.appInstance().on('render:item', checkQuestions);
    app.appInstance().on('render:widgets', checkQuestions);
    app.appInstance().on('itemedit:changed', checkQuestions);
}

/**
 * Hides or shows the "+" button based on the number of
 * questions in the item.
 * @since 2.20.0
 * @ignore
 */
function checkQuestions(e) {
    const item = app.appInstance().getItem();
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
            el.classList.add('lrn-hide');
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
            el.classList.remove('lrn-hide');
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
