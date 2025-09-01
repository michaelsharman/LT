import { authorApp, questionEditorApp } from './app.js';
import logger from '../../utils/logger.js';

/**
 * Diagnostic/metadata information for Author API.
 * @module Authoring/Diagnostics
 */

const state = {
    events: {
        broadcast: false,
        listenFor: 'all',
    },
    extensions: {
        running: [],
    },
    initialised: false,
};

/**
 * Returns an object of diagnostic information about
 * the current app instance.
 * @since 2.0.0
 * @returns {object}
 * @example
 *  // Sample returned object
 *  {
 *      "apps": {
 *
 *      },
 *      "versions": {
 *          "assets": "v2.202.4-rc.2"
 *          "concrete": "v2.202.4-rc.2"
 *          "mapped": "v2.202"
 *          "requested": "v2023.3.LTS"
 *          "server": "v2023.3.LTS"
 *      }
 *  }
 */
export function diagnostics() {
    /* global LearnosityAuthor */
    const v = window.LearnosityAuthor ? LearnosityAuthor.versions : {};
    const d = {
        apps: {
            author: {
                app: authorApp(),
            },
            questionEditor: {
                app: questionEditorApp(),
            },
        },
        LT: {
            extensions: state.extensions,
            version: typeof __LT_VERSION__ !== 'undefined' ? __LT_VERSION__ : 'development',
        },
        versions: v,
    };
    return d;
}

/**
 * Which event(s) you want to listen for on the console.
 * You must call `listen()` first to start broadcasting.
 *
 * Pass any of the following:
 * - exact event (https://reference.learnosity.com/author-api/events) or;
 * - `*` for all events or;
 * - left or right wildcards via `*`
 * @since 2.0.0
 * @param {string} event
 * @example
 * LT.listen();
 * LT.filterEvent('render*');
 */
export function filterEvent(event) {
    const regex = /^[a-zA-Z:*]*$/;
    if (regex.test(event)) {
        state.events.listenFor = event;
    } else {
        logger.warn('Invalid event type');
    }
}

/**
 * Accepts an event when triggered, optionally write to the console.
 * This is triggered internally so should not be called directly.
 * @since 2.0.0
 * @param {string} event
 * @ignore
 */
export function handleEvent(event) {
    if (state.events.broadcast) {
        const eventPattern = state.events.listenFor;
        const eventListeningFor = eventPattern.replaceAll('*', '');
        if ((eventPattern.length === 1 && eventPattern === '*') || eventPattern === 'all') {
            logger.info(event);
        } else if (eventPattern.startsWith('*') && !eventPattern.endsWith('*')) {
            if (event.endsWith(eventListeningFor)) {
                logger.info(event);
            }
        } else if (eventPattern.endsWith('*') && !eventPattern.startsWith('*')) {
            if (event.startsWith(eventListeningFor)) {
                logger.info(event);
            }
        } else if (eventPattern.startsWith('*') && eventPattern.endsWith('*')) {
            if (event.includes(eventListeningFor)) {
                logger.info(event);
            }
        } else {
            if (event.startsWith(eventListeningFor)) {
                logger.info(event);
            }
        }
    }
}

/**
 * Enables or disabled any console logging of events.
 * Defaults to `true`, turn off by passing a falsy.
 * @since 2.0.0
 * @param {boolean=} status
 */
export function listen(status = true) {
    state.events.broadcast = Boolean(status);
    if (Boolean(status)) {
        logger.info(`👂 listening for '${state.events.listenFor}'`);
    } else {
        logger.info('🚫👂 not listening');
    }
}

/**
 * Listen for extensions to be run
 * @since 3.0.0
 * @ignore
 */
export function extensionsListener() {
    if (!state.initialised) {
        window.addEventListener('extension:run', e => {
            const { name, timestamp } = e.detail;
            state.extensions.running.push({ name, timestamp });
        });
        state.initialised = true;
    }
}
