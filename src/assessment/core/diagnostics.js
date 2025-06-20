import * as app from './app.js';
import * as activity from './activity.js';
import logger from '../../utils/logger.js';
import { version } from '../../version.js';

/**
 * Diagnostic/metadata information for Items API.
 * @module Assessment/Diagnostics
 */

const state = {
    events: {
        broadcast: false,
        listenFor: 'item',
    },
};

/**
 * Returns an object of diagnostic information about
 * the current session.
 * @since 0.1.0
 * @returns {object}
 * @example
 *  // Sample returned object
 *  {
 *      "apps": {
 *          "annotations": {
 *              "app": {},
 *              "config": true,
 *              "enabled": true
 *          },
 *          "assess": {
 *              "app": {}
 *          },
 *          "events": {
 *              "app": null,
 *              "enabled": false
 *          },
 *          "items": {
 *              "app": {},
 *              "metadata": {
 *                  "items_api_version": "v1.118.3"
 *              }
 *          },
 *          "questions": {
 *              "app": {}
 *          }
 *      },
 *      "activity": {
 *          "activity": "items-api-demo",
 *          "autoSave": {
 *              "config": {
 *                  "save_interval_duration": 300
 *              },
 *              "enabled": true
 *          },
 *          "itemBank": 6,
 *          "session": "f85afe9c-342e-4363-8d70-ad3c665566c0",
 *          "state": "initial",
 *          "type": "submit_practice",
 *          "user": "labs-site"
 *      },
 *      "versions": {
 *          "requested": "v2023.2.LTS",
 *          "mapped": "v2.197",
 *          "concrete": "v2.197.5",
 *          "server": "v2023.2.LTS",
 *          "assets": "v2.197.5"
 *      }
 *  }
 */
export function diagnostics() {
    /* global LearnosityApp */
    const v = window.LearnosityApp ? LearnosityApp.versions : {};
    const d = {
        apps: {
            annotations: {
                app: app.annotationsApp(),
                config: activity.annotationsConfig(),
                enabled: activity.hasAnnotations(),
            },
            assess: {
                app: app.assessApp(),
            },
            events: {
                app: app.eventsApp(),
                enabled: activity.hasEvents(),
            },
            items: {
                app: app.appInstance(),
                metadata: activity.activity().config.metadata,
            },
            questions: {
                app: app.questionsApp(),
            },
        },
        activity: {
            activity: activity.activityId(),
            activityTemplate: activity.activityTemplateId(),
            autoSave: {
                config: activity.autoSaveConfig(),
                enabled: activity.hasAutoSave(),
            },
            itemBank: activity.itemBank(),
            itemPool: activity.itemPool(),
            session: activity.sessionId(),
            state: activity.state(),
            type: activity.activity().type,
            user: activity.userId(),
        },
        LT: {
            version: version,
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
 * - exact event (https://reference.learnosity.com/items-api/events) or;
 * - `'*'` for all events or;
 * - left or right wildcards via `*`
 * @since 0.1.0
 * @param {string} event
 * @example
 * LT.listen();
 * LT.filterEvent('item*');
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
 * @since 0.1.0
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
 * @since 0.1.0
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
