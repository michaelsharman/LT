import './sass/index.scss';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
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
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/themes/theme-juniorquest.png" alt="" width="900"></p>
 * @module Extensions/Assessment/themes/juniorQuest
 */

const state = {
    theme: 'juniorQuest',
};

/**
 * Loads the `Junior Quest` theme for Items API (the player).
 *
 *
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/core';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.themes.juniorQuest.run();
 * @since 2.13.0
 */
export function run() {
    addThemeWrapperClass();
}

/**
 * Adds a classname to the div with `lrn-assess` for specificity.
 * @since 2.13.0
 * @ignore
 */
function addThemeWrapperClass() {
    const elApiWrapper = document.querySelector('.lrn-assess');

    if (elApiWrapper) {
        elApiWrapper.classList.add('lt__theme', `lt__theme-${state.theme}`);
    }
}
