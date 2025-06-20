import { styles } from './css/bundle.js';

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
 * This script loads a custom UI theme for Items API.
 *
 * Canvas is a minimal theme based on the Canvas LMS New Quizzes look and feel.
 *
 * Items are vertically stacked with a flag button for each item. Because the assessment
 * player is still present, you can have a timed test, auto-save, and other features.
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/themes/theme-canvas.png" alt="" width="900"></p>
 *
 * Use the following custom region configuration in Items API to load this theme:
 *
 * ```
 * {
 *     "config": {
 *         "title": "Assessment title",
 *         "subtitle": "Assessment subtitle",
 *         "regions": {
 *             "items": [
 *                 {
 *                     "type": "vertical_element",
 *                     "vertical_stretch_option": false,
 *                     "scrollable_option": false
 *                 }
 *             ],
 *             "top-left": [
 *                 {
 *                     "type": "title_element"
 *                 }
 *             ],
 *             "bottom-right": [
 *                 {
 *                     "type": "submit_button"
 *                 }
 *             ]
 *         },
 *         "configuration": {
 *             "question_indexing": true,
 *             "accessibility": {
 *                 "headings": {
 *                     "question": false
 *                 }
 *             }
 *         }
 *     }
 * }
 * ```
 *
 * @module Extensions/Assessment/themes/canvas
 */

const state = {
    elements: {},
    theme: 'nextGen',
};

/**
 * Loads the `nextGen` theme for Items API (the player).
 *
 *
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/core';
 * import * as theme from '@caspingus/lt/src/assessment/extensions/ui/themes/nextGen/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * theme.run();
 * @since 2.27.0
 */
export function run() {
    injectCSS(styles);
    cacheElements();
    addThemeWrapperElement();
}

/**
 * Adds a custom element around the div with `lrn-assess` for hooks and specificity.
 * @since 2.27.0
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
 * @since 2.27.0
 * @ignore
 */
function cacheElements() {
    state.elements.apiWrapper = document.querySelector('.lrn-assess');
}

function injectCSS(styles) {
    const style = document.createElement('style');
    style.setAttribute('data-lt-style', 'true');
    style.textContent = styles;
    document.head.appendChild(style);
}
