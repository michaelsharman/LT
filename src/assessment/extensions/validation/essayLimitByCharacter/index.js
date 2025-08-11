import { appInstance, assessApp } from '../../../core/app.js';
import logger from '../../../../utils/logger.js';
import { activity, isResuming, region } from '../../../core/activity.js';
import { dialog, hideDialog, isResponsiveMode } from '../../../core/player.js';
import { isLastItem, itemByResponseId } from '../../../core/items.js';
import { questionInstance } from '../../../core/questions.js';
import { decodeHTML } from 'entities';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * This script changes the essay validation check on
 * string length to be character based, instead of
 * the default word based.
 *
 * It ignores spaces by default, so they are not
 * treated as characters to validate length.
 *
 * Works with `longtextV2` and `plaintext` question types.
 * @module Extensions/Assessment/essayLimitByCharacter
 */

const state = {
    includeSpaces: false,
    renderedCss: false,
    validTypes: ['longtextV2', 'plaintext'],
};

/**
 * Looks for relevent question types and overrides validation
 * to be on character length. Uses the `max_length` (Word limit)
 * that was set up in authoring, treating the value as a character
 * length instead of word length.
 *
 * **Known limitations**
 *
 * If the assessment player is in responsive mode (< 800px) and
 * you *don't* have the review screen enabled (which it is by default)
 * then we can't inject a custom button. This means we render the
 * default Finish button, and no prevent submission will occur.
 * The solution is to use any of the valid regions (`main`,
 * `horizontal`, or `horizontal-fixed`) and don't decouple the
 * submit button from the review button in Items API configuration.
 *
 * Essentially, if you're using default options, you'll be fine.
 *
 * If submitting via the JavaScript `submit()` method, this will
 * skip the validation check.
 *
 * **Preventing submission**
 *
 * By default, questions are authored to prevent the user from
 * submitting their session in the event of word limit violations.
 * The same behaviour is inherited in this extension. If you don't
 * want to prevent submission, you can check the `Submit over limit`
 * option in the question authoring area.
 *
 * To prevent submission, we need to add a custom button to Items
 * API becuase we can't easily inject a validation check when the
 * default submit button is clicked, so we need to replace it with
 * a custom one.
 *
 * Adding a custom button is a capability in Items API. Below is a code
 * snippet of an Items API configuration object. Note the custom button
 * is added in `region_overrides`.
 *
 * You MUST use the `icon_class` and `name` as defined in the custom
 * button `options` object below.
 *
 * **`main` region**
 * ```
 * {
 *     "config": {
 *         "regions": "main",
 *         "region_overrides": {
 *             "bottom-right": [
 *                 {
 *                     "type": "custom_button",
 *                     "options": {
 *                         "name": "btn-essay-character-limit-submit",
 *                         "label": "Finish",
 *                         "icon_class": "item-next hidden"
 *                     },
 *                     "position": "right"
 *                 },
 *                 {
 *                     "type": "next_button",
 *                     "position": "right"
 *                 },
 *                 {
 *                     "type": "previous_button",
 *                     "position": "right"
 *                 }
 *             ]
 *         }
 *     }
 * }
 * ```
 *
 * **`horizontal` or `horizontal-fixed` regions**
 * ```
 * {
 *     "config": {
 *         "regions": "horizontal",
 *         "region_overrides": {
 *             "bottom": [
 *                 {
 *                     "type": "custom_button",
 *                     "options": {
 *                         "name": "btn-essay-character-limit-submit",
 *                         "label": "Finish",
 *                         "icon_class": "item-next hidden"
 *                     },
 *                     "position": "right"
 *                 },
 *                 {
 *                     "type": "next_button",
 *                     "position": "right"
 *                 },
 *                 {
 *                     "type": "horizontaltoc_element",
 *                     "position": "right"
 *                 },
 *                 {
 *                     "type": "previous_button",
 *                     "position": "right"
 *                 }
 *             ]
 *         }
 *     }
 * }
 * ```
 *
 * **Changing labels**
 *
 * This extension will automatically change `Word Limit` to `Character Limit` in the
 * footer of the essay question types. However, for full coverage in review mode, or
 * in authoring and reporting, you should use label bundles. Eg:
 *
 * **Assessment label bundle**
 *
 * Use this in Items and Reports APIs.
 *
 * Caveat: this will update Math Essay and Chemistry Essay footers as well.
 * ```
 * {
 *     "config": {
 *         "questions_api_init_options": {
 *             "labelBundle": {
 *                 "wordLength": "Character Limit"
 *             }
 *         }
 *     }
 * }
 * ```
 *
 * **Authoring label bundle**
 *
 * Use this in Author API.
 * ```
 * {
 *     "config": {
 *         "dependencies": {
 *             "question_editor_api": {
 *                 "init_options": {
 *                     "label_bundle": {
 *                         "help.longtextV2.name:max_length": "Character limit",
 *                         "help.longtextV2.name:show_word_limit": "Character limit",
 *                         "help.longtextV2.description:max_length": "Maximum number of characters that can be entered in the text entry area (max 10,000 characters).",
 *                         "help.longtextV2.description:show_word_limit": "Defines whether the character limit should be displayed in the toolbar or not. The options are: <ul><li><strong>Always On</strong> - Character Limit is always displayed.</li><li><strong>On Limit</strong> - Character Limit will only be displayed when the limit is reached.</li><li><strong>Off</strong> - Character Limit will not be displayed.</li></ul>",
 *                         "help.longtextV2.description:submit_over_limit": "Determines if the user can save/submit text when the character limit has been exceeded.",
 *                         "longtextV2:max_length": "Character limit",
 *                         "longtextV2:show_word_count": "Show character count",
 *                         "longtextV2:show_word_limit": "Character limit",
 *                         "help.plaintext.name:max_length": "Character limit",
 *                         "help.plaintext.name:show_word_limit": "Character limit",
 *                         "help.plaintext.description:max_length": "Maximum number of characters that can be entered in the text entry area (max 10,000 characters).",
 *                         "help.plaintext.description:show_word_limit": "Defines whether the character limit should be displayed in the toolbar or not. The options are: <ul><li><strong>Always On</strong> - Character Limit is always displayed.</li><li><strong>On Limit</strong> - Character Limit will only be displayed when the limit is reached.</li><li><strong>Off</strong> - Character Limit will not be displayed.</li></ul>",
 * 	                    "plaintext:max_length": "Character limit",
 *                         "plaintext:show_word_limit": "Character limit"
 *                     }
 *                 }
 *             },
 *             "questions_api": {
 *                 "init_options": {
 *                     "labelBundle": {
 *                         "wordLength": "Character Limit"
 *                     }
 *                 }
 *             }
 *         }
 *     }
 * }
 * ```
 *
 * @example
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.essayLimitByCharacter.run();
 * @param {boolean} includeSpaces Whether to include spaces in the character count
 * Default is `false`.
 * @since 0.10.0
 */
