import * as app from '../../../core/app.js';
import * as activity from '../../../core/activity.js';
import { createModule } from '../../../../utils/moduleFactory.js';

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
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.blockGrammarChecks.run();
 * @since 0.3.0
 */
function run() {
    const appInstance = app.appInstance();
    const annotationsApp = app.annotationsApp();

    // Set up a listener on item load for any Plain Text or Essay question types
    appInstance.on('item:load', setupGrammarBlocker);

    if (activity.hasAnnotations()) {
        // Define annotation-related events
        const annotationEvents = ['notepad:toggleVisibility', 'stickynote:add'];

        // Attach listeners for annotation events
        annotationEvents.forEach(event => annotationsApp.on(event, setupGrammarBlocker));
    }
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
    const elementClassnames = ['lrn_texteditor_editable'];
    // Parent Items API element
    const $elLearnosityNode = document.getElementById('learnosity_assess');

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

export const blockGrammarChecks = createModule('blockGrammarChecks', run);
