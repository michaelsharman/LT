import logger from '../../../../utils/logger';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Checks for an active network connection. If none found, adds
 * an icon to the UI to indicate the status to the end user.
 *
 * @module Extensions/Assessment/networkStatus
 */

const state = {
    options: {
        iconWrapper: 'top-right-wrapper',
        interval: 30000,
        message: 'Internet connection is currently down.',
        render: true,
        uri: 'https://questions.learnosity.com?latest-lts',
    },
    renderedCss: false,
};

/**
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/core';
 * import * as networkStatus from '@caspingus/lt/src/assessment/extensions/ui/networkStatus/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * networkStatus.run();
 * @param {object=} options - Optional configuration object includes:
 *  - `iconWrapper` (string) classname of element to inject the broken connection icon. You
 * should never need this if using any of the Learnosity regions.
 *  - `interval` (numeric) millisecond interval to check connection. Defaults to 30000 (30 seconds).
 *  - `message` (string) message for tooltip and screen reader users.
 *  - `render` (boolean) whether to render the icon or not. Defaults to `true`.
 *  - `uri` (string) URI to check for network connectivity. Defaults to a Learnosity API endpoint which
 * is already whitelisted.
 * @since 2.12.0
 */
export function run(options) {
    if (!state.renderedCss) injectCSS();

    validateOptions(options);

    setInterval(checkOnlineStatus, state.options.interval);
}

/**
 * Sets UI message if network is down.
 * @since 2.12.0
 * @ignore
 */
async function checkOnlineStatus() {
    const status = await checkInternetConnectivity();
    const elIndicator = document.querySelector('.lt__networkStatus-indicator');

    dispatchNetworkEvent(status);

    if (state.options.render) {
        if (!status) {
            const elWrapper = document.querySelector(`.${state.options.iconWrapper}`);
            const template = `<div class="lt__networkStatus-indicator pos-left" role="status" aria-live="polite" aria-atomic="true" aria-relevant="all">
                <span title="${state.options.message}" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#333333">
                        <path d="M790-56 414-434q-47 11-87.5 33T254-346l-84-86q32-32 69-56t79-42l-90-90q-41 21-76.5 46.5T84-516L0-602q32-32 66.5-57.5T140-708l-84-84 56-56 736 736-58 56Zm-310-64q-42 0-71-29.5T380-220q0-42 29-71t71-29q42 0 71 29t29 71q0 41-29 70.5T480-120Zm236-238-29-29-29-29-144-144q81 8 151.5 41T790-432l-74 74Zm160-158q-77-77-178.5-120.5T480-680q-21 0-40.5 1.5T400-674L298-776q44-12 89.5-18t92.5-6q142 0 265 53t215 145l-84 86Z"/>
                    </svg>
                </span>
                <span class="sr-only">${state.options.message}</span>
            </div>`;

            if (elWrapper && !elIndicator) {
                elWrapper.insertAdjacentHTML('afterbegin', template);
            }
        } else if (elIndicator) {
            elIndicator.remove();
        }
    }
}

/**
 * Makes a HEAD request to the specified URI to check for network connectivity.
 * @since 2.12.0
 * @ignore
 * @returns {promise}
 */
async function checkInternetConnectivity() {
    try {
        const response = await fetch(state.options.uri, {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store',
        });
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Dispatches an event to indicate the network status.
 * Fires at the interval defined by configuration options.
 * @since 2.12.0
 * @ignore
 * @param {boolean} status
 */
function dispatchNetworkEvent(status) {
    const eventStatus = status ? 'LTNetworkOnline' : 'LTNetworkOffline';
    const event = new CustomEvent(eventStatus);

    document.dispatchEvent(event);
}

/**
 * Validates user passed options and merges them with the default options.
 * @param {*} options
 * @since 2.12.0
 * @ignore
 */
function validateOptions(options) {
    if (options && typeof options === 'object') {
        state.options = { ...state.options, ...options };
    }
}

/**
 * Injects the necessary CSS to the header
 * @since 2.12.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity render network status */
.lt__networkStatus-indicator {
    width: 24px;
    text-align: center;
    position: relative;
    top: 9px;
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