export function run(includeSpaces = false) {
    state.includeSpaces = Boolean(includeSpaces);

    state.renderedCss || (injectCSS(), (state.renderedCss = true));

    setQuestionListeners();

    // Set up a listener on item load to check Finish button state
    appInstance().on('item:load', () => {
        setSubmitButtonState();
    });

    const elCustomSubmit = document.querySelector('.custom_btn.item-next');
    if (elCustomSubmit) {
        elCustomSubmit.classList.add('lrn_btn_blue');
        setupSubmitPrevention();
    } else {
        logger.warn('No custom submit button found. Character length validation will occur, but no submission prevention.');
    }
}

/**
 * Checks resume mode, on load of the API to see whether we have
 * existing responses to load an accurate character count for.
 * Also sets a change listener on all valid types to check limit.
 * @since 1.3.0
 * @ignore
 */
function setQuestionListeners() {
    const itemQuestions = Object.values(appInstance().getQuestions());

    itemQuestions
        .filter(question => state.validTypes.includes(question.type))
        .forEach(question => {
            const questionInstance = appInstance().question(question.response_id);

            questionInstance.on('rendered', () => {
                setupEssayValidationUI(questionInstance);

                // Check on load for existing responses
                if (isResuming()) {
                    checkLimit(questionInstance);
                }
            });

            questionInstance.on('changed', () => checkLimit(questionInstance));
        });
}

/**
 * Checks the user response to see if they are
 * over the validation limit.
 * @param {object} questionInstance
 * @param {boolean} setUI Whether to add UI validation.
 * @returns {boolean}
 * @since 0.10.0
 * @ignore
 */
function checkLimit(questionInstance, setUI = true) {
    const type = questionInstance.getQuestion().type;
    const maxLength = questionInstance.getQuestion().max_length;
    const rawResponse = questionInstance.getResponse()?.value ? questionInstance.getResponse()?.value : '';
    let validLength = true;
    let response;
    let strLength;

    if (type === 'plaintext') {
        response = state.includeSpaces ? rawResponse : stripSpaces(rawResponse);
        strLength = response.length;
    } else {
        response = state.includeSpaces ? stripHtml(rawResponse) : stripSpaces(stripHtml(rawResponse));
        strLength = decodeHTML(response).length;
    }

    if (maxLength) {
        if (strLength > maxLength) {
            validLength = false;
        }
    }

    if (setUI) {
        setValidationUI(questionInstance, validLength, strLength);
    }

    return validLength;
}

