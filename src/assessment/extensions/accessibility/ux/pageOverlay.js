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
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/pageoverlay.png" alt="" width="860"></p>
 * @module Extensions/Assessment/pageOverlay
 */

const state = {
    color: 'rgba(250, 170, 140, 0.5)',
    renderedCss: false,
    zindex: 99999,
};

/**
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.pageOverlay.run();
 * @param {string=} customColor A custom color value to use for the overlay. Recommend rgba. Defaults to rgba(250, 170, 140, 0.5)
 * @param {number=} customZIndex A custom z-index value to use for the overlay. Defaults to 99999.
 * @since 0.9.0
 */
export function run(customColor, customZIndex) {
    if (customColor && typeof customColor === 'string') {
        state.color = customColor;
    }
    if (customZIndex && typeof customZIndex === 'number') {
        state.zindex = customZIndex;
    }

    const elOverlayExists = document.querySelector('.lrn__overlay');

    if (!elOverlayExists) {
        const elOverlay = document.createElement('div');

        elOverlay.classList.add('lrn__overlay');
        document.querySelector('body').append(elOverlay);
    }

    state.renderedCss || injectCSS();
}

/**
 * Turns off the page overlay.
 * @since 0.9.0
 */
export function halt() {
    const elOverlay = document.querySelector('.lrn__overlay');
    if (elOverlay) {
        elOverlay.remove();
    }
}

/**
 * Injects the necessary CSS to the header
 * @since 0.9.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity page overlay styles */
.lrn__overlay {
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

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
