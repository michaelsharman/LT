import logger from '../../../../../utils/logger';
import { createModule } from '../../../../../utils/moduleFactory.js';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds a semi-transparent overlay on top of the entire page.
 * This is for users who have sensitivity to bright light,
 * high contrast, or blue light.
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/pageoverlay.png" alt="" width="860"></p>
 * @module Extensions/Assessment/blueLightFilter
 */

const state = {
    blueLightFilter: null,
    color: 'rgba(250, 170, 140, 0.5)',
    renderedCss: false,
    zindex: 99999,
};

/**
 * @example
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.blueLightFilter.run();
 * @param {string=} customColor A custom color value to use for the overlay. Recommend rgba. Defaults to rgba(250, 170, 140, 0.5)
 * @param {number=} customZIndex A custom z-index value to use for the overlay. Defaults to 99999.
 * @since 0.9.0
 */
function run(customColor, customZIndex) {
    state.renderedCss || (injectCSS(), (state.renderedCss = true));

    if (customColor && typeof customColor === 'string') {
        state.color = customColor;
    }
    if (customZIndex && typeof customZIndex === 'number') {
        state.zindex = customZIndex;
    }

    let elOverlay = document.getElementById('lt__blue-light-filter');

    if (!elOverlay) {
        elOverlay = document.createElement('div');
        elOverlay.id = 'lt__blue-light-filter';
        elOverlay.hidden = true;
        elOverlay.classList.add('lt__blue-light-filter');
        const elPlayer = document.querySelector('.lrn-assess');
        elPlayer.appendChild(elOverlay);
    }

    state.blueLightFilter = elOverlay;
}

/**
 * Shows the blue light filter if it is currently hidden.
 * If the filter is already visible, it does nothing.
 * @since 3.0.0
 * @returns {void}
 */
function show() {
    if (state.blueLightFilter?.hidden) {
        toggle(); // handles adding class
    }
}

/**
 * Hides the blue light filter if it is currently visible.
 * If the filter is already hidden, it does nothing.
 * @since 3.0.0
 * @returns {void}
 */
function hide() {
    if (!state.blueLightFilter?.hidden) {
        toggle(); // handles removing class
    }
}

/**
 * Shows or hides the blue light filter.
 * Returns true if the blue light filter is currently visible, false otherwise.
 * @since 3.0.0
 * @returns {boolean}
 */
function toggle() {
    if (!state.blueLightFilter) {
        logger.warn('[BlueLightFilter] visibility called before run()');
        return;
    }

    state.blueLightFilter.hidden = !state.blueLightFilter.hidden;
}

/**
 * Injects the necessary CSS to the header
 * @since 0.9.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity blue light filter styles */
.lt__blue-light-filter {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${state.color};
    z-index: ${state.zindex};
    pointer-events: none;
}
`;

    elStyle.setAttribute('data-style', 'LT Blue Light Filter');
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}

export const blueLightFilter = createModule('blueLightFilter', run, {
    show,
    hide,
    toggle,
});
