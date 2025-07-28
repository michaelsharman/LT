import styles from './styles/index.css?inline';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
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
    renderedCss: false,
    theme: 'juniorQuest',
};

/**
 * Loads the `Junior Quest` theme for Items API (the player).
 *
 * @example
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.themes.juniorQuest.run();
 * @since 2.13.0
 */
export function run() {
    state.renderedCss || injectCSS();

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
 * Injects the necessary CSS to the header
 * @since 3.0.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = styles;

    elStyle.setAttribute('data-style', 'LT Theme Junior Quest');
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
