import { isIntroScreen, isReadingMode } from '../../core/player.js';
import { networkStatus } from '../ui/networkStatus/index.js';
import { createExtension, LT } from '../../../utils/extensionsFactory.js';
import { detectEnv } from '../../../utils/userAgent.js';

/**
 * Tracks user activity and events within Items API.
 * JSON events are stored in an events object and can be rendered for analysis.
 * Use the `getEvents()` method to retrieve and store the event log.
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/telemetry/telemetry.png" alt="" width="900"></p>
 *
 * @example
 * LT.init(itemsApp, {
 *     extensions: ['events'],
 * });
 *
 * @module Extensions/Assessment/events
 */

const state = {
    initialised: false,
    events: {
        events: [],
        network: {
            speed: null,
            status: 'online',
        },
        session: null,
        user: null,
    },
};

/**
 * @since 3.0.0
 * @ignore
 */
function run() {
    if (LT.isVerticalLayout()) {
        LT.utils.logger.warn('Event log is not currently supported in vertical layout.');
        return;
    }

    if (!state.initialised) {
        setupSessionEvents();

        LT.eventBus.on('item:load', () => {
            addItemLoadEvent();
            setupQuestionEvents();
            setupFeatureEvents();
        }, 'events');

        setupPlayerEvents();
        setupEnvironment();
        setupNetworkEvents();

        state.initialised = true;
    }
}

/**
 * Sets up the initial session events depending on whether there is an intro screen or not.
 * @since 3.0.0
 * @ignore
 */
function setupSessionEvents() {
    if (isIntroScreen()) {
        addEvent({
            type: 'test:ready',
            timestamp: getTimestamp(),
        });
    } else {
        addEvent({
            type: 'test:start',
            timestamp: getTimestamp(),
        });
        if (isReadingMode()) {
            addEvent({
                type: 'test:reading:start',
                timestamp: getTimestamp(),
            });
        }
        addItemLoadEvent();
        setupQuestionEvents();
        setupFeatureEvents();
    }
}

/**
 * Sets up the environment information and user/session details.
 * @since 3.0.0
 * @ignore
 */
async function setupEnvironment() {
    state.events.user = LT.userId();
    state.events.session = LT.sessionId();
    state.events.environment = await getEnvironmentInformation();
    state.events.network.speed = networkStatus.checkSpeed();
}

/**
 * Sets up listeners for various player events like `test` and `item`.
 * @since 3.0.0
 * @ignore
 */
