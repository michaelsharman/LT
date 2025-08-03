/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds the ability for authors to add non-default language content
 * by surrounding text with the `lang` attribute. Essential for
 * screen readers. Also adds the ability for authors to add `translate="no"`
 * around content. This is useful for content that should not be
 * translated by Google translate or other translation services
 * such as Learnosity Author Aide.
 *
 * To remove an inline attribute, highlight the text and use the clear
 * formatting button in the toolbar.
 *
 * To remove a block attribute, choose "Remove Style" from the right-click menu.
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
 *                                 "func": "LT.extensions.languageTextDirection.addLanguageAttribute",
 *                                 "icon": "https://raw.githubusercontent.com/michaelsharman/LT/refs/heads/main/src/authoring/extensions/ui/languageTextDirection/assets/icon_language.svg",
 *                                 "label": "Set language",
 *                                 "name": "addLanguageAttribute"
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
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/languageTextDirection/screenshot.png" alt="" width="660"></p>
 * @module Extensions/Authoring/languageTextDirection
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
 * LT.extensions.languageTextDirection.run();
 * @since 2.0.0
 */
export function run() {
    state.renderedCss || injectCSS();
}

/**
 * Called via a custom button in the rich text toolbar.
 * Renders a modal asking the author to set inline or
 * block. Then inserts a `<span>` element for inline
 * or a `<div>` element for block with a translate attribute.
 * @since 2.0.0
 * @param {*} attribute
 * @param {*} callback
 */
export function addLanguageAttribute(attribute, callback) {
    /* global LRNCKEDITOR */
    const codes = getLanguageCodes();
    const selectedRichText = LRNCKEDITOR.currentInstance.getSelectedHtml().getHtml();
    const allContents = LRNCKEDITOR.currentInstance.getData();
    const template = getModalTemplate(selectedRichText);

    document.querySelector('.learnosity-question-editor').insertAdjacentHTML('beforeend', template);

    const elLangSelect = document.getElementById('lrn__ltd_language');
    const elNoTranslate = document.getElementById('lrn__ltd_notranslate');

    // Populate the language select dropdown
    for (let i = 0; i < codes.length; i++) {
        let elOption;

        if (i === 0) {
            elOption = document.createElement('option');
            elOption.value = '';
            elOption.text = '--';
            elLangSelect.add(elOption);
        }

        elOption = document.createElement('option');
        elOption.value = codes[i].code;
        elOption.text = codes[i].language;
        elOption.setAttribute('data-dir', codes[i].direction);
        elLangSelect.add(elOption);
    }

    // Set up click events for closing the modal
    const elClose = [];
    elClose.push(document.querySelector('#ltLanguageModal .lrn-qe-btn-default'));
    elClose.push(document.querySelector('#ltLanguageModal .lrn-qe-modal-btn-close'));
    for (let i = 0; i < elClose.length; i++) {
        elClose[i].addEventListener('click', () => {
            callback(selectedRichText);
            document.getElementById('ltLanguageModal').remove();
        });
    }

    // Set up click events for the primary button
    const elAdd = document.querySelector('#ltLanguageModal .lrn-qe-btn-primary');
    elAdd.addEventListener('click', () => {
        const typeElement = getLinebreakType(selectedRichText);
        const o = {};

        document.getElementById('ltLanguageModal').remove();

        if (elLangSelect.selectedIndex > 0) {
            o.direction = elLangSelect.options[elLangSelect.selectedIndex].getAttribute('data-dir');
            o.code = elLangSelect.options[elLangSelect.selectedIndex].value;
        }

        if (elNoTranslate.checked) {
            o.noTranslate = true;
        }

        const content = getReturnTemplate(o, typeElement, selectedRichText, allContents);
        return callback(content);
    });
}

/**
 * Template string to render the modal window.
 * @since 2.0.0
 * @param {string} text
 * @returns {string}
 * @ignore
 */
