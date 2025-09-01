import { createExtension, LT } from '../../../../../utils/extensionsFactory.js';

/**
 * Adds a semi-transparent overlay on top of the entire page.
 * This is for users who have sensitivity to bright light,
 * high contrast, or blue light.
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/pageoverlay.png" alt="" width="860"></p>
 *
 * @param {object=} options Object of configuration options.
 * @param {string=} options.customColor A custom color value to use for the overlay. Recommend rgba. Defaults to rgba(250, 170, 140, 0.5)
 * @param {number=} options.customZIndex A custom z-index value to use for the overlay. Defaults to 99999.
 *
 * @example
 * const options = {
 *     customColor: 'rgba(250, 170, 140, 0.5)',
 *     customZIndex: 99999
 * }
 *
 * LT.init(itemsApp, {
 *     extensions: [
 *         { id: 'blueLightFilter', args: options }
 *     ],
 * });
 *
 * @module Extensions/Assessment/blueLightFilter
 */

const state = {
    blueLightFilter: null,
    color: 'rgba(250, 170, 140, 0.5)',
    zindex: 99999,
};

/**
 * @param {object=} config Optional config object to override defaults
 * @since 0.9.0
 * @ignore
 */
function run(config) {
    const { customColor, customZIndex } = config || {};

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
        toggle();
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
        LT.utils.logger.warn('[BlueLightFilter] visibility called before run()');
        return;
    }

    state.blueLightFilter.hidden = !state.blueLightFilter.hidden;
}

/**
 * Returns the extension CSS
 * @since 3.0.0
 * @ignore
 */
function getStyles() {
    return `
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
}

export const blueLightFilter = createExtension('blueLightFilter', run, {
    getStyles,
    show,
    hide,
    toggle,
});
