import logger from '../../../../../utils/logger';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Renders a reading mask that helps users focus on specific parts of the content.
 * The reading mask is a semi-transparent overlay that highlights the area around the mouse cursor,
 * allowing users to read text more easily without distractions.
 * It can be toggled on and off, and it updates its position based on mouse movements
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/readingMask/mask.png" alt="Reading Mask feature" width="900"></p>
 * @module Extensions/Assessment/readingMask
 */

const state = {
    mouse: { x: 0, y: 0 },
    mouseTrackingInitialised: false,
    readingMask: null,
    renderedCss: false,
};

/**
 * Initializes the reading mask extension.
 *
 * @example
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.readingMask.run();
 * @since 3.0.0
 */
export function run() {
    state.renderedCss || injectCSS();

    if (!state.readingMask) {
        createReadingMask();
    }

    if (!state.mouseTrackingInitialised) {
        document.addEventListener(
            'mousemove',
            e => {
                state.mouse.x = e.clientX;
                state.mouse.y = e.clientY;

                if (!state.readingMask?.hidden) {
                    updateMask(e.clientY);
                }
            },
            { passive: true }
        );

        state.mouseTrackingInitialised = true;
    }
}

/**
 * Creates the reading mask element and appends it to the body.
 * This is called once when the extension is run.
 * @since 3.0.0
 * @ignore
 */
function createReadingMask() {
    const readingMask = document.createElement('div');

    readingMask.id = 'lt__reading-mask';
    readingMask.classList.add('lt__reading-mask');
    readingMask.hidden = true; // Off (hidden) by default

    document.body.appendChild(readingMask);

    state.readingMask = readingMask;
}

/**
 * Moves the reading mask to the specified Y coordinate.
 * This function updates the mask's position based on the mouse Y coordinate.
 * It creates a linear gradient mask that covers the top and bottom of the viewport,
 * with a transparent band around the mouse position.
 * @param {*} y
 * @since 3.0.0
 * @ignore
 */
function updateMask(y) {
    if (!state.readingMask) {
        return;
    }

    const top = Math.max(0, y - 80);
    const bottom = y + 80;

    const maskStyle = `
            linear-gradient(
                to bottom,
                black 0,
                black ${top}px,
                transparent ${top}px,
                transparent ${bottom}px,
                black ${bottom}px,
                black 100%
            )
        `;

    state.readingMask.style.maskImage = maskStyle;
    state.readingMask.style.webkitMaskImage = maskStyle;
}

/**
 * Shows or hides the reading mask.
 * @returns {boolean} - Returns true if the reading mask is currently visible, false otherwise.
 * @since 3.0.0
 */
export function toggle() {
    if (!state.readingMask) {
        logger.warn('[ReadingMask] toggle() called before run()');
        return;
    }

    const willBeVisible = state.readingMask.hidden;
    state.readingMask.hidden = !willBeVisible;

    if (willBeVisible) {
        state.readingMask.classList.add('has-mask');
        updateMask(state.mouse.y); // Apply mask immediately
    } else {
        state.readingMask.classList.remove('has-mask');
    }

    return willBeVisible;
}

/**
 * Shows the reading mask if it is currently hidden.
 * If the mask is already visible, it does nothing.
 * @since 3.0.0
 * @returns {void}
 */
export function show() {
    if (state.readingMask?.hidden) {
        toggle(); // handles adding class
    }
}

/**
 * Hides the reading mask if it is currently visible.
 * If the mask is already hidden, it does nothing.
 * @since 3.0.0
 * @returns {void}
 */
export function hide() {
    if (!state.readingMask?.hidden) {
        toggle(); // handles removing class
    }
}

/**
 * Injects the necessary CSS to the header
 * @since 3.0.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity reading mask styles */
.lt__reading-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none; /* Let mouse events pass through */
    z-index: 9999;
    mask-image: linear-gradient(to bottom, black 0, black 100px, transparent 100px, transparent 300px, black 300px, black 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 0, black 100px, transparent 100px, transparent 300px, black 300px, black 100%);
    background: rgba(0, 0, 0, 0.6);

    .has-mask {
        mask-image: linear-gradient(to bottom, black 0, black 100px, transparent 100px, transparent 300px, black 300px, black 100%);
        -webkit-mask-image: linear-gradient(to bottom, black 0, black 100px, transparent 100px, transparent 300px, black 300px, black 100%);
    }
}
`;

    elStyle.setAttribute('data-style', 'LT Reading Mask');
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
