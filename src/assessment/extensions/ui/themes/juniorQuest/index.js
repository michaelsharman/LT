import './sass/index.scss';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * Themes use sass files to style the UI. You will need to handle them
 * using your build tool of choice. Here is a sample webpack config:
 *
 * ```
 * module.exports = {
 *     entry: {
 *         main: './src/index.js',
 *     },
 *     output: {
 *         path: __dirname + '/dist',
 *         filename: 'bundle.js',
 *     },
 *     module: {
 *         rules: [
 *             {
 *                 test: /\.s[ac]ss$/i,
 *                 use: ['style-loader', 'css-loader', 'sass-loader'],
 *             },
 *         ],
 *     },
 * };
 * ```
 * --
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/themes/theme-juniorquest.png" alt="" width="900"></p>
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
 * @module Extensions/Assessment/themes/juniorQuest
 */

const state = {
    elements: {},
    theme: 'juniorQuest',
};

/**
 * Loads the `Junior Quest` theme for Items API (the player).
 *
 *
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/core';
 * import * as theme from '@caspingus/lt/src/assessment/extensions/ui/themes/juniorQuest/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * theme.run();
 * @since 2.13.0
 */
export function run() {
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
