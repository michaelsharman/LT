import iconContentTabs from './assets/icon_tabs.svg';

/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds the ability for authors to add any number of tabs within a
 * rich-text content block. This is achieved by leveraging custom buttons.
 *
 * Each tab can be labelled. You can set content within each tab.
 *
 * <strong>Important</strong>
 *
 * The `active` tab (ie the tab that will be in focus) will be the one
 * that the author last had focus on when they changed content and saved.
 * You probably want that to be the first tab. If it's not, you need to edit
 * the question, click the first tab <em>inside the rich-text editor</em>,
 * make sure to change something even if it's adding a character and removing
 * it, then save.
 *
 * Adding a custom button is a capability in Author API. Below is a code
 * snippet of an Author API configuration object. Note the custom button
 * is added under `rich_text_editor`.
 *
 * You MUST use the object as defined below. Also, note the `toolbar_settings`
 * which is required to place the custom button(s) where you want in the toolbar.
 *
 * ```
 * {
 *     "config": {
 *         "dependencies": {
 *             "question_editor_api": {
 *                 "init_options": {
 *                     "rich_text_editor": {
 *                         "customButtons": [
 *                             {
 *                                 "func": "LT.extensions.contentTabs.addContentTabs",
 *                                 "icon": "/poc/content-tabs/dist/45702062e0a01c4cc7f0.svg",
 *                                 "label": "Add content tabs",
 *                                 "name": "addContentTabs",
 *                                 "attributes": ["content","stimulus","template"]
 *                             }
 *                         ],
 *                         "toolbar_settings": {
 *                             "ltr_toolbar": [
 *                                 {
 *                                     "items": ["Bold","Italic","Underline","-","TextColor","-", "LrnUnderlinedIndicator","-","RemoveFormat","FontSize"],
 *                                     "name": "basicstyles"
 *                                 },
 *                                 {
 *                                     "items": ["NumberedList","BulletedList","-","Indent","Outdent"],
 *                                     "name": "list"
 *                                 },
 *                                 {
 *                                     "items": ["JustifyLeft","JustifyCenter","JustifyRight","JustifyBlock"],
 *                                     "name": "justify"
 *                                 },
 *                                 {
 *                                     "items": ["Link","Unlink"],
 *                                     "name": "link"
 *                                 },
 *                                 {
 *                                     "items": ["Image","LrnMath","Table","Blockquote","SpecialChar"],
 *                                     "name": "insert"
 *                                 },
 *                                 {
 *                                     "items": ["LrnSimpleFeature"],
 *                                     "name": "simplefeature"
 *                                 },
 *                                 {
 *                                     "items": ["LrnResource"],
 *                                     "name": "resource"
 *                                 },
 *                                 {
 *                                     "items": ["LrnEditAriaLabel","LrnPopupContent"],
 *                                     "name": "editAriaLabel"
 *                                 },
 *                                 {
 *                                     "name": "custombuttons"
 *                                 },
 *                                 {
 *                                     "items": ["Undo","Redo"],
 *                                     "name": "clipboard"
 *                                 },
 *                                 {
 *                                     "items": ["Styles"],
 *                                     "name": "style"
 *                                 },
 *                                 {
 *                                     "items": ["Sourcedialog"],
 *                                     "name": "mode"
 *                                 },
 *                                 {
 *                                     "items": ["lrn_datatable"],
 *                                     "name": "data"
 *                                 }
 *                             ]
 *                         }
 *                     }
 *                 }
 *             }
 *         }
 *     }
 * }
 * ```
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/contenttabs1.png" alt="" width="660"></p>
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/contenttabs2.png" alt="" width="660"></p>
 * @module Extensions/Authoring/contentTabs
 */

const state = {
    renderedCss: false,
};

/**
 * Extension constructor.
 * @example
 * import { LT } from '@caspingus/lt/src/authoring/index';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.contentTabs.run();
 * @since 2.1.0
 */
export function run() {
    if (!state.renderedCss) injectCSS();

    // Inject class for specificity
    const elLrnApi = document.querySelector('.lrn-author');
    elLrnApi.classList.add('lt__contenttabs');
}

/**
 * Called via a custom button in the rich text toolbar.
 * Renders a modal asking the author how many tabs they
 * want to add where the cursor is.
 * @since 2.1.0
 * @param {*} attribute
 * @param {*} callback
 */
