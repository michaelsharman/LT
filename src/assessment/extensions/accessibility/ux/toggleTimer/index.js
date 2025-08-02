import { appInstance } from '../../../../core/app.js';
import { maxTime, timeRemaining } from '../../../../core/activity.js';
import logger from '../../../../../utils/logger.js';

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
    _initialised: false,
    elTimerWrapper: null,
    enableForceTimerShow: false,
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
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.toggleTimer.run();
 * @since 2.6.0
 */
export function run(showTimerLimit = 60) {
    if (!state._initialised) {
        const elLrnResponsiveWrapper = document.querySelector('.lrn-sm');
        state.elTimerWrapper = document.querySelector('.lrn-timer-wrapper');

        if (!state.elTimerWrapper) {
            logger.warn('Timer wrapper not found, cannot run toggle timer extension');
            return;
        }

        state.elTimer = state.elTimerWrapper.querySelector('.timer');
        state.elClock = state.elTimerWrapper.querySelector('.clock');

        if (elLrnResponsiveWrapper && state.elTimerWrapper) {
            state.renderedCss || injectCSS();
            state._initialised = true;

            const timerDisplay = state.elTimerWrapper.querySelector('.timer');

            // Inject accessibility and interactivity
            state.elTimerWrapper.classList.add('lt__timer-wrapper', 'lrn_btn');
            state.elTimerWrapper.setAttribute('role', 'button');
            state.elTimerWrapper.setAttribute('tabindex', '0');
            state.elTimerWrapper.setAttribute('aria-pressed', 'true');
            state.elTimerWrapper.setAttribute('aria-label', 'Assessment time. Timer is visible. Click to hide it.');

            /*
             * Removing this logic for now as it's creating a callstack
             * exceeded issue.
             */
            if (state.enableForceTimerShow && maxTime() > 0) {
                appInstance().on('time:change', () => {
                    const secondsRemaining = timeRemaining();

                    if (
                        !state.forceRenderTimer &&
                        typeof secondsRemaining === 'number' &&
                        secondsRemaining <= Number(showTimerLimit) &&
                        timerDisplay.classList.contains('hidden')
                    ) {
                        state.forceRenderTimer = true;
                        toggle();
                        logger.info(`Force show the timer limit (${showTimerLimit}) reached.`);
                    }
                });
            }

            state.elTimerWrapper.addEventListener('click', toggle);
            state.elTimerWrapper.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle();
                }
            });
        } else {
            logger.warn('Timer wrapper, or `lrn-sm`, not found');
        }
    } else {
        logger.debug('Toggle timer already initialised, ignoring run();');
    }
}

/**
 * Toggles the timer visibility. Assumes run() has been called.
 * @since 2.6.0
 */
export function toggle() {
    if (!state.elTimerWrapper) {
        return;
    }

    const isVisible = !state.elTimer.classList.contains('hidden');

    if (isVisible) {
        state.elTimer.classList.add('hidden');
        const elClock = state.elTimerWrapper.querySelector('.clock');
        const elClockCopy = elClock.cloneNode(true);
        elClockCopy.classList.add('clock-copy');
        elClockCopy.classList.remove('clock');
        state.elTimerWrapper.appendChild(elClockCopy);
    } else {
        const elClockCopy = state.elTimerWrapper.querySelector('.clock-copy');
        if (elClockCopy) {
            elClockCopy.remove();
        }
        state.elTimer.classList.remove('hidden');
    }

    updateAccessibilityState(!isVisible);
}

function updateAccessibilityState(isVisible) {
    state.elTimerWrapper.setAttribute('aria-pressed', String(isVisible));
    state.elTimerWrapper.setAttribute(
        'aria-label',
        `Assessment time. Timer is ${isVisible ? 'visible' : 'hidden'}. Click to ${isVisible ? 'hide' : 'show'} it.`
    );
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
.lrn-timer-wrapper.lt__timer-wrapper {
    position: relative;
    border-radius: 2px;
    cursor: pointer;
    background-color: #eaeaea;
    color: #333;
    border: 1px solid #d9d9d9;

    &:hover {
        background-color: #d9d9d9;
        color: #333;
    }

    &:focus {
        box-shadow: none;
        border: 1px solid #1877b1;
    }

    &:active {
        box-shadow: none;
    }

    .clock-copy {
        display: inline-block;
        vertical-align: top;
        max-width: 100%;
        padding: .68em .9em;

        &:before {
            font-family: "LearnosityIconsRegular";
            top: 1px;
            position: relative;
            float: left;
            padding-left: .4em;
            padding-right: .4em;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            content: "";
        }
    }
}

.lrn.lrn-assess .lrn-region:not(.lrn-items-region) .lrn_btn.lt__timer-wrapper {
    font-size: inherit;
    padding: 0.01em;
}
`;

    elStyle.setAttribute('data-style', 'LT Toggle Timer');
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
