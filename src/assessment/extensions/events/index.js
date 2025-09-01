import { networkStatus } from '../ui/networkStatus/index.js';
import { createExtension, LT } from '../../../utils/extensionsFactory.js';
import { detectEnv } from '../../../utils/userAgent.js';

/**
 * Tracks user activity and events within Items API.
 * JSON events are stored in the events object and can be rendered for analysis.
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
        network: null,
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
        setupEnvironment();
        setupPlayerEvents();
        setupQuestionEvents();
        setupFeatureEvents();
        setupNetworkEvents();
        state.initialised = true;
    }
}

async function setupEnvironment() {
    state.events.user = LT.userId();
    state.events.session = LT.sessionId();
    state.events.environment = await getEnvironmentInformation();
    state.events.network = {
        speed: networkStatus.checkSpeed(),
    };
}

function setupPlayerEvents() {
    LT.itemsApp().on('test:start', () => {
        addEvent({
            type: 'test:start',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('unfocused', () => {
        addEvent({
            type: 'unfocused',
            item: LT.itemReference(),
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('focused', () => {
        addEvent({
            type: 'focused',
            item: LT.itemReference(),
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:reading:start', () => {
        addEvent({
            type: 'test:reading:start',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:reading:end', () => {
        addEvent({
            type: 'test:reading:end',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('item:warningOnChange', () => {
        addEvent({
            type: 'item:warningOnChange',
            item: LT.itemReference(),
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('item:load', () => {
        addEvent({
            type: 'item:load',
            item: LT.itemReference(),
            data: {
                num: LT.itemPosition(),
            },
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('items:fetch:done', () => {
        addEvent({
            type: 'items:fetch:done',
            item: LT.itemReference(),
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('section:changed', () => {
        addEvent({
            type: 'section:changed',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:panel:show', async () => {
        const event = await getEventFromDialog();
        addEvent({
            type: event,
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:panel:hide', () => {
        addEvent({
            type: 'dialog:hide',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:pause', () => {
        addEvent({
            type: 'test:pause',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:resume', () => {
        addEvent({
            type: 'test:resume',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:save', () => {
        addEvent({
            type: 'test:save',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:save:success', () => {
        addEvent({
            type: 'test:save:success',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:save:error', () => {
        addEvent({
            type: 'test:save:error',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:submit', () => {
        addEvent({
            type: 'test:submit',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:submit:success', () => {
        addEvent({
            type: 'test:submit:success',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:submit:error', () => {
        addEvent({
            type: 'test:submit:error',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:finished:save', () => {
        addEvent({
            type: 'test:finished:save',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:finished:submit', () => {
        addEvent({
            type: 'test:finished:submit',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('test:finished:discard', () => {
        addEvent({
            type: 'test:finished:discard',
            timestamp: getTimestamp(),
        });
    });

    LT.itemsApp().on('time:end', () => {
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

    LT.itemsApp().on('item:load', () => {
        LT.questionResponseIds().forEach(responseId => {
            const question = LT.itemsApp().question(responseId);
            const questionJson = question.getQuestion();
            const type = questionJson.type;

            if (['audio', 'video'].includes(type)) {
                question.on('recording:started', () => {
                    addEvent({
                        type: 'recording:started',
                        item: LT.itemReference(),
                        question: questionJson.metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                });
                question.on('recording:paused', () => {
                    addEvent({
                        type: 'recording:paused',
                        item: LT.itemReference(),
                        question: questionJson.metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                });
                question.on('recording:resumed', () => {
                    addEvent({
                        type: 'recording:resumed',
                        item: LT.itemReference(),
                        question: questionJson.metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                });
                question.on('recording:stopped', () => {
                    addEvent({
                        type: 'recording:stopped',
                        item: LT.itemReference(),
                        question: questionJson.metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                });
            }

            question.on('changed', () => {
                const lastTracked = lastTrackedTimestamps[responseId] || 0;
                const { revision, value } = LT.questionResponse(responseId);

                if (debounceQuestions.includes(type)) {
                    if (getTimestamp() - lastTracked >= DEBOUNCE_INTERVAL) {
                        lastTrackedTimestamps[responseId] = getTimestamp();
                        addEvent({
                            type: 'question:changed',
                            item: LT.itemReference(),
                            question: questionJson.metadata.widget_reference,
                            data: {},
                            timestamp: getTimestamp(),
                        });
                    }
                } else {
                    addEvent({
                        type: 'question:changed',
                        item: LT.itemReference(),
                        question: questionJson.metadata.widget_reference,
                        data: { revision, value },
                        timestamp: getTimestamp(),
                    });
                    addEvent({
                        type: 'question:masked',
                        item: LT.itemReference(),
                        question: questionJson.metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                    addEvent({
                        type: 'question:validated',
                        item: LT.itemReference(),
                        question: questionJson.metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                }
            });
        });
    });
}

function setupFeatureEvents() {
    LT.itemsApp().on('item:load', () => {
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
    });
}

function setupNetworkEvents() {
    document.addEventListener('LTNetworkOnline', () => {
        if (state.network === 'offline') {
            state.network = 'online';
            addEvent({
                type: 'network:online',
                item: LT.itemReference(),
                timestamp: getTimestamp(),
            });
        }
    });

    document.addEventListener('LTNetworkOffline', () => {
        if (state.network === 'online') {
            state.network = 'offline';
            addEvent({
                type: 'network:offline',
                item: LT.itemReference(),
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
