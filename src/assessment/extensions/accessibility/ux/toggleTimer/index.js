import { createExtension, LT } from '../../../../../utils/extensionsFactory.js';

/**
 * Allows end users to click and show/hide the assessment timer. This is an accommodations tool.
 *
 * @param {object=} options Object of configuration options.
 * @param {number=} options.showTimerLimit The time limit for showing the timer (in seconds).
 *
 * @example
 * const options = {
 *     showTimerLimit: 60
 * }
 *
 * LT.init(itemsApp, {
 *     extensions: [
 *         { id: 'toggleTimer', args: options },
 *     ],
 * });
 *
 * @module Extensions/Assessment/toggleTimer
 */

const state = {
    initialised: false,
    elTimerWrapper: null,
    elTimer: null,
    elClock: null,
    enableForceTimerShow: false,
    forceRenderTimer: false,
};

/**
 * Toggle Timer
 * @param {object=} config Object of configuration options.
 * @since 3.0.0
 * @ignore
 */
function run(config) {
    const { showTimerLimit = 60 } = config || {};

    if (state.initialised) {
        LT.utils.logger.debug('Toggle timer already initialised, ignoring run();');
        return;
    }

    // Fast presence checks only (no writes yet)
    const elResponsive = document.querySelector('.lrn-sm');
    const elWrapper = document.querySelector('.lrn-timer-wrapper');

    if (!elResponsive || !elWrapper) {
        LT.utils.logger.warn('Timer wrapper, or `.lrn-sm`, not found');
        return;
    }

    const elTimer = elWrapper.querySelector('.timer');
    const elClock = elWrapper.querySelector('.clock');
    if (!elTimer) {
        LT.utils.logger.warn('Timer element not found, cannot run toggle timer extension');
        return;
    }

    // Cache references
    state.elTimerWrapper = elWrapper;
    state.elTimer = elTimer;
    state.elClock = elClock;

    // Batch DOM writes and listeners in one paint step
    requestAnimationFrame(() => {
        // Accessibility + interactive affordances
        state.elTimerWrapper.classList.add('lt__timer-wrapper', 'lrn_btn', 'lt__tooltip');
        state.elTimerWrapper.setAttribute('role', 'button');
        state.elTimerWrapper.setAttribute('tabindex', '0');
        // Timer starts visible
        updateAccessibilityState(true);

        state.elTimerWrapper.addEventListener('click', onClick);
        state.elTimerWrapper.addEventListener('keydown', onKeydown);

        if (!state.elTimerWrapper.querySelector('.lt__clock-glyph')) {
            const glyph = document.createElement('span');
            glyph.className = 'lt__clock-glyph';
            state.elTimerWrapper.appendChild(glyph);
        }

        // Optional: force show near end; subscribe once and then unsubscribe
        if (state.enableForceTimerShow && LT.maxTime() > 0) {
            const app = LT.itemsApp();
            const handler = () => {
                const secondsRemaining = LT.timeRemaining();
                const hidden = state.elTimerWrapper.classList.contains('lt--timer-hidden');

                if (!state.forceRenderTimer && typeof secondsRemaining === 'number' && secondsRemaining <= Number(showTimerLimit) && hidden) {
                    state.forceRenderTimer = true;
                    toggle();
                    LT.utils.logger.info(`Force show: timer limit (${showTimerLimit}) reached.`);
                    if (typeof app.off === 'function') {
                        app.off('time:change', handler);
                    }
                }
            };
            app.on('time:change', handler);
        }

        state.initialised = true;
    });
}

function onClick() {
    toggle();
}

function onKeydown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
    }
}

/**
 * Toggle visibility without cloning nodes.
 * CSS does the heavy lifting via .lt--timer-hidden
 */