function getModalTemplate() {
    const template = `
    <div class="lrn-qe lrn-qe-modal lt__languageModal" style="display: block;" id="ltLanguageModal">
        <div class="lrn-qe-ui">
            <div class="lrn-qe-modal-dialog">
                <div class="lrn-qe-modal-dialog-inner">
                    <div class="lrn-qe-modal-header">
                        <div class="lrn-qe-form-label lrn-qe-h4 lrn-qe-section-header">
                            <h4 class="lrn-qe-heading">Language support</h4>
                        </div>
                        <button type="button" class="lrn-qe-btn lrn-qe-modal-btn-close" aria-label="Close" tabindex="0">
                            <span class="lrn-qe-sr-only">Close</span>
                            <span aria-role="presentation" class="lrn-qe-i-cross"></span>
                        </button>
                    </div>
                    <div data-lrn-qe-selector="modal-outlet">
                        <div class="lrn-qe-modal-content" data-lrn-qe-modal-section="content">
                            <div class="lrn-qe-form-group-wrapper">
                                <div class="lrn-qe-form-group">
                                    <p><label class="lrn-qe-label lrn-qe-form-label" for="lrn__ltd_language">Choose language</label></p>
                                    <p>Specify the language for different parts of your content to enable accurate reading by screen
                                    readers and other accessibility tools.</p>
                                    <div class="lrn-qe-custom-select">
                                        <select name="lrn__ltd_language" id="lrn__ltd_language" class="lrn__combobox lrn-qe-select lrn-qe-form-control"></select>
                                    </div>
                                </div>
                                <div class="lrn-qe-form-group lrn-qe-padding-sm lt__border lrn-qe-margin-top-md">
                                    <p><input id="lrn__ltd_notranslate" type="checkbox" class="lrn-qe-input">
                                    <label class="lrn-qe-label lrn-qe-form-label lrn-qe-padding-left-xs" for="lrn__ltd_notranslate">Disable translation</label></p>
                                    <p>Adding this flag will turn off translation, preventing Google Translate and
                                    Author Aide from translating selected text.</p>
                                </div>
                            </div>
                            <p class="lrn-qe-padding-top-sm"><label class="lrn-qe-label lrn-qe-form-label">Removing these settings</label></p>
                            <ul>
                                <li>For words or sentences, highlight the text and use the clear formatting button in the toolbar.</li>
                                <li>For entire paragraph(s), right click anywhere in the text and choose "Remove Style" from the menu.</li>
                            </ul>
                        </div>
                        <div class="lrn-qe-modal-footer">
                            <ul class="lrn-qe-ul">
                                <li class="lrn-qe-li lrn-qe-modal-footer-item lrn-qe-float-left">
                                    <button type="button" class="lrn-qe-btn lrn-qe-btn-default"><span>Cancel</span></button>
                                </li>&nbsp;
                                <li class="lrn-qe-li lrn-qe-modal-footer-item">
                                    <button type="button" class="lrn-qe-btn lrn-qe-btn-primary" data-lrn-qe-modal-action="confirm"><span>Apply</span></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    return template;
}

/**
 * Generates the element to be injected into the RTE.
 * @since 2.21.0
 * @param {object} o
 * @param {string} el
 * @param {string} content
 * @returns {string}
 * @ignore
 */
function getReturnTemplate(o, el, content, allContents) {
    let attr = '',
        template = '';

    if (o?.code) {
        attr += ` lang="${o.code}" dir="${o.direction}"`;
    }

    if (o?.noTranslate) {
        attr += ' translate="no"';
    }

    if (el === 'block') {
        const numParagraphs = numParagraphsInString(content);
        switch (numParagraphs) {
            // Selecting a single line strips the surrounding <p></p>.
            // We add an empty <p> so that we can add the correct
            // attributes to the <p> element.
            case 0:
                template = `<p${attr}>${content}</p><p>&nbsp;</p>`;
                break;
            case 1:
                // Single paragraph, add attributes
                template = content.replace('<p', `<p${attr}`);
                break;
            default:
                // 2+ paragraphs, surround with a <div>
                template = `<div${attr}>${content}</div>`;
                break;
        }
    } else {
        const cleanedContent = allContents.replace(/&nbsp;/g, '');
        if (cleanedContent.includes(`<p>${content.replace(/&nbsp;/g, '')}</p>`)) {
            template = `<div${attr}><p>${content}</p></div>`;
        } else if (content.length) {
            template = `<span${attr}>${content}</span>`;
        }
    }

    return template;
}

/**
 * Returns HTML language codes and direction.
 * @since 2.0.0
 * @returns {array}
 * @ignore
 */
function getLanguageCodes() {
    return [
        {
            language: 'Afrikaans',
            code: 'af',
            direction: 'ltr',
        },
        {
            language: 'Albanian',
            code: 'sq',
            direction: 'ltr',
        },
        {
            language: 'Amharic',
            code: 'am',
            direction: 'ltr',
        },
        {
            language: 'Arabic',
            code: 'ar',
            direction: 'rtl',
        },
        {
            language: 'Armenian',
            code: 'hy',
            direction: 'ltr',
        },
        {
            language: 'Azerbaijani',
            code: 'az',
            direction: 'ltr',
        },
        {
            language: 'Basque',
            code: 'eu',
            direction: 'ltr',
        },
        {
            language: 'Belarusian',
            code: 'be',
            direction: 'ltr',
        },
        {
            language: 'Bengali',
            code: 'bn',
            direction: 'ltr',
        },
        {
            language: 'Bosnian',
            code: 'bs',
            direction: 'ltr',
        },
        {
            language: 'Bulgarian',
            code: 'bg',
            direction: 'ltr',
        },
        {
            language: 'Catalan',
            code: 'ca',
            direction: 'ltr',
        },
        {
            language: 'Cebuano',
            code: 'ceb',
            direction: 'ltr',
        },
        {
            language: 'Chichewa',
            code: 'ny',
            direction: 'ltr',
        },
        {
            language: 'Chinese (Simplified)',
            code: 'zh-Hans',
            direction: 'ltr',
        },
        {
            language: 'Chinese (Traditional)',
            code: 'zh-Hant',
            direction: 'ltr',
        },
        {
            language: 'Corsican',
            code: 'co',
            direction: 'ltr',
        },
        {
            language: 'Haitian Creole',
            code: 'ht',
            direction: 'ltr',
        },
        {
            language: 'Croatian',
            code: 'hr',
            direction: 'ltr',
        },
        {
            language: 'Czech',
            code: 'cs',
            direction: 'ltr',
        },
        {
            language: 'Danish',
            code: 'da',
            direction: 'ltr',
        },
        {
            language: 'Dutch',
            code: 'nl',
            direction: 'ltr',
        },
        {
            language: 'English',
            code: 'en',
            direction: 'ltr',
        },
        {
            language: 'Esperanto',
            code: 'eo',
            direction: 'ltr',
        },
        {
            language: 'Estonian',
            code: 'et',
            direction: 'ltr',
        },
        {
            language: 'Finnish',
            code: 'fi',
            direction: 'ltr',
        },
        {
            language: 'French',
            code: 'fr',
            direction: 'ltr',
        },
        {
            language: 'Frisian',
            code: 'fy',
            direction: 'ltr',
        },
        {
            language: 'Galician',
            code: 'gl',
            direction: 'ltr',
        },
        {
            language: 'Georgian',
            code: 'ka',
            direction: 'ltr',
        },
        {
            language: 'German',
            code: 'de',
            direction: 'ltr',
        },
        {
            language: 'Greek',
            code: 'el',
            direction: 'ltr',
        },
        {
            language: 'Gujarati',
            code: 'gu',
            direction: 'ltr',
        },
        {
            language: 'Hausa',
            code: 'ha',
            direction: 'ltr',
        },
        {
            language: 'Hawaiian',
            code: 'haw',
            direction: 'ltr',
        },
        {
            language: 'Hebrew',
            code: 'he',
            direction: 'rtl',
        },
        {
            language: 'Hindi',
            code: 'hi',
            direction: 'ltr',
        },
        {
            language: 'Hmong',
            code: 'hmn',
            direction: 'ltr',
        },
        {
            language: 'Hungarian',
            code: 'hu',
            direction: 'ltr',
        },
        {
            language: 'Icelandic',
            code: 'is',
            direction: 'ltr',
        },
        {
            language: 'Igbo',
            code: 'ig',
            direction: 'ltr',
        },
        {
            language: 'Indonesian',
            code: 'id',
            direction: 'ltr',
        },
        {
            language: 'Irish',
            code: 'ga',
            direction: 'ltr',
        },
        {
            language: 'Italian',
            code: 'it',
            direction: 'ltr',
        },
        {
            language: 'Japanese',
            code: 'ja',
            direction: 'ltr',
        },
        {
            language: 'Javanese',
            code: 'jv',
            direction: 'ltr',
        },
        {
            language: 'Kannada',
            code: 'kn',
            direction: 'ltr',
        },
        {
            language: 'Kazakh',
            code: 'kk',
            direction: 'ltr',
        },
        {
            language: 'Khmer',
            code: 'km',
            direction: 'ltr',
        },
        {
            language: 'Kinyarwanda',
            code: 'rw',
            direction: 'ltr',
        },
        {
            language: 'Korean',
            code: 'ko',
            direction: 'ltr',
        },
        {
            language: 'Kurdish (Kurmanji)',
            code: 'ku',
            direction: 'ltr',
        },
        {
            language: 'Kyrgyz',
            code: 'ky',
            direction: 'ltr',
        },
        {
            language: 'Lao',
            code: 'lo',
            direction: 'ltr',
        },
        {
            language: 'Latin',
            code: 'la',
            direction: 'ltr',
        },
        {
            language: 'Latvian',
            code: 'lv',
            direction: 'ltr',
        },
        {
            language: 'Lithuanian',
            code: 'lt',
            direction: 'ltr',
        },
        {
            language: 'Luxembourgish',
            code: 'lb',
            direction: 'ltr',
        },
        {
            language: 'Macedonian',
            code: 'mk',
            direction: 'ltr',
        },
        {
            language: 'Malagasy',
            code: 'mg',
            direction: 'ltr',
        },
        {
            language: 'Malay',
            code: 'ms',
            direction: 'ltr',
        },
        {
            language: 'Malayalam',
            code: 'ml',
            direction: 'ltr',
        },
        {
            language: 'Maltese',
            code: 'mt',
            direction: 'ltr',
        },
        {
            language: 'Maori',
            code: 'mi',
            direction: 'ltr',
        },
        {
            language: 'Marathi',
            code: 'mr',
            direction: 'ltr',
        },
        {
            language: 'Mongolian',
            code: 'mn',
            direction: 'ltr',
        },
        {
            language: 'Myanmar (Burmese)',
            code: 'my',
            direction: 'ltr',
        },
        {
            language: 'Nepali',
            code: 'ne',
            direction: 'ltr',
        },
        {
            language: 'Norwegian',
            code: 'no',
            direction: 'ltr',
        },
        {
            language: 'Odia',
            code: 'or',
            direction: 'ltr',
        },
        {
            language: 'Pashto',
            code: 'ps',
            direction: 'rtl',
        },
        {
            language: 'Persian',
            code: 'fa',
            direction: 'rtl',
        },
        {
            language: 'Polish',
            code: 'pl',
            direction: 'ltr',
        },
        {
            language: 'Portuguese',
            code: 'pt',
            direction: 'ltr',
        },
        {
            language: 'Punjabi',
            code: 'pa',
            direction: 'ltr',
        },
        {
            language: 'Romanian',
            code: 'ro',
            direction: 'ltr',
        },
        {
            language: 'Russian',
            code: 'ru',
            direction: 'ltr',
        },
        {
            language: 'Samoan',
            code: 'sm',
            direction: 'ltr',
        },
        {
            language: 'Scots Gaelic',
            code: 'gd',
            direction: 'ltr',
        },
        {
            language: 'Serbian Cyrilic',
            code: 'sr-Cyrl',
            direction: 'ltr',
        },
        {
            language: 'Sesotho',
            code: 'st',
            direction: 'ltr',
        },
        {
            language: 'Shona',
            code: 'sn',
            direction: 'ltr',
        },
        {
            language: 'Sindhi',
            code: 'sd',
            direction: 'rtl',
        },
        {
            language: 'Sinhala',
            code: 'si',
            direction: 'ltr',
        },
        {
            language: 'Slovak',
            code: 'sk',
            direction: 'ltr',
        },
        {
            language: 'Slovenian',
            code: 'sl',
            direction: 'ltr',
        },
        {
            language: 'Somali',
            code: 'so',
            direction: 'ltr',
        },
        {
            language: 'Spanish',
            code: 'es',
            direction: 'ltr',
        },
        {
            language: 'Sundanese',
            code: 'su',
            direction: 'ltr',
        },
        {
            language: 'Swahili',
            code: 'sw',
            direction: 'ltr',
        },
        {
            language: 'Swedish',
            code: 'sv',
            direction: 'ltr',
        },
        {
            language: 'Filipino (Tagalog)',
            code: 'tl',
            direction: 'ltr',
        },
        {
            language: 'Tajik',
            code: 'tg',
            direction: 'ltr',
        },
        {
            language: 'Tamil',
            code: 'ta',
            direction: 'ltr',
        },
        {
            language: 'Tatar',
            code: 'tt',
            direction: 'ltr',
        },
        {
            language: 'Telugu',
            code: 'te',
            direction: 'ltr',
        },
        {
            language: 'Thai',
            code: 'th',
            direction: 'ltr',
        },
        {
            language: 'Turkish',
            code: 'tr',
            direction: 'ltr',
        },
        {
            language: 'Turkmen',
            code: 'tk',
            direction: 'ltr',
        },
        {
            language: 'Ukrainian',
            code: 'uk',
            direction: 'ltr',
        },
        {
            language: 'Urdu',
            code: 'ur',
            direction: 'rtl',
        },
        {
            language: 'Uyghur',
            code: 'ug',
            direction: 'rtl',
        },
        {
            language: 'Uzbek',
            code: 'uz',
            direction: 'ltr',
        },
        {
            language: 'Vietnamese',
            code: 'vi',
            direction: 'ltr',
        },
        {
            language: 'Welsh',
            code: 'cy',
            direction: 'ltr',
        },
        {
            language: 'Xhosa',
            code: 'xh',
            direction: 'ltr',
        },
        {
            language: 'Yiddish',
            code: 'yi',
            direction: 'rtl',
        },
        {
            language: 'Yoruba',
            code: 'yo',
            direction: 'ltr',
        },
        {
            language: 'Zulu',
            code: 'zu',
            direction: 'ltr',
        },
    ];
}

/**
 * Utility method that looks for <p></p> elements inside a string.
 * @since 2.0.0
 * @param {string} text Content to search for paragraph elements
 * @returns {number}
 * @ignore
 */
function numParagraphsInString(text) {
    const regex = /<p>.*?<\/p>/gs;
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

/**
 * Returns whether the selected text is a single line or multiple lines.
 * From there, we can determine whether to wrap the content in a <span>
 * or <div> element.
 * @param {string} text
 * @returns {string}
 * @ignore
 */
function getLinebreakType(text) {
    return numParagraphsInString(text) <= 1 ? 'inline' : 'block';
}

/**
 * Injects the necessary CSS to the header
 * @since 2.0.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity language and no translation styles */
/* Used to see elements inside the rich-text editor that have language or translate styles applied */
.lrn.lrn-author .lt__languageModal {
    h4 {
        font-size: 1.43em;
    }

    label {
        font-weight: bold;
    }

    input[type="checkbox"] {
        height: 16px;
        width: 16px;
        vertical-align: text-bottom;
        margin: 0;
    }

    .lt__border {
        border: 1px solid #eaeaea;
    }
}

.lrn-qe-form-group-wrapper {
    .lrn-qe-form-control-ckeditor *[translate],
    .lrn-qe-form-control-ckeditor *[lang] {
        border: 2px dashed #696969;
        padding: 5px;
        position: relative;
    }

    .lrn-qe .lrn-qe-ui div[translate],
    .lrn-qe .lrn-qe-ui div[lang] {
        margin-bottom: 1em;

        p:last-child {
            margin-bottom: 0;
        }
    }

    .lrn-qe-form-control-ckeditor *[translate]::after,
    .lrn-qe-form-control-ckeditor *[lang]::after {
        content: "No translate";
        position: absolute;
        left: 100px;
        top: 0;
        transform: translateX(-50%);
        background-color: #333;
        color: #fff;
        padding: 5px;
        border-radius: 4px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s;
        z-index: 10000000;
    }

    .lrn-qe-form-control-ckeditor *[lang]::after {
        content: "Language";
    }

    .lrn-qe-form-control-ckeditor *[translate][lang]::after {
        content: "No translate and Language";
    }

    /* Show tooltip on hover */
    .lrn-qe-form-control-ckeditor *[translate]:hover::after,
    .lrn-qe-form-control-ckeditor *[lang]:hover::after {
        opacity: 1;
        visibility: visible;
    }

    /* Force the icon to be the right size */
    .lrn-qe-ckeditor-toolbar .cke_button__addlanguageattribute .cke_button__addlanguageattribute_icon {
        background-position: -3px !important;
        background-size: 22px !important;
    }

    /* Size the "content" textarea and make is resizable */
    .lrn-qe .lrn-qe-modal-content .lrn-qe-form-group-wrapper textarea#lrn__ltd_content {
        resize: vertical;
        min-height: 4em;
    }
}
`;

    elStyle.setAttribute('data-style', 'LT Language Text Direction');
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