/**
 * Updates the character count in the UI and, if
 * necessary, sets validation classes.
 * @param {object} questionInstance
 * @param {boolean} isValid
 * @param {number} strLength
 * @since 0.10.0
 * @ignore
 */
function setValidationUI(questionInstance, isValid, strLength) {
    const id = questionInstance.getQuestion().response_id;
    const elContainer = document.getElementById(id);
    const elEditor = elContainer.querySelector('.lrn_texteditor_editable');
    const elWordCount = elContainer.querySelector('.lrn_word_count');
    const elLengthIndicator = elContainer.querySelector('.lrn_length_indicator');
    const warningClassIndicator = 'lrn_wordcount_warning_label';
    const warningClassEditor = 'lrn_wordcount_warning';
    let characterCount = String(strLength);

    if (questionInstance.getQuestion().type === 'plaintext') {
        characterCount = strLength + ' /';
        setTimeout(() => {
            setUI();
        }, 10);
    } else {
        setUI();
    }

    function setUI() {
        elWordCount.textContent = characterCount;
        if (!isValid) {
            elEditor.classList.add(warningClassEditor);
            elLengthIndicator.classList.add(warningClassIndicator);
        } else {
            elEditor.classList.remove(warningClassEditor);
            elLengthIndicator.classList.remove(warningClassIndicator);
        }
    }
}

/**
 * Replaces `Word` with `Character` in the default UI if a
 * label bundle hasn't been set in Items API config.
 * @param {object} questionInstance
 * @since 0.10.0
 * @ignore
 */
function setupEssayValidationUI(questionInstance) {
    const hasLabelBundle = activity()?.config?.questions_api_init_options?.labelBundle?.wordLength;

    if (!hasLabelBundle) {
        const id = questionInstance.getQuestion().response_id;
        const elContainer = document.getElementById(id);
        const elWordLimit = elContainer.querySelector('.lrn_word_limit');
        const wordLimitText = elWordLimit.textContent;
        const newWordLimitText = wordLimitText.replace('Word', 'Character');

        elWordLimit.textContent = newWordLimitText;
    }
}

/**
 * Sets up click events on the possible submit buttons, then
 * calls checkValidResponses() when clicked.
 * Possible submit buttons are "Finish" inside the review screen,
 * or the custom button declared in Items API configuration.
 * @since 1.1.0
 * @ignore
 */
function setupSubmitPrevention() {
    const elCustomSubmit = document.querySelector('.custom_btn.item-next');

    if (elCustomSubmit) {
        elCustomSubmit.addEventListener('click', checkValidResponses);

        appInstance().on('test:panel:shown', () => {
            const elReviewSubmit = document.querySelector('.panel-footer .test-submit');
            if (elReviewSubmit) {
                elReviewSubmit.addEventListener('click', checkValidResponses);
            }
        });
    }
}

/**
 * Checks any essays on the session and their character length.
 * If the length on any is invalid, and the `submit_over_limit`
 * flag isn't set, we prevent submission.
 * Works when the custom submit button is clicked, or when we
 * override the "Finish" button in the review screen. We only
 * do the latter when a custom submit button also exists.
 * @param {object} e Click event object.
 * @since 1.1.0
 * @ignore
 */
function checkValidResponses(e) {
    const sessionQuestions = appInstance().getQuestions();
    const invalidResponseIds = [];

    for (const q in sessionQuestions) {
        if (state.validTypes.includes(sessionQuestions[q].type)) {
            if (!sessionQuestions[q]?.submit_over_limit && !checkLimit(questionInstance(q), false)) {
                invalidResponseIds.push(q);
            }
        }
    }

    if (invalidResponseIds.length) {
        logger.warn('Invalid essay response length found.');
        e.preventDefault();
        e.stopPropagation();

        const itemReferences = [];
        for (let i = 0; i < invalidResponseIds.length; i++) {
            const temp = itemByResponseId(invalidResponseIds[i]);
            if (temp) {
                itemReferences.push(temp.source.reference);
            }
        }

        loadErrorDialog(itemReferences);
    } else {
        submit();
    }
}

/**
 * Handles showing/hiding the default "Finish" button with a
 * custom button as declared in Items API configuration. We
 * need to do this because we can't preventDefault on the default
 * submit (Finish) button.
 * Executes on every item:load event.
 * @since 1.1.0
 * @ignore
 */
