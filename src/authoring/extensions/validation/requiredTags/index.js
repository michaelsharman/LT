import { appInstance } from '../../../core/app.js';
import { createModule } from '../../../../utils/moduleFactory.js';
import logger from '../../../../utils/logger.js';

/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Validates that all required tags are present before publishing an item.
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/requiredTags/requiredTags.gif" alt="" width="860"></p>
 * @module Extensions/Authoring/requiredTags
 */

const state = {
    options: {
        heading: 'Required tag{s} missing',
        headingLevel: 3,
        messageStart: 'Please add the following tag{s} before publishing:',
        messageEnd: '',
        requiredTags: [],
    },
    renderedCss: false,
};

/**
 * Listen for the user applying changes to (or saving) item settings.
 * If they attempt to publish an item, validate that certain tags have been applied.
 * @example
 * import { LT } from '@caspingus/lt/authoring';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.requiredTags.run();
 * @param {object} [options] - Options to override the default settings.
 *  ```
 *  {
 *       heading: 'Required tag{s} missing',
 *       headingLevel: 3,
 *       messageStart: 'Please add the following tag{s} before publishing:',
 *       messageEnd: '',
 *       requiredTags: [],
 *   }
 * ```
 * @since 3.0.0
 */
function run(options = {}) {
    state.options = { ...state.options, ...options };

    // When we render an item, check whether it's new. If so, force the status to be unpublished.
    appInstance().on('render:item', () => {
        if (appInstance().getLocation()?.route === 'items/new') {
            setItemStatus('unpublished');
        }
    });

    // When item settings are applied, validate the item tags _if_ the status was changed to published
    appInstance().on('itemsettings:applied', () => {
        if (appInstance().getItem()?.item?.status === 'published') {
            runValidation();
        }
    });

    // When the user tries to save the item, validate the tags if the status is published
    appInstance().on('save', e => {
        if (appInstance().getItem()?.item?.status === 'published') {
            if (!runValidation(true)) {
                e.preventDefault();
            }
        }
    });
}

/**
 * Creates the error dialog if it doesn't already exist.
 * @returns {void}
 * @since 3.0.0
 * @ignore
 */
function createErrorDialog() {
    if (document.getElementById('lt__error-dialog')) {
        return;
    }

    const elAuthorApp = document.querySelector('.lrn-author');

    if (!elAuthorApp) {
        logger.error('No Author API element found');
        return;
    }

    const elDialog = document.createElement('dialog');
    elDialog.id = 'lt__error-dialog';
    elDialog.className = 'lt__error-dialog';
    elDialog.innerHTML = `
        <h${state.options.headingLevel} id="lt__error-heading"></h${state.options.headingLevel}>
        <div id="lt__error-message"></div>
        <div id="lt__tags-ui"></div>
        <div id="lt__dialog-footer">
            <button id="lt__error-close" class="lds-btn lds-btn-secondary">Close</button>
            <button id="lt__tags-save" class="lds-btn lds-btn-primary">Add tags</button>
        </div>
    `;

    elAuthorApp.appendChild(elDialog);

    state.renderedCss || (injectCSS(), (state.renderedCss = true));
}

/**
 * Renders the error dialog for missing tags.
 * @param {array} missingTags
 * @param {boolean} [saveOnValid=false] - If true, saves the item after adding the tags.
 * @since 3.0.0
 * @ignore
 */
