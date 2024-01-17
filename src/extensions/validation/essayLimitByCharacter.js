import * as app from '../../app';

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
 * It ignores spaces, so they are not treated as characters
 * to validate length.
 *
 * Works with longtextV2 and plaintext types.
 * @module _Extensions/essayLimitByCharacter
 */

const state = {
    includeSpaces: false,
    renderedCss: false,
    validTypes: ['longtextV2', 'plaintext'],
};

/**
 * Looks for relevent question types and overrides validation
 * to be on character length.
 * @example
 * import { LT } from '@caspingus/lt/src/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.essayLimitByCharacter.run();
 * @param {boolean} includeSpaces Whether to include spaces in the character count
 * @since 0.10.0
 */
export function run(includeSpaces = false) {
    if (!state.renderedCss) injectCSS();

    state.includeSpaces = Boolean(includeSpaces);

    // Set up a listener on item load for any Plain Text or Essay question types
    app.appInstance().on('item:load', function (el) {
        const questions = LT.questions();

        questions.forEach(q => {
            if (state.validTypes.indexOf(q.type) >= 0) {
                let questionInstance = app.appInstance().question(q.response_id);

                setupEssayValidationUI(questionInstance);

                questionInstance.on('changed', () => {
                    checkLimit(questionInstance);
                });
            }
        });
    });
}

/**
 * Checks the user response to see if they are
 * over the validation limit.
 * @param {object} questionInstance
 * @since 0.10.0
 * @ignore
 */
function checkLimit(questionInstance) {
    const maxLength = questionInstance.getQuestion().max_length;
    const rawResponse = questionInstance.getResponse().value;
    const response = state.includeSpaces ? stripHtml(rawResponse) : stripSpaces(stripHtml(rawResponse));
    const strLength = response.length;
    let validLength = true;

    if (maxLength) {
        if (strLength > maxLength) {
            validLength = false;
        }
    }

    setValidationUI(questionInstance, validLength, strLength);
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
    let characterCount = strLength;

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
 * Replaces `Word` with `Character` in the default UI.
 * @param {object} questionInstance
 * @since 0.10.0
 * @ignore
 */
function setupEssayValidationUI(questionInstance) {
    const id = questionInstance.getQuestion().response_id;
    const elContainer = document.getElementById(id);
    const elWordLimit = elContainer.querySelector('.lrn_word_limit');
    const wordLimitText = elWordLimit.textContent;
    const newWordLimitText = wordLimitText.replace('Word', 'Character');

    elWordLimit.textContent = newWordLimitText;
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

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