function setSubmitButtonState() {
    const elDefaultSubmit = document.querySelector('.test-submit.item-next');
    const elCustomSubmit = document.querySelector('.custom_btn.item-next');

    if (elCustomSubmit && !isResponsiveMode()) {
        if (!isLastItem()) {
            elCustomSubmit.classList.add('hidden');
        } else {
            if (hasReviewScreenOnFinish() && region()) {
                elCustomSubmit.classList.add('hidden');
            } else {
                elDefaultSubmit.classList.add('hidden');
                elCustomSubmit.classList.remove('hidden');
            }
        }
    }
}

/**
 * Checks to see if the session was set up with a review
 * screen as the last step prior to submission. We need
 * to know this because in that scenario, there is a "Review"
 * button ono the last item instead of "Finish".
 * @returns {boolean}
 * @since 1.1.0
 * @ignore
 */
function hasReviewScreenOnFinish() {
    const hasReviewElement = document.querySelector('.review-screen');
    const isDecoupled = activity()?.config?.configuration?.decouple_submit_from_review;

    if (!hasReviewElement || isDecoupled) {
        return false;
    }

    return true;
}

/**
 * Loads a custom Items API dialog to alert the user they
 * have invalid response. This is the same as the default
 * modal we have for word count violations.
 * We check for labels from the Items API config object
 * first, otherwise we use the default (english) labels.
 * @param {array} itemReferences
 * @since 1.1.0
 * @ignore
 */
function loadErrorDialog(itemReferences) {
    const labels = {
        question: activity()?.config?.labelBundle?.question || 'Question',
        submitTest: activity()?.config?.labelBundle?.submitTest || 'Submit activity',
        decline: activity()?.config?.labelBundle?.decline || 'Cancel',
        invalidQuestionsMessage:
            activity()?.config?.labelBundle?.invalidQuestionsMessage || 'The following questions are not currently valid. Please follow the links to review',
    };
    let template = `
        <p>${labels.invalidQuestionsMessage}</p>
        <ul>
    `;

    for (let i = 0; i < itemReferences.length; i++) {
        template += `<li class="link essay-limit-character-item" data-item-reference="${itemReferences[i]}">${labels.question}</li>`;
    }

    template += '</ul>';

    assessApp().on('button:btn_essay_character_limit_cancel:clicked', () => {
        hideDialog();
    });

    appInstance().on('test:panel:show', () => {
        setTimeout(() => {
            const elLinks = document.querySelectorAll('.essay-limit-character-item');
            if (elLinks) {
                elLinks.forEach(el => {
                    const itemReference = el.getAttribute('data-item-reference');
                    el.addEventListener('click', () => {
                        appInstance().items().goto(itemReference);
                        hideDialog();
                    });
                });
            }
        }, 500);
    });

    dialog({
        header: labels.submitTest,
        body: template,
        buttons: [
            {
                button_id: 'btn_essay_character_limit_cancel',
                label: labels.decline,
                is_primary: true,
            },
        ],
    });
}

/**
 * Because we are using a custom submit button, we need
 * to submit manually when the button is clicked. However,
 * we do this by sending a click through the (hidden)
 * default submit button. This way we get the player behaviour
 * for submission that isn't available using the submit() method.
 * If for some reason there is no default submit button, we
 * submit using the method, with no default checks.
 * @since 1.1.0
 * @ignore
 */
function submit() {
    const elDefaultSubmit = document.getElementById('lrn_assess_next_btn');

    if (elDefaultSubmit) {
        elDefaultSubmit.click();
    } else {
        const settings = {
            show_submit_confirmation: true,
            show_submit_ui: true,

            success: response_ids => {
                logger.info('Submit was successful', response_ids);
            },

            error: event => {
                logger.error('Submit has failed', event);
            },
        };

        appInstance().submit(settings);
    }
}

/**
 * Strips HTML from a string.
 * @param {string} s
 * @returns {string}
 * @since 0.10.0
 * @ignore
 */
function stripHtml(s) {
    return s.replace(/<[^>]*>/g, '').trim();
}

/**
 * Strips spaces from a string.
 * @param {string} s
 * @returns {string}
 * @since 0.10.0
 * @ignore
 */
function stripSpaces(s) {
    return s.replace(/\s+/g, '');
}

/**
 * Injects the necessary CSS to the header
 * @since 0.10.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity essay limit by character styles */
.lrn_widget .lrn_word_count,
.lrn_widget .lrn_character_count {
    margin-right: 0px;
}
`;

    elStyle.setAttribute('data-style', 'LT Essay Limit By Character');
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
