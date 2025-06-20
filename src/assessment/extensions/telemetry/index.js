import * as app from '../../core/app.js';
import * as activity from '../../core/activity.js';
import * as items from '../../core/items.js';
import * as questions from '../../core/questions.js';
import { checkSpeed } from '../ui/networkStatus/index.js';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Tracks user activity and telemetry within Items API.
 * JSON events are stored in the telemetry object and can be
 * rendered in a chart for analysis.
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/telemetry/telemetry.png" alt="" width="900"></p>
 * @module Extensions/Assessment/telemetry
 */

const state = {
    initialised: false,
    network: 'online',
    telemetry: {
        session: null,
        user: null,
        events: [],
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
export function run() {
    setupTelemetry();

    addEvent({
        type: 'session:start',
        timestamp: getTimestamp(),
        network: {
            speed: checkSpeed(),
        },
    });

    app.appInstance().on('item:load', () => {
        if (!state.initialised) {
            setupPlayerEvents();
            setupQuestionEvents();
            setupFeatureEvents();
            setupNetworkEvents();
            state.initialised = true;
        }
    });
}

function setupTelemetry() {
    state.telemetry.user = activity.userId();
    state.telemetry.session = activity.sessionId();
}

function setupPlayerEvents() {
    app.appInstance().on('test:start', () => {
        addEvent({
            type: 'test:start',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('unfocused', () => {
        addEvent({
            type: 'unfocused',
            item: items.itemReference(),
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('focused', () => {
        addEvent({
            type: 'focused',
            item: items.itemReference(),
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:reading:start', () => {
        addEvent({
            type: 'test:reading:start',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:reading:end', () => {
        addEvent({
            type: 'test:reading:end',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('item:warningOnChange', () => {
        addEvent({
            type: 'item:warningOnChange',
            item: items.itemReference(),
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('item:load', () => {
        addEvent({
            type: 'item:load',
            item: items.itemReference(),
            data: {
                num: items.itemPosition(),
            },
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('items:fetch:done', () => {
        addEvent({
            type: 'items:fetch:done',
            item: items.itemReference(),
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('section:changed', () => {
        addEvent({
            type: 'section:changed',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:pause', () => {
        addEvent({
            type: 'test:pause',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:resume', () => {
        addEvent({
            type: 'test:resume',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:save', () => {
        addEvent({
            type: 'test:save',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:save:success', () => {
        addEvent({
            type: 'test:save:success',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:save:error', () => {
        addEvent({
            type: 'test:save:error',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:submit', () => {
        addEvent({
            type: 'test:submit',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:submit:success', () => {
        addEvent({
            type: 'test:submit:success',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:submit:error', () => {
        addEvent({
            type: 'test:submit:error',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:finished:save', () => {
        addEvent({
            type: 'test:finished:save',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:finished:submit', () => {
        addEvent({
            type: 'test:finished:submit',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('test:finished:discard', () => {
        addEvent({
            type: 'test:finished:discard',
            timestamp: getTimestamp(),
        });
    });

    app.appInstance().on('time:end', () => {
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

    app.appInstance().on('item:load', () => {
        questions.questionResponseIds().forEach(responseId => {
            const question = app.appInstance().question(responseId);
            const type = questions.question(responseId).type;

            if (['audio', 'video'].includes(type)) {
                question.on('recording:started', () => {
                    addEvent({
                        type: 'recording:started',
                        item: items.itemReference(),
                        question: questions.question(responseId).metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                });
                question.on('recording:paused', () => {
                    addEvent({
                        type: 'recording:paused',
                        item: items.itemReference(),
                        question: questions.question(responseId).metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                });
                question.on('recording:resumed', () => {
                    addEvent({
                        type: 'recording:resumed',
                        item: items.itemReference(),
                        question: questions.question(responseId).metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                });
                question.on('recording:stopped', () => {
                    addEvent({
                        type: 'recording:stopped',
                        item: items.itemReference(),
                        question: questions.question(responseId).metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                });
            }

            question.on('changed', () => {
                const lastTracked = lastTrackedTimestamps[responseId] || 0;
                const { revision, value } = questions.questionResponse(responseId);

                if (debounceQuestions.includes(type)) {
                    if (getTimestamp() - lastTracked >= DEBOUNCE_INTERVAL) {
                        lastTrackedTimestamps[responseId] = getTimestamp();
                        addEvent({
                            type: 'question:changed',
                            item: items.itemReference(),
                            question: questions.question(responseId).metadata.widget_reference,
                            data: {},
                            timestamp: getTimestamp(),
                        });
                    }
                } else {
                    addEvent({
                        type: 'question:changed',
                        item: items.itemReference(),
                        question: questions.question(responseId).metadata.widget_reference,
                        data: { revision, value },
                        timestamp: getTimestamp(),
                    });
                    addEvent({
                        type: 'question:masked',
                        item: items.itemReference(),
                        question: questions.question(responseId).metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                    addEvent({
                        type: 'question:validated',
                        item: items.itemReference(),
                        question: questions.question(responseId).metadata.widget_reference,
                        timestamp: getTimestamp(),
                    });
                }
            });
        });
    });
}

function setupFeatureEvents() {
    app.appInstance().on('item:load', () => {
        const features = [...items.item().feature_ids, ...items.item().simplefeature_ids];

        features.forEach(id => {
            if (app.appInstance().feature(id)) {
                app.appInstance()
                    .feature(id)
                    .on('begin', () => {
                        addEvent({
                            type: 'begin',
                            item: items.itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
                app.appInstance()
                    .feature(id)
                    .on('complete', () => {
                        addEvent({
                            type: 'complete',
                            item: items.itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
                app.appInstance()
                    .feature(id)
                    .on('playback:started', () => {
                        addEvent({
                            type: 'playback:started',
                            item: items.itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
                app.appInstance()
                    .feature(id)
                    .on('playback:paused', () => {
                        addEvent({
                            type: 'playback:paused',
                            item: items.itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
                app.appInstance()
                    .feature(id)
                    .on('playback:resumed', () => {
                        addEvent({
                            type: 'playback:resumed',
                            item: items.itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
                app.appInstance()
                    .feature(id)
                    .on('playback:stopped', () => {
                        addEvent({
                            type: 'playback:stopped',
                            item: items.itemReference(),
                            timestamp: getTimestamp(),
                        });
                    });
                app.appInstance()
                    .feature(id)
                    .on('playback:complete', () => {
                        addEvent({
                            type: 'playback:complete',
                            item: items.itemReference(),
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
                item: items.itemReference(),
                timestamp: getTimestamp(),
            });
        }
    });

    document.addEventListener('LTNetworkOffline', () => {
        if (state.network === 'online') {
            state.network = 'offline';
            addEvent({
                type: 'network:offline',
                item: items.itemReference(),
                timestamp: getTimestamp(),
            });
        }
    });
}

function addEvent(event) {
    state.telemetry.events.push(event);
}

function getTimestamp() {
    return Date.now();
}

export function getTelemetry() {
    return state.telemetry;
}
