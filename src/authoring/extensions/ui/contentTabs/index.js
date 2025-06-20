import * as app from '../../../core/app.js';
import { getTabsTheme, validateOptions } from '../../../../assessment/extensions/ui/contentTabs/index.js';

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
 *                                 "icon": "https://raw.githubusercontent.com/michaelsharman/LT/refs/heads/main/src/authoring/extensions/ui/contentTabs/assets/images/icon_tabs.svg",
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
    events: {
        keydownRegistered: false,
    },
    options: {
        theme: 'default',
        maxTabs: 5,
    },
    renderedCss: false,
};

/**
 * Extension constructor.
 * @example
 * import { LT } from '@caspingus/lt/authoring';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.contentTabs.run();
 * @param {object=} options - Optional configuration object includes:
 *  - `theme` (string) Which tabs theme to load. Options are `rounded` (default) and `api-column-tabs`.
 *  - `maxTabs` (number) Maximum number of tabs that can be added. Default is 5.
 * @since 2.1.0
 */
export function run(options) {
    state.options = validateOptions(options);
    state.renderedCss || injectCSS();

    // Inject class for specificity
    const elLrnApi = document.querySelector('.lrn-author');
    elLrnApi.classList.add('lt__contenttabs');

    // Remove any previous keydown listeners once when the editor is ready
    app.appInstance().on('widgetedit:editor:ready', () => {
        document.removeEventListener('keydown', handleKeydown);
        state.events.keydownRegistered = false;
    });

    // Check for tabs every time the content has been updated
    app.appInstance().on('widgetedit:preview:changed', preventDOMBreaking);
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
    const templateNumTabs = `
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
                                    <input class="lrn-qe-input lrn-qe-form-control" type="number" id="numtabs" value="2" min="1" max="${state.options.maxTabs}" required>
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

    const elClose = [];
    elClose.push(document.querySelector('#lt__addTabs .lrn-qe-btn-default'));
    elClose.push(document.querySelector('#lt__addTabs .lrn-qe-modal-btn-close'));
    for (let i = 0; i < elClose.length; i++) {
        elClose[i].addEventListener('click', () => {
            removeElement('lt__addTabs');
            return callback('');
        });
    }

    const elAdd = document.querySelector('#lt__addTabs .lrn-qe-btn-primary');
    elAdd.addEventListener('click', () => {
        const n = document.getElementById('numtabs').value;
        removeElement('lt__addTabs');
        return callback(getTabsTemplate(n));
    });
}

/**
 * Inline editing of tabs and tab content is brittle because the user can
 * inadvertently break the HTML structure when clicking backspace.
 * This function tries to prevent inline editing of tabs by making them
 * read-only, and provides a double-click event to trigger a link dialog
 * to edit the tab label.
 * For tab content, it inserts a zero-width space character at the beginning
 * of the content to prevent the user from deleting the first character.
 * @since 2.23.2
 * @ignore
 */
function preventDOMBreaking() {
    /* TABS */
    document.querySelectorAll('.lrn-qe-col-edit-inner .lt__nav-tabs li a').forEach(a => {
        // Set the title to an empty string so the browser won't show the parent's (CKEditor) tooltip.
        a.setAttribute('title', '');
        a.setAttribute('contenteditable', 'false');
        a.addEventListener('focus', e => e.target.blur());
        a.addEventListener('dblclick', e => {
            e.preventDefault();
            const newLabel = window.prompt('Edit tab label:', a.textContent);
            if (newLabel !== null) {
                a.textContent = newLabel;
            }
        });
    });

    /* TAB CONTENT */
    const tabContent = document.querySelector('.lrn-qe-col-edit-inner .lt__tab-content');
    if (tabContent) {
        tabContent.querySelectorAll('.lrn-qe-col-edit-inner .lt__tab-pane').forEach(pane => {
            // Insert a non-editable guard at the beginning of each tab pane to safeguard against <div> deletion.
            if (!pane.querySelector('.lt__guard')) {
                const guard = document.createElement('p');
                guard.className = 'lt__guard';
                guard.setAttribute('contenteditable', 'false');
                guard.setAttribute('aria-hidden', 'true');
                guard.setAttribute('tabindex', '-1');
                guard.innerHTML = '&#8204;'; // Use a zero-width non-joiner (&#8204;) so it takes up no visible space.
                pane.insertBefore(guard, pane.firstChild);
            }
        });

        if (!state.events.keydownRegistered) {
            document.addEventListener('keydown', handleKeydown);
            state.events.keydownRegistered = true;
        }
    }
}

/**
 * Prevents the user from deleting the first character of a tab pane.
 * @since 2.23.2
 * @param {KeyboardEvent} e
 * @ignore
 */
function handleKeydown(e) {
    if (e.key === 'Backspace') {
        const hasTabs = !!getCkeEditableContainer()?.querySelector('.lt__tabs');

        if (hasTabs) {
            const tabContent = document.querySelector('.lrn-qe-col-edit-inner .lt__tab-content');
            const offset = getCaretCharOffset();
            const pane = tabContent.querySelector('.lt__tab-pane.active');

            // If caret is at the very beginning (offset 0)
            if (offset === 0) {
                const selection = window.getSelection();
                const hasSelected = !selection.isCollapsed && selection.toString().length > 0;

                if (!hasSelected) {
                    e.preventDefault(); // Prevent the backspace deletion

                    // Find the first text node in the pane.
                    const firstTextNode = pane.firstChild;

                    if (firstTextNode) {
                        const spaceNode = document.createTextNode('\u200B');
                        pane.appendChild(spaceNode); // Insert the space node immediately after the current text node.

                        const newRange = document.createRange(); // Create a new range and set the caret at the end of the inserted text node.
                        newRange.setStart(spaceNode, spaceNode.textContent.length);
                        newRange.collapse(true);

                        const sel = window.getSelection();
                        sel.removeAllRanges();
                        sel.addRange(newRange);
                    }
                }
            }
        }
    }
}

/**
 * Get the caret offset within the text node.
 * @returns {number}
 * @since 2.23.2
 * @ignore
 */
function getCaretCharOffset() {
    const sel = window.getSelection();
    if (!sel.rangeCount) {
        return 0;
    }
    const range = sel.getRangeAt(0);
    // If the start container is a text node, use it; otherwise, use its first child.
    let node = range.startContainer.nodeType === Node.TEXT_NODE ? range.startContainer : range.startContainer.firstChild;
    if (!node) {
        return 0;
    }
    let offset = range.startOffset;
    // Add the lengths of all previous siblings of the current text node.
    while (node && node.previousSibling) {
        node = node.previousSibling;
        offset += node.textContent.length;
    }
    return offset;
}

/**
 * Returns the closest `.cke_editable` container to the current selection.
 * @returns {Element|null}
 * @since 2.23.2
 * @ignore
 */
function getCkeEditableContainer() {
    const sel = window.getSelection();
    if (!sel.rangeCount) {
        return null;
    }
    let node = sel.getRangeAt(0).startContainer;
    if (node.nodeType !== Node.ELEMENT_NODE) {
        node = node.parentElement;
    }
    return node.closest('.cke_editable');
}

/**
 * Returns the template used to inject into the rich-text editor.
 * @since 2.1.0
 * @param {number} n Number of tabs to add.
 * @returns {string}
 * @ignore
 */
function getTabsTemplate(n) {
    let templateTabsUI = '<div class="tabs lt__tabs"><ul class="nav nav-tabs lt__nav-tabs" role="tablist">';
    let activeListAttributes = ' class="active"'; //  aria-selected="true" << App isn't acknowledging this when you change tabs
    let activePanelAttribute = ' active';
    const widgetUniqueKey = '_' + generateRandomString();

    for (let i = 1; i <= n; i++) {
        templateTabsUI += `<li role="presentation"${activeListAttributes} aria-controls="${i}${widgetUniqueKey}"><a role="tab" data-tab-target="[data-tab-id='${i}${widgetUniqueKey}']" data-toggle="tab" href="#">Tab ${i}</a></li>`;
        if (i === 1) {
            activeListAttributes = '';
        }
    }

    templateTabsUI += '</ul><div class="tab-content lt__tab-content">';

    for (let j = 1; j <= n; j++) {
        templateTabsUI += `<div class="tab-pane lt__tab-pane${activePanelAttribute}" data-tab-id="${j}${widgetUniqueKey}" id="${j}${widgetUniqueKey}"><p>Tab ${j} content</p></div>`;
        if (j === 1) {
            activePanelAttribute = '';
        }
    }

    templateTabsUI += '</div></div>';

    return templateTabsUI;
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
 * Injects the necessary CSS to the header
 * @since 2.1.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = getTabsTheme(state.options.theme).concat(
        '\n',
        `/* Learnosity content tab authoring styles */
        .lrn.lrn-author .lrn-author-item-content-wrapper .lrn-qe-col-edit-inner {
            .lt__tabs.nav-tabs>li>a,
            .lt__tabs.nav-tabs>li>a:focus,
            .lt__tabs.nav-tabs>li.active>a,
            .lt__tabs.nav-tabs>li.active>a:hover,
            .lt__tabs.nav-tabs>li.active>a:focus {
                cursor: pointer;
            }

            .lrn-qe-form-el-wrapper .lt__tabs.nav-tabs>li>a {
                position: relative; /* Needed so that the pseudo-element is positioned relative to the <a> */
                cursor: pointer;
            }

            .lt__tabs .lt__nav-tabs {
                overflow: visible;
                border-bottom: 1px solid transparent;

                > li > a {
                    overflow: visible;
                }
            }

            /* Tooltip text */
            .lt__nav-tabs.nav-tabs > li > a::after {
                content: "Double‑click to edit label";
                position: absolute;
                bottom: 65%;
                left: 110%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.8);
                color: #fff;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
                pointer-events: none;
                z-index: 100;
                display: block; /* Ensure block-level display */
            }

            /* Tooltip arrow */
            .lt__nav-tabs.nav-tabs > li > a::before {
                content: "";
                position: absolute;
                display: block; /* Ensure it shows up */
                bottom: calc(120% - 5px); /* Adjust so the arrow is just below the tooltip */
                left: 85%;
                bottom: calc(65% - 5px);
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid rgba(0, 0, 0, 0.8);
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
                pointer-events: none;
                z-index: 100;
            }

            /* Show tooltip on hover */
            .lt__nav-tabs.nav-tabs > li > a:hover::after,
            .lt__nav-tabs.nav-tabs > li > a:hover::before {
                opacity: 1;
                visibility: visible;
            }
        }
    `
    );

    elStyle.setAttribute('data-style', 'LT Content Tabs');
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
