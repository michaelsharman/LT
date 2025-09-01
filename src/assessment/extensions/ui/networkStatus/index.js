import { createExtension } from '../../../../utils/extensionsFactory.js';

/**
 * Checks for an active network connection. If none found, adds
 * an icon to the UI to indicate the status to the end user.
 *
 * Can also be used to check the current download speed.
 *
 * @param {object=} options Object of configuration options.
 * @param {string=} options.iconWrapper Classname of element to inject the broken connection icon. You
 *      should never need this if using any of the Learnosity regions. Defaults to `top-right-wrapper`.
 * @param {number=} options.interval Millisecond interval to check connection. Defaults to 30000 (30 seconds).
 * @param {string=} options.message Message for tooltip and screen reader users.
 * @param {boolean=} options.render Whether to render the icon or not. Defaults to `true`.
 * @param {string=} options.uri URI to check for network connectivity. Defaults to a Learnosity API endpoint which is already whitelisted.
 *
 * @example
 * const options = {
 *     iconWrapper: 'top-right-wrapper',
 *     interval: 30000,
 *     message: 'Internet connection is currently down.',
 *     render: true,
 *     uri: 'https://questions.learnosity.com?latest-lts',
 * }
 *
 * LT.init(itemsApp, {
 *     extensions: [
 *         { id: 'networkStatus', args: options },
 *     ],
 * });
 *
 * @module Extensions/Assessment/networkStatus
 */

const state = {
    logPrefix: 'LT Network Status: ',
    options: {
        iconWrapper: 'top-right-wrapper',
        interval: 30000,
        message: 'Internet connection is currently down.',
        render: true,
        uri: 'https://questions.learnosity.com?latest-lts',
    },
};

/**
 * @param {object=} config - Optional configuration object includes:
 * @since 2.12.0
 * @ignore
 */
function run(config = {}) {
    validateOptions(config);

    setInterval(getOnlineStatus, state.options.interval);
}

/**
 * Checks connection and dispatches event.
 * @since 2.12.0
 * @ignore
 */
async function getOnlineStatus() {
    const status = await checkConnection();
    const elIndicator = document.querySelector('.lt__networkStatus-indicator');
    const { render, iconWrapper, message } = state.options;

    dispatchNetworkEvent(status);

    if (!render) {
        return;
    }

    if (!status) {
        injectOfflineIndicator(elIndicator, iconWrapper, message);
    } else if (elIndicator) {
        elIndicator.remove();
    }
}

/**
 * Sets UI message if network is down.
 * @since 2.12.0
 * @ignore
 */
function injectOfflineIndicator(elIndicator, wrapperClass, message) {
    if (elIndicator) {
        return;
    }

    const elWrapper = document.querySelector(`.${wrapperClass}`);
    if (!elWrapper) {
        return;
    }

    const template = `
        <div class="lt__networkStatus-indicator pos-left" role="status" aria-live="polite" aria-atomic="true" aria-relevant="all">
            <span title="${message}" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#333333">
                    <path d="M790-56 414-434q-47 11-87.5 33T254-346l-84-86q32-32 69-56t79-42l-90-90q-41 21-76.5 46.5T84-516L0-602q32-32 66.5-57.5T140-708l-84-84 56-56 736 736-58 56Zm-310-64q-42 0-71-29.5T380-220q0-42 29-71t71-29q42 0 71 29t29 71q0 41-29 70.5T480-120Zm236-238-29-29-29-29-144-144q81 8 151.5 41T790-432l-74 74Zm160-158q-77-77-178.5-120.5T480-680q-21 0-40.5 1.5T400-674L298-776q44-12 89.5-18t92.5-6q142 0 265 53t215 145l-84 86Z"/>
                </svg>
            </span>
            <span class="sr-only">${message}</span>
        </div>
    `;

    elWrapper.insertAdjacentHTML('afterbegin', template);
}

/**
 * Checks for network connectivity using a HEAD request.
 * The return promise resolves to true if the request is successful, false otherwise.
 * @since 2.12.0
 * @returns {promise}
 */
async function checkConnection() {
    try {
        await fetch(state.options.uri, {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store',
        });
        return true;
    } catch {
        return false;
    }
}

/**
 * Checks the current download speed using the Network Information API.
 * Returns the current download speed in Mbps or a message indicating that the API is not supported. Eg `10 Mbps`.
 * @since 2.25.0
 * @returns {string}
 */
function checkSpeed() {
    if (navigator?.connection) {
        return `${navigator.connection.downlink} Mbps`;
    } else {
        return 'Network Information API not supported';
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
 * Returns the extension CSS
 * @since 3.0.0
 * @ignore
 */
function getStyles() {
    return `
        /* Learnosity render network status */
        .lt__networkStatus-indicator {
            width: 24px;
            text-align: center;
            position: relative;
            top: 9px;
        }
    `;
}

export const networkStatus = createExtension('networkStatus', run, {
    checkConnection,
    checkSpeed,
    getStyles,
});
