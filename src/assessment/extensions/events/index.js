import { appInstance } from '../../core/app.js';
import { isVerticalLayout, userId, sessionId } from '../../core/activity.js';
import { item, itemPosition, itemReference } from '../../core/items.js';
import { questionResponse, questionResponseIds } from '../../core/questions.js';
import { networkStatus } from '../ui/networkStatus/index.js';
import { createExtension } from '../../../utils/extensionsFactory.js';
import logger from '../../../utils/logger.js';
import { detectEnv } from '../../../utils/userAgent.js';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Tracks user activity and events within Items API.
 * JSON events are stored in the events object and can be rendered for analysis.
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/telemetry/telemetry.png" alt="" width="900"></p>
 * @module Extensions/Assessment/events
 */

const state = {
    initialised: false,
    events: {
        events: [],
        network: null,
        session: null,
        user: null,
    },
};

/**
 * @example
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.telemetry.run();
 * @since 3.0.0
 */
function run() {
    if (isVerticalLayout()) {
        logger.warn('Event log is not currently supported in vertical layout.');
        return;
    }

    if (!state.initialised) {
        setupEnvironment();
        setupPlayerEvents();
        setupQuestionEvents();
        setupFeatureEvents();
        setupNetworkEvents();
        state.initialised = true;
    }
}

async function setupEnvironment() {
    state.events.user = userId();
    state.events.session = sessionId();
    state.events.environment = await getEnvironmentInformation();
    state.events.network = {
        speed: networkStatus.checkSpeed(),
    };
}

