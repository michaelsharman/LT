import './sass/index.scss';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * This script loads a custom UI theme for Items API.
 * @module Extensions/Assessment/themes/juniorQuest
 */

const state = {
    theme: 'juniorQuest',
};

/**
 * Loads the `Sydney` theme for Items API (the player).
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/core';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.themes.sydney.run();
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