function setupPlayerEvents() {
    LT.eventBus.on('test:start', () => {
        addEvent({
            type: 'test:start',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('unfocused', () => {
        addEvent({
            type: 'unfocused',
            item: LT.itemReference(),
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('focused', () => {
        addEvent({
            type: 'focused',
            item: LT.itemReference(),
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('test:reading:start', () => {
        addEvent({
            type: 'test:reading:start',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('test:reading:end', () => {
        addEvent({
            type: 'test:reading:end',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('item:warningOnChange', () => {
        addEvent({
            type: 'item:warningOnChange',
            item: LT.itemReference(),
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('items:fetch:done', () => {
        addEvent({
            type: 'items:fetch:done',
            item: LT.itemReference(),
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('section:changed', () => {
        addEvent({
            type: 'section:changed',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('test:panel:show', async () => {
        const event = await getEventFromDialog();

        if (!['dialog:pause'].includes(event)) {
            addEvent({
                type: event,
                timestamp: getTimestamp(),
            });
        }
    });

    // This is only useful to see when a11y or review screens close
    // Otherwise it's noise.
    // LT.eventBus.on('test:panel:hide', () => {
    //     addEvent({
    //         type: 'dialog:hide',
    //         timestamp: getTimestamp(),
    //     });
    // });

    LT.eventBus.on('test:pause', () => {
        addEvent({
            type: 'test:pause',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('test:resume', () => {
        addEvent({
            type: 'test:resume',
            timestamp: getTimestamp(),
        });
    });

    // Only fires from the UI, not via itemsApp.save()
    LT.eventBus.on('test:save', () => {
        addEvent({
            type: 'test:save',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('test:save:success', () => {
        addEvent({
            type: 'test:save:success',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('test:save:error', () => {
        addEvent({
            type: 'test:save:error',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('test:submit', () => {
        addEvent({
            type: 'test:submit',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('test:submit:success', () => {
        addEvent({
            type: 'test:submit:success',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('test:submit:error', () => {
        addEvent({
            type: 'test:submit:error',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('test:finished:save', () => {
        addEvent({
            type: 'test:finished:save',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('test:finished:submit', () => {
        addEvent({
            type: 'test:finished:submit',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('test:finished:discard', () => {
        addEvent({
            type: 'test:finished:discard',
            timestamp: getTimestamp(),
        });
    });

    LT.eventBus.on('time:end', () => {
        addEvent({
            type: 'time:end',
            timestamp: getTimestamp(),
        });
    });
}

/**
 * Sets up question events including `changed`, `validated`, `masked` and media recording events.
 * @since 3.0.0
 * @ignore
 */
function setupQuestionEvents() {
    // Types we debounce events and don't store response data for
    const debounceQuestions = [
        'audio',
        'chemistryessayV2',
        'drawing',
        'fileupload',
        'formulaessayV2',
        'imageupload',
        'longtext',
        'longtextV2',
        'plaintext',
        'video',
    ];
    const debounceAndStoreResponse = [
        'association',
        'bowtie',
        'classification',
        'clozeassociation',
        'clozedropdown',
        'clozetext',
        'graphplotting',
        'gridded',
        'hotspot',
        'imageclozeassociation',
        'imageclozedropdown',
        'imageclozetext',
        'numberline',
        'numberlineplot',
        'orderlist',
        'shorttext',
        'simplechart',
        'simpleshading',
        'tokenhighlight',
    ];
    const DEBOUNCE_INTERVAL = 30_000; // 30 seconds
    const lastTrackedTimestamps = {};

    LT.questionResponseIds().forEach(responseId => {
        const question = LT.itemsApp().question(responseId);
        const questionJson = question.getQuestion();
        const type = questionJson.type;
        const reference = questionJson.metadata.widget_reference;

        if (['audio', 'video'].includes(type)) {
            question.on('recording:started', () => {
                addEvent({
                    type: 'recording:started',
                    item: LT.itemReference(),
                    question: reference,
                    timestamp: getTimestamp(),
                });
            });
            question.on('recording:paused', () => {
                addEvent({
                    type: 'recording:paused',
                    item: LT.itemReference(),
                    question: reference,
                    timestamp: getTimestamp(),
                });
            });
            question.on('recording:resumed', () => {
                addEvent({
                    type: 'recording:resumed',
                    item: LT.itemReference(),
                    question: reference,
                    timestamp: getTimestamp(),
                });
            });
            question.on('recording:stopped', () => {
                addEvent({
                    type: 'recording:stopped',
                    item: LT.itemReference(),
                    question: reference,
                    timestamp: getTimestamp(),
                });
            });
        }

        question.on('changed', () => {
            const lastTracked = lastTrackedTimestamps[responseId] || 0;
            const { revision, value } = LT.questionResponse(responseId);

            if (debounceQuestions.includes(type) || debounceAndStoreResponse.includes(type)) {
                if (getTimestamp() - lastTracked >= DEBOUNCE_INTERVAL) {
                    lastTrackedTimestamps[responseId] = getTimestamp();
                    const responseData = debounceAndStoreResponse.includes(type) ? { revision, value } : {};
                    addEvent({
                        type: 'question:changed',
                        item: LT.itemReference(),
                        question: reference,
                        responseId: responseId,
                        data: responseData,
                        timestamp: getTimestamp(),
                    });
                }
            } else {
                addEvent({
                    type: 'question:changed',
                    item: LT.itemReference(),
                    question: reference,
                    responseId: responseId,
                    data: { revision, value },
                    timestamp: getTimestamp(),
                });
            }
        });

        question.on('masked', () => {
            addEvent({
                type: 'question:masked',
                item: LT.itemReference(),
                question: reference,
                timestamp: getTimestamp(),
            });
        });

        question.on('validated', () => {
            addEvent({
                type: 'question:validated',
                item: LT.itemReference(),
                question: reference,
                timestamp: getTimestamp(),
            });
        });
    });
}

/**
 * Sets up feature events including media recording events.
 * @since 3.0.0
 * @ignore
 */
function setupFeatureEvents() {
    const features = [...LT.item().feature_ids, ...LT.item().simplefeature_ids];

    features.forEach(id => {
        if (LT.itemsApp().feature(id)) {
            LT.itemsApp()
                .feature(id)
                .on('begin', () => {
                    addEvent({
                        type: 'begin',
                        item: LT.itemReference(),
                        timestamp: getTimestamp(),
                    });
                });
            LT.itemsApp()
                .feature(id)
                .on('complete', () => {
                    addEvent({
                        type: 'complete',
                        item: LT.itemReference(),
                        timestamp: getTimestamp(),
                    });
                });
            LT.itemsApp()
                .feature(id)
                .on('playback:started', () => {
                    addEvent({
                        type: 'playback:started',
                        item: LT.itemReference(),
                        timestamp: getTimestamp(),
                    });
                });
            LT.itemsApp()
                .feature(id)
                .on('playback:paused', () => {
                    addEvent({
                        type: 'playback:paused',
                        item: LT.itemReference(),
                        timestamp: getTimestamp(),
                    });
                });
            LT.itemsApp()
                .feature(id)
                .on('playback:resumed', () => {
                    addEvent({
                        type: 'playback:resumed',
                        item: LT.itemReference(),
                        timestamp: getTimestamp(),
                    });
                });
            LT.itemsApp()
                .feature(id)
                .on('playback:stopped', () => {
                    addEvent({
                        type: 'playback:stopped',
                        item: LT.itemReference(),
                        timestamp: getTimestamp(),
                    });
                });
            LT.itemsApp()
                .feature(id)
                .on('playback:complete', () => {
                    addEvent({
                        type: 'playback:complete',
                        item: LT.itemReference(),
                        timestamp: getTimestamp(),
                    });
                });
        }
    });
}

/**
 * Sets up listeners for network online/offline events.
 * @since 3.0.0
 * @ignore
 */
function setupNetworkEvents() {
    document.addEventListener('LTNetworkOnline', () => {
        if (state.events.network.status === 'offline') {
            state.events.network.status = 'online';
            addEvent({
                type: 'network:online',
                item: LT.itemReference(),
                timestamp: getTimestamp(),
            });
        }
    });

    document.addEventListener('LTNetworkOffline', () => {
        if (state.events.network.status === 'online') {
            state.events.network.status = 'offline';
            addEvent({
                type: 'network:offline',
                item: LT.itemReference(),
                timestamp: getTimestamp(),
            });
        }
    });
}

/**
 * Adds an event to the event log.
 * @param {object} event
 * @since 3.0.0
 * @ignore
 */
function addEvent(event) {
    state.events.events.push(event);
}

/**
 * Adds an item load event to the log.
 * @since 3.0.0
 * @ignore
 */
function addItemLoadEvent() {
    addEvent({
        type: 'item:load',
        item: LT.itemReference(),
        data: {
            num: LT.itemPosition(),
        },
        timestamp: getTimestamp(),
    });
}

/**
 * Checks which dialog is open and returns the event name.
 * @returns {Promise<string>} The dialog event name or empty string if no dialog found.
 * @since 3.0.0
 * @ignore
 */
function getEventFromDialog() {
    return new Promise(resolve => {
        setTimeout(() => {
            const dialogs = document.querySelectorAll('.lrn-assess-dialogs > .lrn-dialog-default');
            let dialog = '';
            let dialogEventName = '';
            const dialogInfo = Array.from(dialogs)
                .filter(el => el.style.display === 'block')
                .map(el => ({
                    id: el.id,
                    class: el.className,
                }));

            if (dialogInfo.length === 0) {
                resolve('');
                return;
            }

            const info = dialogInfo[0];
            if (info?.id) {
                dialog = info.id.replace(/\d+/g, '');
            } else if (info?.class.includes('review-screen')) {
                dialog = 'review-screen';
            }

            switch (dialog) {
                case 'accessibility-panel':
                    dialogEventName = 'dialog:accessibility';
                    break;

                case 'custom-dialog':
                    dialogEventName = 'dialog:custom-dialog';
                    break;

                case 'module-load-error-dialog':
                    dialogEventName = 'dialog:module-load-error';
                    break;

                case 'review-screen':
                    dialogEventName = 'dialog:review-screen';
                    break;

                case 'test-asset-upload-error-dialog':
                    dialogEventName = 'dialog:asset-upload-error';
                    break;

                case 'test-error-dialog':
                    dialogEventName = 'dialog:error';
                    break;

                case 'test-pause-dialog':
                    dialogEventName = 'dialog:pause';
                    break;

                case 'test-save-submit':
                    dialogEventName = 'dialog:save-submit';
                    break;

                default:
                    break;
            }

            resolve(dialogEventName);
        }, 500);
    });
}

/**
 * Gets the current timestamp.
 * @returns {number} The current timestamp.
 * @since 3.0.0
 * @ignore
 */
function getTimestamp() {
    return Date.now();
}

/**
 * Gets the environment information.
 * @returns {Promise<object>} The environment information.
 * @since 3.0.0
 * @ignore
 */
async function getEnvironmentInformation() {
    return detectEnv();
}

/**
 * Gets the current event log, including environment state.
 * @since 3.0.0
 * @returns {object} The events state
 */
function getEvents() {
    return state.events;
}

export const events = createExtension('events', run, {
    getEvents,
});
