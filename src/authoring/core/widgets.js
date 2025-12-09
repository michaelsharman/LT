import { authorApp } from './app.js';

/**
 * Everything relating to a widget being created/edited.
 * @module Authoring/Widgets
 */

/**
 * The `type` of widget currently being edited. Returns
 * `null` if not on the widget edit screen.
 * @since 2.4.0
 * @returns {string|null}
 */
export function type() {
    return authorApp().getWidget()?.type || null;
}
