import { handleEvent } from './diagnostics.js';
import { questionResponseIds } from './questions.js';

/**
 * Learnosity Toolkit constructor module.
 * @module Assessment/App
 */

const state = {};

/**
 * Constructor method for Learnosity Toolkit.
 * @since 0.1.0
 * @param {object} app - Items API app instance
 * @example
 * // Declare and set your variable with the Items API LearnosityItems.init() method
 * const itemsApp = LearnosityItems.init(signedConfigObject);
 *
 * // Pass that app instance to the Toolkit constructor in the Items API readyListener()
 * import { LT } from '[path/to/tookit/index]';
 * LT.init(itemsApp);
 *
 * // Can be handy in the global scope for development
 * window.LT = LT;
 */
export function init(app) {
    state.app = app;
    setupListeners();
}

/**
 * Returns the Items API app instance that the host page declared.
 * @since 0.1.0
 * @returns {object}
 */
export function appInstance() {
    return state.app;
}

/**
 * The Annotations API app instance, or `null` if not loaded.
 * @since 0.1.0
 * @returns {object | null}
 */
export function annotationsApp() {
    return appInstance().annotationsApp() !== undefined ? appInstance().annotationsApp() : null;
}

/**
 * The Assess API app instance, or `null` if not loaded.
 * @since 0.1.0
 * @returns {object | null}
 */
export function assessApp() {
    return appInstance().assessApp();
}

/**
 * The Events API app instance, or `null` if not loaded.
 * @since 0.1.0
 * @returns {object | null}
 */
export function eventsApp() {
    return appInstance().eventsApp();
}

/**
 * The Questions API app instance, or `null` if not loaded.
 * @since 0.1.0
 * @returns {object | null}
 */
export function questionsApp() {
    return appInstance().questionsApp();
}

/**
 * Sets up item and question listeners to pass to the diagnostics module.
 * Should not be called externally.
 * @since 0.1.0
 * @ignore
 */
function setupListeners() {
    // Sends all Items and Assess API events for handling.
    state.app.on('all', e => {
        handleEvent(e);
    });

    // Sends Questions API events for handling.
    state.app.on('item:load', () => {
        const response_ids = questionResponseIds();

        response_ids.forEach(id => {
            const question = state.app.question(id);

            ['changed', 'beforeValidate', 'rendered', 'validated'].forEach(event => {
                question.on(event, () => handleEvent(event));
            });
        });
    });
}
