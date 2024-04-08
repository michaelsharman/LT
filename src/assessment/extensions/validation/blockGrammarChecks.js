import * as app from '../../core/app';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * This script blocks the Grammarly plugin and
 * browser spellcheck, autocorrect, autocapitalize
 * and autocomplete for:
 *  - Plain text and Essay question types
 *  - Annotations API notepad and sticky notes
 * @module Extensions/Assessment/blockGrammarChecks
 */

/**
 * Looks for relevent question types and annotations
 * to add grammar blocking attributes to.
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.blockGrammarChecks.run();
 * @since 0.3.0
 */
export function run() {
    // Set up a listener on item load for any Plain Text or Essay question types
    app.appInstance().on('item:load', function (el) {
        setupGrammarBlocker();
    });

    // Set up a listener for the Annotations API notepad
    app.annotationsApp().on('notepad:toggleVisibility', function (ev) {
        setupGrammarBlocker();
    });

    // Set up a listener for any Annotations API sticky notes
    app.annotationsApp().on('stickynote:add', function (ev) {
        setupGrammarBlocker();
    });
}

/**
 * Add HTML element attributes (to certain editable fields)
 * that will block the Grammarly extension and prevent browser
 * spellchecking/autocorrect/autocapitalize/autocomplete
 * from working.
 * @since 0.3.0
 * @ignore
 */
function setupGrammarBlocker() {
    let $els = [];
    let $elTextareas = [];
    // CSS classname added to Learnosity plain text and essay question types
    let elementClassnames = ['lrn_texteditor_editable'];
    // Parent Items API element
    let $elLearnosityNode = document.getElementById('learnosity_assess');

    // Look for found plain text or essay question types
    for (let i = 0; i < elementClassnames.length; i++) {
        $els = $elLearnosityNode.getElementsByClassName(elementClassnames[i]);
        if ($els.length) {
            for (let j = 0; j < $els.length; j++) {
                addBlockingAttributes($els[j]);
            }
        }
    }

    // Look for any textareas inside the Learnosity Items API
    $elTextareas = $elLearnosityNode.getElementsByTagName('textarea');
    for (let l = 0; l < $elTextareas.length; l++) {
        addBlockingAttributes($elTextareas[l]);
    }
}

/**
 * Add custom (grammar blocking) attributes to the passed
 * HTML DOM element.
 * @param {object} $el HTML element to add attributes to.
 * @since 0.3.0
 * @ignore
 */
function addBlockingAttributes($el) {
    $el.setAttribute('data-gramm', 'false');
    $el.setAttribute('data-gramm_editor', 'false');
    $el.setAttribute('data-enable-grammarly', 'false');
    $el.setAttribute('spellcheck', 'false');
    $el.setAttribute('autocorrect', 'false');
    $el.setAttribute('autocomplete', 'false');
    $el.setAttribute('autocapitalize', 'false');
}