export function addContentTabs(attribute, callback) {
    let templateNumTabs = `
    <div class="lrn-qe lrn-qe-modal" style="display: block;" id="lt__addTabs">
        <div class="lrn-qe-ui">
            <div class="lrn-qe-modal-dialog">
                <div class="lrn-qe-modal-dialog-inner">
                    <div class="lrn-qe-modal-header">
                        <div class="lrn-qe-form-label lrn-qe-h4 lrn-qe-section-header">
                            <h4 class="lrn-qe-heading"><label class="lrn-qe-label lrn-qe-form-label-name">Choose number of tabs</label></h4>
                        </div>
                        <button type="button" class="lrn-qe-btn lrn-qe-modal-btn-close" aria-label="Close" tabindex="0">
                            <span class="lrn-qe-sr-only">Close</span>
                            <span aria-role="presentation" class="lrn-qe-i-cross"></span>
                        </button>
                    </div>
                    <div data-lrn-qe-selector="modal-outlet">
                        <div class="lrn-qe-modal-content" data-lrn-qe-modal-section="content">
                            <div class="lrn-qe-edit-aria-label">
                                <div class="lrn-qe-form-group-wrapper">
                                    <label class="lrn-qe-label lrn-qe-form-label" for="numtabs">Number of tabs</label>
                                    <input class="lrn-qe-input lrn-qe-form-control" type="number" id="numtabs" value="2" min="1" max="4" required>
                                </div>
                            </div>
                        </div>
                        <div class="lrn-qe-modal-footer">
                            <ul class="lrn-qe-ul">
                                <li class="lrn-qe-li lrn-qe-modal-footer-item">
                                    <button type="button" class="lrn-qe-btn lrn-qe-btn-default"><span>Cancel</span></button>
                                </li>&nbsp;
                                <li class="lrn-qe-li lrn-qe-modal-footer-item">
                                    <button type="button" class="lrn-qe-btn lrn-qe-btn-primary" data-lrn-qe-modal-action="confirm"><span>Add tabs</span></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    document.querySelector('.learnosity-question-editor').insertAdjacentHTML('beforeEnd', templateNumTabs);

    let elClose = [];
    elClose.push(document.querySelector('#lt__addTabs .lrn-qe-btn-default'));
    elClose.push(document.querySelector('#lt__addTabs .lrn-qe-modal-btn-close'));
    for (let i = 0; i < elClose.length; i++) {
        elClose[i].addEventListener('click', () => {
            removeElement('lt__addTabs');
            return callback('');
        });
    }

    let elAdd = document.querySelector('#lt__addTabs .lrn-qe-btn-primary');
    elAdd.addEventListener('click', () => {
        let n = document.getElementById('numtabs').value;
        removeElement('lt__addTabs');
        return callback(getTabsTemplate(n));
    });
}

/**
 * Generates a random string. Used to set id's for each tab.
 * @since 2.1.0
 * @returns {string}
 * @ignore
 */
function generateRandomString() {
    return Math.floor(Math.random() * Date.now()).toString(36);
}

/**
 * Removed an element from the DOM.
 * @since 2.1.0
 * @param {string} id
 * @ignore
 */
function removeElement(id) {
    document.getElementById(id).remove();
}

/**
 * Returns the template used to inject into the rich-text editor.
 * @since 2.1.0
 * @param {number} n Number of tabs to add.
 * @returns {string}
 * @ignore
 */
function getTabsTemplate(n) {
    let templateTabsUI = `<div class="tabs lt__tabs"><ul class="nav nav-tabs lt__nav-tabs" role="tablist">`;
    let activeListAttributes = ' class="active"'; //  aria-selected="true" << App isn't acknowledging this when you change tabs
    let activePanelAttribute = ' active';
    let widgetUniqueKey = '_' + generateRandomString();

    for (let i = 1; i <= n; i++) {
        templateTabsUI += `<li role="tab"${activeListAttributes}><a data-tab-target="[data-tab-id='${i}${widgetUniqueKey}']" data-toggle="tab" href="#">Tab ${i}</a></li>`;
        if (i === 1) {
            activeListAttributes = '';
        }
    }

    templateTabsUI += `</ul><div class="tab-content lt__tab-content">`;

    for (let j = 1; j <= n; j++) {
        templateTabsUI += `<div class="tab-pane lt__tab-pane${activePanelAttribute}" data-tab-id="${j}${widgetUniqueKey}">Tab ${j} content</div>`;
        if (j === 1) {
            activePanelAttribute = '';
        }
    }

    templateTabsUI += `</div></div>`;

    return templateTabsUI;
}

/**
 * Injects the necessary CSS to the header
 * @since 2.1.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity language text direction styles */
/* Used to style content tabs added by via rich-text editor */
:root {
    --customer-bg-blue: #e6f1ff;
    --bg-grey: #f0f0f0;
    --input-border: #898989;
}

.lt__contenttabs .lt__nav-tabs li {
    border: 1px solid #d9d9d9;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-right: 6px;
    background-color: var(--bg-grey);
    border-bottom: 1px solid #eee;
}

.lt__contenttabs .lt__nav-tabs li.active {
    border-bottom: none;
    background: #fff;
}

.lt__contenttabs .lt__nav-tabs li a {
    text-decoration: none;
    font-weight: bold;
    color: inherit;
}

.lt__contenttabs .lrn .lt__nav-tabs > li:after,
.lt__contenttabs .lrn .lt__nav-tabs .nav-tab:after {
    background: none;
}

.lt__tabs .nav {
    display: flex;
    flex-wrap: wrap;
}

.lt__contenttabs .lt__tab-content {
    border: 1px solid #d9d9d9;
    padding: 15px;
}

.lt__contenttabs .lrn .lt__nav-tabs {
    box-shadow: none;
}

`;

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
