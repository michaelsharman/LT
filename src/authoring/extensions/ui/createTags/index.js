import * as app from '../../../core/app';
import { debounce } from 'lodash-es';

/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds the ability for authors to create tags (type:tag)
 * via the Author API if they don't yet exist in the item bank.
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/createtags.gif" alt="" width="660"></p>
 * @module Extensions/Authoring/createTags
 */

const state = {
    renderedCss: false,
};

/**
 * Sets up a listener when the tags panel opens to inject
 * new behaviour to create a tag type:tag.
 * @example
 * import { LT } from '@caspingus/lt/src/index';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.createTags.run();
 * @since 2.18.0
 */
export function run() {
    if (!state.renderedCss) injectCSS();

    // We need to wait for the UI to be ready
    setTimeout(() => {
        checkForSetup();
    }, 1500);

    app.appInstance().on('navigate', checkForSetup);

    function checkForSetup() {
        setTimeout(() => {
            if (app.appInstance().getLocation().route === 'items/:reference/settings/:tab') {
                setup();
            }
        }, 300);
    }
}

/**
 * Listens for changes to the tag input field.
 * If no suggestions were found, calls method
 * to show the create UI.
 * @since 2.18.0
 * @ignore
 */
function setup() {
    const elTagsInput = document.querySelector('[data-authorapi-selector="tag-search-input"]');
    const elTagList = document.querySelector('.lrn-author-tag-suggestion-list');

    if (elTagsInput) elTagsInput.addEventListener('input', debounce(handleInput, 750));

    function handleInput() {
        const elNoSuggestions = elTagList.querySelector('li.lrn-author-tag-no-suggestions');
        if (elNoSuggestions) {
            showCreateTagsUI(elNoSuggestions);
        }
    }
}

/**
 * Injects the create tag UI to tags panel.
 * @since 2.18.0
 * @ignore
 */
function showCreateTagsUI(elNoSuggestions) {
    const elNewTagsContainer = elNoSuggestions.querySelector('.lt__createTagsContainer');
    const elInvalidSyntax = document.querySelector('.lt__error');
    const template = `
        <div class="lt__createTagsContainer">
            <span class="lt__error hidden">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <span class="lt__errorMessage">Invalid format. Use [type]:[name]</span>
            </span>
            <button type="button" id="lt__createTagsBtn" class="lrn-btn lrn-btn-primary lds-btn lds-btn-primary lds-btn-sm">Create</button>
        </div>

    `;
    if (!elNewTagsContainer) elNoSuggestions.insertAdjacentHTML('beforeend', template);
    if (elInvalidSyntax) elInvalidSyntax.classList.add('hidden');

    const elNewTagsBtn = document.getElementById('lt__createTagsBtn');
    elNewTagsBtn.addEventListener('click', createTag);
}

/**
 * Creates a new tag and adds it to the item.
 * Nothing is stored in the database until the
 * item is saved.
 * @since 2.18.0
 * @ignore
 */
function createTag() {
    const elTagsInput = document.querySelector('[data-authorapi-selector="tag-search-input"]');
    const elErrorContainer = document.querySelector('.lt__error');
    const currentTags = app.appInstance().getItemTags();
    const newTag = elTagsInput.value;

    if (checkTagSyntax(newTag)) {
        const parts = newTag.split(':').map(part => part.trim());
        if (validateTag(currentTags, { type: parts[0], name: parts[1] })) {
            currentTags.push({ type: parts[0], name: parts[1] });
            app.appInstance().setItemTags(currentTags);
        } else {
            const elErrorMessage = elErrorContainer.querySelector('.lt__errorMessage');
            elErrorMessage.textContent = 'Tag already exists';
            elErrorContainer.classList.remove('hidden');
        }
    } else {
        elErrorContainer.classList.remove('hidden');
    }
}

/**
 * Validates the tag syntax, whether the tag has
 * already been added, and whether it is in the
 * restricted list.
 * @since 2.18.0
 * @ignore
 * @param {string} tag
 * @returns {boolean}
 */
function validateTag(current, newTag) {
    const check = item => JSON.stringify(item) === JSON.stringify(newTag);
    const exists = current.length && current.some(check);

    return Boolean(!exists);
}

/**
 * Checks the syntax of a string to make sure it's valid.
 * The correct format is [tag type]:[tag name],
 * eg Subject:English
 * @since 2.18.0
 * @ignore
 * @param {string} s
 * @returns {boolean}
 */
function checkTagSyntax(s) {
    return /^[^:\s]+:\s*\S+$/.test(s);
}

/**
 * Injects the necessary CSS to the header
 * @since 2.18.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity create tags styles */
.lt__createTagsContainer {
    position: relative;
    top: -21px;
    float: right;
    font-size: 85%;
    height: 1px;
}
.lt__error {
    color: #dd002f;
    padding-right: 2px;

    svg {
        vertical-align: middle;
    }
}
.lrn.lrn-author .lrn-author-api-react-container .lrn-author-settings-tag-search span.lt__errorMessage {
    margin-left: 0;
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
