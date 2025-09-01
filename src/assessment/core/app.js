import { handleEvent, extensionsListener } from './diagnostics.js';
import { questionResponseIds } from './questions.js';

/**
 * Learnosity Toolkit app module.
 * @module Assessment/App
 */

const state = {};

/**
 * Constructor method for Learnosity Toolkit.
 * @since 3.0.0
 * @ignore
 * @param {object} app - Items API app instance
 */
export function setup(app) {
    state.app = app;
    setupListeners();
}

/**
 * Returns the Items API app instance that the host page declared.
 * @since 0.1.0
 * @returns {object}
 */
export function itemsApp() {
    return state.app;
}

/**
 * The Annotations API app instance, or `null` if not loaded.
 * @since 0.1.0
 * @returns {object | null}
 */
export function annotationsApp() {
    return itemsApp().annotationsApp() !== undefined ? itemsApp().annotationsApp() : null;
}

/**
 * The Assess API app instance, or `null` if not loaded.
 * @since 0.1.0
 * @returns {object | null}
 */
export function assessApp() {
    return itemsApp().assessApp();
}

/**
 * The Events API app instance, or `null` if not loaded.
 * @since 0.1.0
 * @returns {object | null}
 */
export function eventsApp() {
    return itemsApp().eventsApp();
}

/**
 * The Questions API app instance, or `null` if not loaded.
 * @since 0.1.0
 * @returns {object | null}
 */
export function questionsApp() {
    return itemsApp().questionsApp();
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

    extensionsListener();
}