function setupPlayerEvents() {
    appInstance().on('test:start', () => {
        addEvent({
            type: 'test:start',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('unfocused', () => {
        addEvent({
            type: 'unfocused',
            item: itemReference(),
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('focused', () => {
        addEvent({
            type: 'focused',
            item: itemReference(),
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:reading:start', () => {
        addEvent({
            type: 'test:reading:start',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:reading:end', () => {
        addEvent({
            type: 'test:reading:end',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('item:warningOnChange', () => {
        addEvent({
            type: 'item:warningOnChange',
            item: itemReference(),
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('item:load', () => {
        addEvent({
            type: 'item:load',
            item: itemReference(),
            data: {
                num: itemPosition(),
            },
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('items:fetch:done', () => {
        addEvent({
            type: 'items:fetch:done',
            item: itemReference(),
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('section:changed', () => {
        addEvent({
            type: 'section:changed',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:panel:show', async () => {
        const event = await getEventFromDialog();
        addEvent({
            type: event,
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:panel:hide', () => {
        addEvent({
            type: 'dialog:hide',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:pause', () => {
        addEvent({
            type: 'test:pause',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:resume', () => {
        addEvent({
            type: 'test:resume',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:save', () => {
        addEvent({
            type: 'test:save',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:save:success', () => {
        addEvent({
            type: 'test:save:success',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:save:error', () => {
        addEvent({
            type: 'test:save:error',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:submit', () => {
        addEvent({
            type: 'test:submit',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:submit:success', () => {
        addEvent({
            type: 'test:submit:success',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:submit:error', () => {
        addEvent({
            type: 'test:submit:error',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:finished:save', () => {
        addEvent({
            type: 'test:finished:save',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:finished:submit', () => {
        addEvent({
            type: 'test:finished:submit',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('test:finished:discard', () => {
        addEvent({
            type: 'test:finished:discard',
            timestamp: getTimestamp(),
        });
    });

    appInstance().on('time:end', () => {
        addEvent({
            type: 'time:end',
            timestamp: getTimestamp(),
        });
    });
}

function setupQuestionEvents() {
    // Types we don't store response data for
    const debounceQuestions = [
        'longtextV2',
        'longtext',
        'plaintext',
        'drawing',
        'shorttext',
        'audio',
        'video',
        'formulaessayV2',
        'chemistryessayV2',
        'imageupload',
        'fileupload',
    ];
    const DEBOUNCE_INTERVAL = 30_000; // 30 seconds
    const lastTrackedTimestamps = {};

    appInstance().on('item:load', () => {
        questionResponseIds().forEach(responseId => {
            const question = appInstance().question(responseId);
            const questionJson = question.getQuestion();
            const type = questionJson.type;

            if (['audio', 'video'].includes(type)) {
                question.on('recording:started', () => {
                    addEvent({
                        type: 'recording:started',
                        item: itemReference(),
                        question: questionJson.metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                });
                question.on('recording:paused', () => {
                    addEvent({
                        type: 'recording:paused',
                        item: itemReference(),
                        question: questionJson.metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                });
                question.on('recording:resumed', () => {
                    addEvent({
                        type: 'recording:resumed',
                        item: itemReference(),
                        question: questionJson.metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                });
                question.on('recording:stopped', () => {
                    addEvent({
                        type: 'recording:stopped',
                        item: itemReference(),
                        question: questionJson.metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                });
            }

            question.on('changed', () => {
                const lastTracked = lastTrackedTimestamps[responseId] || 0;
                const { revision, value } = questionResponse(responseId);

                if (debounceQuestions.includes(type)) {
                    if (getTimestamp() - lastTracked >= DEBOUNCE_INTERVAL) {
                        lastTrackedTimestamps[responseId] = getTimestamp();
                        addEvent({
                            type: 'question:changed',
                            item: itemReference(),
                            question: questionJson.metadata.widget_reference,
                            data: {},
                            timestamp: getTimestamp(),
                        });
                    }
                } else {
                    addEvent({
                        type: 'question:changed',
                        item: itemReference(),
                        question: questionJson.metadata.widget_reference,
                        data: { revision, value },
                        timestamp: getTimestamp(),
                    });
                    addEvent({
                        type: 'question:masked',
                        item: itemReference(),
                        question: questionJson.metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                    addEvent({
                        type: 'question:validated',
                        item: itemReference(),
                        question: questionJson.metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                }
            });
        });
    });
}

function setupFeatureEvents() {
    appInstance().on('item:load', () => {
        const features = [...item().feature_ids, ...item().simplefeature_ids];

        features.forEach(id => {
            if (appInstance().feature(id)) {
                appInstance()
                    .feature(id)
                    .on('begin', () => {
                        addEvent({
                            type: 'begin',
                            item: itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
                appInstance()
                    .feature(id)
                    .on('complete', () => {
                        addEvent({
                            type: 'complete',
                            item: itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
                appInstance()
                    .feature(id)
                    .on('playback:started', () => {
                        addEvent({
                            type: 'playback:started',
                            item: itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
                appInstance()
                    .feature(id)
                    .on('playback:paused', () => {
                        addEvent({
                            type: 'playback:paused',
                            item: itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
                appInstance()
                    .feature(id)
                    .on('playback:resumed', () => {
                        addEvent({
                            type: 'playback:resumed',
                            item: itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
                appInstance()
                    .feature(id)
                    .on('playback:stopped', () => {
                        addEvent({
                            type: 'playback:stopped',
                            item: itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
                appInstance()
                    .feature(id)
                    .on('playback:complete', () => {
                        addEvent({
                            type: 'playback:complete',
                            item: itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
            }
        });
    });
}

function setupNetworkEvents() {
    document.addEventListener('LTNetworkOnline', () => {
        if (state.network === 'offline') {
            state.network = 'online';
            addEvent({
                type: 'network:online',
                item: itemReference(),
                timestamp: getTimestamp(),
            });
        }
    });

    document.addEventListener('LTNetworkOffline', () => {
        if (state.network === 'online') {
            state.network = 'offline';
            addEvent({
                type: 'network:offline',
                item: itemReference(),
                timestamp: getTimestamp(),
            });
        }
    });
}

function addEvent(event) {
    state.events.events.push(event);
}

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

function getTimestamp() {
    return Date.now();
}

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
