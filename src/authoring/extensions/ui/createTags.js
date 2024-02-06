import * as app from '../../app';

/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds the ability for authors to create tags (type:tag) if
 * they don't yet exist in the item bank.
 * @module _Extensions/Authoring/createTags
 * @ignore
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
 * @since 2.0.0
 */
export function run() {
    if (!state.renderedCss) injectCSS();

    app.appInstance().on('all', e => {
        // console.log(e);
    });

    app.appInstance().on('navigate', () => {
        if (app.appInstance().getLocation().route === 'items/:reference/settings/:tab') {
            setup();
        }
    });
}

/**
 * Listens for changes to the tag input field.
 * If no suggestions were found, calls method
 * to show the create UI.
 * @since 2.0.0
 * @ignore
 */
function setup() {
    const elTagsInput = document.querySelector('[data-authorapi-selector="tag-search-input"]');
    let elNoSuggestions;

    elTagsInput.addEventListener('input', () => {
        console.log('input change');
        elNoSuggestions = document.querySelector('.lrn-author-tag-no-suggestions');
        if (elNoSuggestions) {
            showCreateTagsUI();
        } else {
            hideCreateTagsUI();
        }
    });
}

/**
 * Injects the necessary UI to tags panel.
 * @since 2.0.0
 * @ignore
 */
function showCreateTagsUI() {
    console.log('showcreatetagsui');
    const elTagsInput = document.querySelector('[data-authorapi-selector="tag-search-input"]');
    const elNoSuggestions = document.querySelector('.lrn-author-tag-no-suggestions');
    const template = `
        <div id="lrn__createTagsContainer" class="createTagsContainer">
            <div id="lrn__createTagsData"></div>
        </div>
    `;
    let elNewTagsContainer = document.getElementById('lrn__createTagsContainer');
    let elNewTagsData;
    let newTag;

    if (!elNewTagsContainer) {
        elNoSuggestions.insertAdjacentHTML('beforeend', template);
    }

    elNewTagsData = document.getElementById('lrn__createTagsData');

    if (checkTagSyntax(elTagsInput.value)) {
        elNewTagsData.removeEventListener('click', () => {
            setTags(elTagsInput.value);
        });
        elNewTagsData.innerHTML = `Create <code>${elTagsInput.value}</code> as a new tag?`;
        elNewTagsData.addEventListener('click', () => {
            setTags(elTagsInput.value);
        });
    } else {
        elNewTagsData.removeEventListener('click', () => {
            setTags(elTagsInput.value);
        });
        elNewTagsData.innerHTML = '';
    }
}

function hideCreateTagsUI() {}

/**
 * Checks the syntax of a string to make sure it's valid.
 * The correct format is [tag type]:[tag name],
 * eg Subject:English
 * @param {string} s
 * @returns {boolean}
 */
function checkTagSyntax(s) {
    return /^[^:\s]+:\s*\S+$/.test(s);
}

function setTags(t) {
    const currentTags = app.appInstance().getItemTags();

    if (checkTagSyntax(t)) {
        console.log('valid syntax');
        const parts = t.split(':').map(part => part.trim());
        console.log(parts);
        currentTags.push({ type: parts[0], name: parts[1] });
        app.appInstance().setItemTags(currentTags);
    }
}

/**
 * Injects the necessary CSS to the header
 * @since 2.0.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity create tags styles */
.createTagsContainer {
    padding-top: 10px;
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
