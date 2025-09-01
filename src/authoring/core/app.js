import { handleEvent, extensionsListener } from './diagnostics.js';

/**
 * Learnosity Toolkit constructor module.
 * @module Authoring/App
 */

const state = {};

/**
 * Constructor method for Learnosity Toolkit.
 * @since 3.0.0
 * @ignore
 * @param {object} app - Author API app instance
 */
export function setup(app) {
    state.app = app;
    setupListeners();
}

/**
 * Returns the Author API app instance that the host page declared.
 * @since 2.0.0
 * @returns {object}
 */
export function authorApp() {
    return state.app;
}

/**
 * The Question Editor API app instance, or `null` if not loaded.
 * @since 2.2.0
 * @returns {object | null}
 */
export function questionEditorApp() {
    return authorApp().editorApp() !== undefined ? authorApp().editorApp() : null;
}

/**
 * Sets up listeners on all events to pass to the diagnostics module.
 * Should not be called externally.
 * @since 2.0.0
 * @ignore
 */
function setupListeners() {
    // Sends all Author API events for handling.
    state.app.on('all', handleEvent);

    const events = ['widgetedit:editor:ready', 'widgetedit:widget:ready', 'widgetedit:preview:changed', 'widgetedit:widget:changed'];

    events.forEach(event => state.app.on(event, () => handleEvent(event)));

    extensionsListener();
}
