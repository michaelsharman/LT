import { createExtension } from '../../../../../utils/extensionsFactory.js';
import styles from './styles/index.css?inline';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/themes/theme-juniorquest.png" alt="" width="900"></p>
 *
 * This script loads a custom UI theme for Items API.
 *
 * Use the following custom region configuration to load this theme:
 *
 * ```
 * {
 *     "config": {
 *         "regions": {
 *             "bottom-left": [
 *                 {
 *                     "type": "previous_button",
 *                     "show_label_option": true
 *                 }
 *             ],
 *             "bottom-right": [
 *                 {
 *                     "type": "next_button"
 *                 }
 *             ],
 *             "items": [
 *                 {
 *                     "type": "items_progress_element",
 *                     "shown": false
 *                 },
 *                 {
 *                     "type": "slider_element"
 *                 }
 *             ],
 *             "right": [
 *                 {
 *                     "type": "verticaltoc_element"
 *                 }
 *             ],
 *             "top-left": [
 *                 {
 *                     "type": "title_element"
 *                 }
 *             ]
 *         }
 *     }
 * }
 * ```
 *
 * @example
 * LT.init(itemsApp, {
 *     extensions: ['juniorQuest'],
 * });
 *
 * @module Extensions/Assessment/themes/juniorQuest
 */

const state = {
    elements: {},
    theme: 'juniorQuest',
};

/**
 * Loads the `Junior Quest` theme for Items API (the player).
 * @since 2.13.0
 * @ignore
 */
function run() {
    cacheElements();
    addThemeWrapperElement();
}

/**
 * Adds a custom element around the div with `lrn-assess` for hooks and specificity.
 * @since 2.14.0
 * @ignore
 */
function addThemeWrapperElement() {
    const elApiWrapper = state.elements.apiWrapper;
    const elWrapper = document.createElement('main');

    elWrapper.className = `lt__theme lt__theme-${state.theme}`;
    elApiWrapper.parentNode.insertBefore(elWrapper, elApiWrapper);
    elWrapper.appendChild(elApiWrapper);
}

/**
 * Caches DOM lookups for performance.
 * @since 2.14.0
 * @ignore
 */
function cacheElements() {
    state.elements.apiWrapper = document.querySelector('.lrn-assess');
}

/**
 * Returns the extension CSS
 * @since 3.0.0
 * @ignore
 */
function getStyles() {
    return styles;
}

export const juniorQuest = createExtension('juniorQuest', run, {
    getStyles,
});