function toggle() {
    if (!state.elTimerWrapper || !state.elTimer) {
        return;
    }

    const willHide = !state.elTimerWrapper.classList.contains('lt--timer-hidden');
    state.elTimerWrapper.classList.toggle('lt--timer-hidden', willHide);

    // Update ARIA to reflect *timer* visibility (pressed = visible)
    updateAccessibilityState(!willHide);
}

function updateAccessibilityState(isVisible) {
    state.elTimerWrapper.setAttribute('aria-pressed', String(isVisible));
    state.elTimerWrapper.setAttribute(
        'aria-label',
        `Assessment time. Timer is ${isVisible ? 'visible' : 'hidden'}. Click to ${isVisible ? 'hide' : 'show'} it.`
    );
}

/**
 * Returns the extension CSS
 * @since 3.0.0
 * @ignore
 */
function getStyles() {
    return `
        /* Learnosity toggle timer styles */
        .lrn-timer-wrapper.lt__timer-wrapper {
            position: relative;
            border-radius: 2px;
            cursor: pointer;
            background-color: #eaeaea;
            color: #333;
            border: 1px solid #d9d9d9;
        }
        .lrn-timer-wrapper.lt__timer-wrapper:hover {
            background-color: #d9d9d9;
            color: #333;
        }
        .lrn-timer-wrapper.lt__timer-wrapper:focus {
            box-shadow: none;
            border: 1px solid #1877b1;
        }
        .lrn-timer-wrapper.lt__timer-wrapper:active {
            box-shadow: none;
        }

        /* When hidden, suppress the timer number and show the clock icon via ::before */
        .lrn-timer-wrapper.lt__timer-wrapper.lt--timer-hidden .timer {
            display: none !important;
        }
        /* Hide numbers when off */
        .lrn-timer-wrapper.lt__timer-wrapper.lt--timer-hidden .timer {
            display: none !important;
        }

        /* Clock glyph element (no tooltip conflict) */
        .lrn-timer-wrapper.lt__timer-wrapper .lt__clock-glyph {
            display: none;
        }

        .lrn-timer-wrapper.lt__timer-wrapper.lt--timer-hidden .lt__clock-glyph {
            display: inline-block;
            vertical-align: top;
            max-width: 100%;
            padding: .68em .9em;
        }

        /* Render the clock via icon font */
        .lrn-timer-wrapper.lt__timer-wrapper .lt__clock-glyph::before {
            font-family: "LearnosityIconsRegular";
            position: relative;
            top: 1px;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            content: ""; /* same glyph you used before */
        }

        /* Tooltip */
        .lrn-timer-wrapper.lt__timer-wrapper.lt__tooltip::before,
        .lrn-timer-wrapper.lt__timer-wrapper.lt__tooltip::after {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease-in 0.2s, visibility 0s linear 0.2s;
            visibility: hidden;
            z-index: 10;
            font-family: inherit;
        }
        .lrn-timer-wrapper.lt__timer-wrapper.lt__tooltip::before {
            box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
            content: attr(aria-label);
            position: absolute;
            top: -55px;
            left: 50%;
            transform: translateX(-50%);
            background: #4d4d4d;
            color: #fff;
            padding: 10px 30px;
            border-radius: 4px;
            white-space: nowrap;
            font-size: 14px;
        }
        .lrn-timer-wrapper.lt__timer-wrapper.lt__tooltip::after {
            content: '';
            position: absolute;
            bottom: 105%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-top-color: #4d4d4d;
        }
        .lrn-timer-wrapper.lt__timer-wrapper.lt__tooltip:is(:hover, :focus)::before,
        .lrn-timer-wrapper.lt__timer-wrapper.lt__tooltip:is(:hover, :focus)::after {
            opacity: 1;
            visibility: visible;
        }

        /* Layout adjustment */
        .lrn.lrn-assess .lrn-region:not(.lrn-items-region) .lrn_btn.lt__timer-wrapper {
            font-size: inherit;
            padding: 0.01em;
        }
    `;
}

export const toggleTimer = createExtension('toggleTimer', run, {
    getStyles,
    toggle,
});
