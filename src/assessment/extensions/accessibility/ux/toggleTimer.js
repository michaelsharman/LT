import * as app from '../../../core/app';
import * as activity from '../../../core/activity';
import logger from '../../../../utils/logger';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Allows the end-user to toggle visibility of the timer,
 * leaving the clock icon only. This can reduce test anxiety.
 *
 * Note: this does not work on the smallest (mobile) breakpoint
 * because that is a separate layout that doesn't include the
 * clock icon. It's a future TODO to rectify this extension
 * in the narrowest layout.
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/toggletimer.gif" alt="Animated gif showing the toggle timer feature" width="900"></p>
 * @module Extensions/Assessment/toggleTimer
 */

const state = {
    forceRenderTimer: false,
    renderedCss: false,
};

/**
 * Wraps clock and timer elements inside a button. Adds a
 * click event to toggle the timer.
 *
 * By passing `showTimerLimit`, you can force render the timer
 * in the final moments. Will force render one time only, if
 * the user hides the timer again we don't force render.
 *
 * @param {number} showTimerLimit The clock value to force render the timer element.
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.toggleTimer.run();
 * @since 2.6.0
 */
export function run(showTimerLimit = 60) {
    const elLrnResponsiveWrapper = document.querySelector('.lrn-sm');
    const elTimerWrapper = document.querySelector('.lrn-timer-wrapper');

    if (elLrnResponsiveWrapper && elTimerWrapper) {
        if (!state.renderedCss) injectCSS();

        const childElements = Array.from(elTimerWrapper.children);
        const elTimerButton = document.createElement('button');

        elTimerButton.classList.add('lrn_btn', 'lt__timer-button');
        elTimerButton.setAttribute('type', 'button');
        elTimerButton.setAttribute('aria-label', `${elTimerWrapper.getAttribute('aria-label')}, click to toggle visibility of the timer.`);

        elTimerWrapper.innerHTML = '';
        elTimerWrapper.appendChild(elTimerButton);
        childElements.forEach(child => {
            elTimerButton.appendChild(child);
        });

        elTimerButton.addEventListener('click', () => {
            toggleTimer(elTimerWrapper);
        });

        app.appInstance().on('time:change', () => {
            const timeRemaining = activity.timeRemaining();
            if (
                !state.forceRenderTimer &&
                typeof timeRemaining === 'number' &&
                timeRemaining <= Number(showTimerLimit) &&
                elTimerWrapper.classList.contains('lt__timer-hide')
            ) {
                state.forceRenderTimer = true;
                elTimerWrapper.classList.remove('lt__timer-hide');
                logger.info(`Force show the timer limit (${showTimerLimit}) reached.`);
            }
        });
    }
}

/**
 * Adds a classname to toggle visibility of the timer.
 * @param {object} elTimerWrapper DOM element of timer.
 * @since 2.6.0
 * @ignore
 */
function toggleTimer(elTimerWrapper) {
    elTimerWrapper.classList.toggle('lt__timer-hide');
}

/**
 * Injects the necessary CSS to the header
 * @since 2.6.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity toggle timer styles */
.lrn.lrn-assess .lrn-region:not(.lrn-items-region) .lrn_btn.lt__timer-button {
    font-size: inherit;
}

.lrn-assess .lrn_btn.lt__timer-button .timer {
    padding: 8px;
    height: 29px;
    position: relative;
    top: -4px;
}

.lrn.lrn-assess .lt__timer-wrapper.lt__timer-hide .lrn_btn.lt__timer-button .timer .clock:before {
    padding-right: 0;
}

.lrn-timer-wrapper.lt__timer-hide .lt__timer-button .timer > *:not(.clock) {
    display: none;
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
