import * as ssmlEditor from '@caspingus/ssml-editor/src/index.js';

/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds an SSML editor which can be launched from a custom
 * Question Editor button in the toolbar.
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
 *                              {
 *                                  "func": "LT.extensions.ssmlEditor.launchSsmlEditor",
 *                                  "icon": "https://raw.githubusercontent.com/michaelsharman/LT/refs/heads/main/src/authoring/extensions/ui/ssmlEditor/assets/images/icon_tts.svg",
 *                                  "label": "Add SSML",
 *                                  "name": "addSsml",
 *                                  "attributes": ["content","stimulus","template","options"]
 *                              }
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
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/ssmleditor.png" alt="" width="660"></p>
 * @module Extensions/Authoring/ssmlEditor
 */

const state = {
    renderedCss: false,
};

/**
 * Extension constructor.
 * @example
 * import { LT } from '@caspingus/lt/authoring';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.ssmlEditor.run();
 * @since 2.8.0
 */
export function run() {
    state.renderedCss || injectCSS();
}

/**
 * Called via a custom button in the rich text toolbar.
 * Renders a modal with an SSML editor.
 * @param {string} attribute Which Question Editor attribute is being edited
 * @param {*} callback Called to return to the parent rich-text editor
 * @since 2.8.0
 */
export function launchSsmlEditor(attribute, callback) {
    const currentSelectedText = window.getSelection().toString();
    const rangeSelectedHTML = window.getSelection().getRangeAt(0);
    const container = document.createElement('div');
    container.appendChild(rangeSelectedHTML.cloneContents());
    const currentSelectedHTML = container.innerHTML;
    const templateSsmlEditor = `
        <div class="lrn-qe lrn-qe-modal" style="display: block;" id="lt__ssmlModalWrapper">
            <div class="lrn-qe-ui">
                <div class="lrn-qe-modal-dialog">
                    <div class="lrn-qe-modal-dialog-inner">
                        <div class="lrn-qe-modal-header">
                            <div class="lrn-qe-form-label lrn-qe-h4 lrn-qe-section-header">
                                <h4 class="lrn-qe-heading"><label class="lrn-qe-label lrn-qe-form-label-name">Enter SSML</label></h4>
                            </div>
                            <button type="button" class="lrn-qe-btn lrn-qe-modal-btn-close" aria-label="Close" tabindex="0">
                                <span class="lrn-qe-sr-only">Close</span>
                                <span aria-role="presentation" class="lrn-qe-i-cross"></span>
                            </button>
                        </div>
                        <div data-lrn-qe-selector="modal-outlet">
                            <div class="lrn-qe-modal-content" data-lrn-qe-modal-section="content">
                                <div id="editor"></div>
                                <div id="ssmlStatus"></div>
                            </div>
                            <div class="lrn-qe-modal-footer">
                                <ul class="lrn-qe-ul">
                                    <li class="lrn-qe-li lrn-qe-modal-footer-item">
                                        <button type="button" class="lrn-qe-btn lrn-qe-btn-default"><span>Cancel</span></button>
                                    </li>&nbsp;
                                    <li class="lrn-qe-li lrn-qe-modal-footer-item">
                                        <button type="button" class="lrn-qe-btn lrn-qe-btn-primary lt__ssml-add" data-lrn-qe-modal-action="confirm"><span>Add SSML</span></button>
                                    </li>&nbsp;
                                    <li class="lrn-qe-li lrn-qe-modal-footer-item">
                                        <button type="button" class="lrn-qe-btn lrn-qe-btn-primary lt__ssml-generate-audio"><span>⭐ Generate audio</span></button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

    document.querySelector('.learnosity-question-editor').insertAdjacentHTML('beforeEnd', templateSsmlEditor);

    const elClose = [];
    elClose.push(document.querySelector('#lt__ssmlModalWrapper .lrn-qe-btn-default'));
    elClose.push(document.querySelector('#lt__ssmlModalWrapper .lrn-qe-modal-btn-close'));
    for (let i = 0; i < elClose.length; i++) {
        elClose[i].addEventListener('click', () => {
            removeElement('lt__ssmlModalWrapper');
            delete window.quill;
            return callback(currentSelectedHTML);
        });
    }

    const elAdd = document.querySelector('#lt__ssmlModalWrapper .lt__ssml-add');
    elAdd.addEventListener('click', () => {
        removeElement('lt__ssmlModalWrapper');
        const ssml = window.quill.getText();
        delete window.quill;
        return callback(`<span>${ssml}</span>`);
    });

    if (!window.hasOwnProperty('quill')) {
        const quill = ssmlEditor.run('editor');
        if (currentSelectedText) {
            const cursorLocation = quill.getSelection();
            quill.insertText(cursorLocation.index, currentSelectedText);
        }
        window.quill = quill;
        window.ssmlEditor = ssmlEditor;
    }
}

/**
 * Removes an element from the DOM
 * @param {string} id Id of the element to remove from the DOM
 * @since 2.8.0
 * @ignore
 */
function removeElement(id) {
    document.getElementById(id).remove();
}

/**
 * Injects the necessary CSS to the header
 * @since 2.8.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity SSML TTS styles */
#lt__ssmlModalWrapper .lrn-qe-modal-content {
    height: 23em;
}
#lt__ssmlModalWrapper .ql-editor {
    height: 12rem;
}
#lt__ssmlModalWrapper .ql-editor p {
    margin: 0;
}
#lt__ssmlModalWrapper .ql-toolbar.ql-snow .ql-formats {
    margin-right: 14px;
}
.hidden {
    display: none;
}
#lt__ssmlModalWrapper .material-symbols-outlined {
    font-size: 1.3rem;
    position: relative;
    top: -2px;
}
#lt__ssmlModalWrapper .ql-picker {
    padding: 3px 0;
}
#lt__ssmlModalWrapper .ql-picker-label {
    width: 45px;
    height: 18px;
}
#ssmlStatus .material-symbols-outlined {
    vertical-align: middle;
}
.ssmlStatusValid {
    padding: 1em;
    background-color: #cbf5d3;
}
.ssmlStatusInvalid {
    padding: 1em;
    background-color: #ffb9b9;
}
speak s {
    text-decoration: none;
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