function renderDialog(missingTags, saveOnValid = false) {
    createErrorDialog();

    const elDialog = document.getElementById('lt__error-dialog');
    const elHeading = document.getElementById('lt__error-heading');
    const elMessage = document.getElementById('lt__error-message');
    const elTagsUI = document.getElementById('lt__tags-ui');
    const elCloseBtn = document.getElementById('lt__error-close');
    const elSaveTagsBtn = document.getElementById('lt__tags-save');
    const tags = appInstance().renderComponent('tags', elTagsUI);
    const plural = missingTags.length > 1 ? 's' : '';

    elHeading.innerHTML = `${state.options.heading.replace('{s}', plural)}`;
    elMessage.innerHTML = `
        <p>${state.options.messageStart.replace('{s}', plural)}</p>
        <ul>${missingTags.map(tag => `<li>${tag}</li>`).join('')}</ul>
        <p>${state.options.messageEnd}</p>
    `;

    elCloseBtn.onclick = () => elDialog.close();
    elDialog.oncancel = null;

    elSaveTagsBtn.onclick = () => {
        const addedTags = tags.getSelectedTags();
        const currentTags = appInstance().getItemTags();
        const combinedTags = [...currentTags, ...addedTags.filter(a => !currentTags.some(e => e.type === a.type && e.name === a.name))];
        const validate = validateItemTags(combinedTags);

        appInstance().setItemTags(combinedTags);

        if (!validate.valid) {
            renderDialog(validate.message);
            return;
        }

        if (saveOnValid) {
            appInstance().save();
        }

        elDialog.close();
    };

    if (!elDialog.open) {
        elDialog.showModal();
    }
}

/**
 * Runs validation on the current item tags against the required tags.
 * @param {boolean} [saveOnValid=false] - If true, saves the item after validation.
 * @returns {boolean} - Returns true if validation passes, false otherwise.
 * @since 3.0.0
 * @ignore
 */
function runValidation(saveOnValid = false) {
    const validItemTags = validateItemTags(appInstance().getItemTags());

    if (!validItemTags?.valid) {
        renderDialog(validItemTags.message, saveOnValid);
        return false;
    }

    return true;
}

/**
 * Sets the status of a new item.
 * Defaults to `unpublished`
 * @param {string} status
 * @since 3.0.0
 * @ignore
 */
function setItemStatus(status = 'unpublished') {
    appInstance().setStatus(status);
}

/**
 * Checks the current item tags to see if they include all required tags.
 * If not, it returns an object indicating the missing tags.
 * @param {array} tagsToValidate
 * @returns {object}
 * @since 3.0.0
 * @ignore
 */
function validateItemTags(tagsToValidate) {
    const toKey = s => String(s).trim().toLowerCase();
    const reqSet = new Set(state.options.requiredTags.map(toKey));

    const presentSet = new Set(
        (Array.isArray(tagsToValidate) ? tagsToValidate : [])
            .map(t => t?.type)
            .filter(v => typeof v === 'string' && v.trim() !== '')
            .map(toKey)
    );

    const missingKeys = [...reqSet].filter(k => !presentSet.has(k));
    const pretty = missingKeys
        .map(k => state.options.requiredTags.find(r => toKey(r) === k) || k)
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

    const outcome = {
        valid: missingKeys.length === 0,
        message: pretty,
    };

    return outcome;
}

/**
 * Injects the necessary CSS to the header
 * @since 3.0.0
 * @ignore
 */
function injectCSS() {
    const elAuthorApp = document.querySelector('.lrn-author');
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity required tags styles */
.lt__error-dialog {
    border: none;
    border-radius: 4px;
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    background-color: #fff;
    width: 600px;
    max-width: 90%;
    font-size: 1.1em;

    &[open] {
        display: flex;
        flex-direction: column;
    }

    &::backdrop {
        background: rgba(0, 0, 0, 0.6);
    }

    .lt__error-dialog > #lt__error-message,
    .lt__error-dialog > #lt__tags-ui {
        overflow-y: auto;
    }

    #lt__dialog-footer {
        margin-top: auto;
        display: flex;
        justify-content: flex-start;
        gap: 0.5rem;
        padding-top: 1rem;
    }

    h2, h3, h4 {
        margin-top: 0;
        color: #d93025;
    }

    #lt__tags-ui {
        padding-top: 1em;
    }

    .lrn-author {
        min-height: 22em;

        .lrn-author-api-react-container .lrn-author-settings-tags-container {
            min-height: 15em;
        }
    }
}
`;

    elStyle.setAttribute('data-style', 'LT Required Tags');
    elStyle.textContent = css;
    elAuthorApp.appendChild(elStyle);

    state.renderedCss = true;
}

export const requiredTags = createModule('requiredTags', run);
