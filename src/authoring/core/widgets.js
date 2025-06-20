import * as app from './app.js';

/**
 * Everything relating to a widget being created/edited.
 * @module Authoring/Widgets
 */

/**
 * The `type` of widget currently being edited. Returns
 * `undefined` if not on the widget edit screen.
 * @since 2.4.0
 * @returns {string | undefined}
 */
export function type() {
    return app.appInstance().getWidget()?.type;
}
