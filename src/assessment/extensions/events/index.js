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
 * Tracks the item reference of the most recent item:load that was handled,
 * used to prevent duplicate processing when both the event bus replay and
 * the queueMicrotask fallback fire for the same item.
 * @since 3.7.0
 * @ignore
 */
let lastItemLoadRef = null;

/**
 * Tracks all item references for which question and feature listeners have
 * already been registered. Prevents duplicate listener registration when the
 * user navigates back to a previously visited item.
 * @since 3.8.0
 * @ignore
 */
const listenerSetupRefs = new Set();

/**
 * Tracks the last known mouse cursor position and whether a touch device
 * has been detected. Used for suspicious click detection.
 * @since 3.7.0
 * @ignore
 */
const pointer = {
    lastX: null,
    lastY: null,
    prevX: null,
    prevY: null,
    hasTouch: false,
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

        LT.eventBus.on('item:load', onItemLoad, 'events');

        // Fallback: if item:load fired before LT event bus routing was established
        // there is no buffered event to replay. Attempt immediately, same pattern as
        // renderPDF. onItemLoad() is idempotent so a double-fire is safe.
        if (!isIntroScreen()) {
            queueMicrotask(onItemLoad);
        }

        setupPlayerEvents();
        setupEnvironment();
        setupNetworkEvents();
        setupVisibilityEvents();
        setupPointerTracking();
        setupDuplicateTabDetection();

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
        // item:load is handled by the event bus listener and queueMicrotask fallback in run().
    }
}

/**
 * Handles an item:load event — logs the event, sets up question and feature listeners.
 * Idempotent: guards against double-firing when both the event bus replay and the
 * queueMicrotask fallback run for the same item (mirrors the renderPDF approach).
 * @since 3.7.0
 * @ignore
 */
function onItemLoad() {
    const ref = LT.itemReference();

    if (!ref || ref === lastItemLoadRef) {
        return;
    }

    lastItemLoadRef = ref;
    const itemLoadTime = getTimestamp();

    addItemLoadEvent(itemLoadTime);

    if (!listenerSetupRefs.has(ref)) {
        listenerSetupRefs.add(ref);
        setupQuestionEvents(ref, itemLoadTime);
        setupFeatureEvents(ref);
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
function setupQuestionEvents(itemRef, itemLoadTime) {
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

    // Types to monitor for paste events and high words-per-minute input
    const wpmTypes = ['formulaessayV2', 'longtextV2', 'plaintext', 'shorttext'];
    const WPM_THRESHOLD = 300; // words per minute above this is considered suspicious
    const wpmTracking = {};

    // Fast response detection — time from item:load to first question:changed
    const FAST_RESPONSE_THRESHOLD_MS = 5_000; // ms below this is considered suspicious
    const firstChangeFired = {};

    // Types to monitor for suspicious click coordinates
    const clickTypes = ['mcq'];

    // CDP-based automation moves the mouse to the element in one step before clicking.
    // We detect this by checking whether the mouse arrived at the click target via a
    // single large jump rather than gradual movement across several mousemove events.
    const CLICK_DISTANCE_THRESHOLD = 20; // px — max gap between click and last mouse pos to confirm they match
    const JUMP_DISTANCE_THRESHOLD = 150; // px — single-step jump larger than this is considered a teleport

    const currentItem = LT.item(itemRef);
    const responseIds = currentItem && currentItem.questions ? currentItem.questions.map(q => q.response_id) : [];

    responseIds.forEach(responseId => {
        const question = LT.itemsApp().question(responseId);
        const questionJson = question.getQuestion();
        const type = questionJson.type;
        const reference = questionJson.metadata.widget_reference;

        // itemRef is captured once in onItemLoad() and passed here, guaranteeing
        // it always matches the item that triggered the item:load event. Re-reading
        // LT.itemReference() inside the forEach is unsafe because Learnosity can
        // advance the current item between onItemLoad() reading `ref` and the forEach
        // iterating each question — causing questions from one item to be attributed
        // to the next.

        if (['audio', 'video'].includes(type)) {
            question.on('recording:started', () => {
                addEvent({
                    type: 'recording:started',
                    item: itemRef,
                    question: reference,
                    timestamp: getTimestamp(),
                });
            });
            question.on('recording:paused', () => {
                addEvent({
                    type: 'recording:paused',
                    item: itemRef,
                    question: reference,
                    timestamp: getTimestamp(),
                });
            });
            question.on('recording:resumed', () => {
                addEvent({
                    type: 'recording:resumed',
                    item: itemRef,
                    question: reference,
                    timestamp: getTimestamp(),
                });
            });
            question.on('recording:stopped', () => {
                addEvent({
                    type: 'recording:stopped',
                    item: itemRef,
                    question: reference,
                    timestamp: getTimestamp(),
                });
            });
        }

        if (wpmTypes.includes(type)) {
            // Timestamp is set at item load so the first `changed` event — even
            // if it is the only one (e.g. programmatic / LLM fill) — is compared
            // against an empty response at load time rather than being skipped.
            wpmTracking[responseId] = { wordCount: 0, timestamp: getTimestamp() };
            const elQuestion = document.getElementById(responseId);

            if (elQuestion) {
                elQuestion.addEventListener('paste', () => {
                    addEvent({
                        type: 'question:paste',
                        item: itemRef,
                        question: reference,
                        responseId,
                        timestamp: getTimestamp(),
                    });
                });
            }
        }

        if (clickTypes.includes(type)) {
            const elQuestion = document.getElementById(responseId);

            if (elQuestion) {
                elQuestion.addEventListener('click', e => {
                    // e.detail === 0 means the click was triggered by keyboard
                    // (Enter/Space) rather than a real mouse press — skip it.
                    if (e.detail === 0) {
                        return;
                    }

                    // No mouse movement recorded at all — suspicious on non-touch devices.
                    if (pointer.lastX === null) {
                        if (!pointer.hasTouch) {
                            // Defer so that Learnosity's own changed event (and our
                            // question:changed log entry) fires before this diagnostic.
                            queueMicrotask(() => {
                                addEvent({
                                    type: 'question:suspiciousClick',
                                    item: itemRef,
                                    question: reference,
                                    responseId,
                                    data: { reason: 'noMouseMovement' },
                                    timestamp: getTimestamp(),
                                });
                            });
                        }
                        return;
                    }

                    const clickAtLastPosition =
                        Math.round(Math.sqrt(Math.pow(e.clientX - pointer.lastX, 2) + Math.pow(e.clientY - pointer.lastY, 2))) <= CLICK_DISTANCE_THRESHOLD;

                    // Only one mousemove ever fired and it landed at the click target.
                    // CDP automation moves the mouse directly to the element as its very
                    // first (and only) action — there is no prior mouse history, which is
                    // equivalent to noMouseMovement for detection purposes.
                    if (pointer.prevX === null && clickAtLastPosition && !pointer.hasTouch) {
                        // Defer so that Learnosity's own changed event (and our
                        // question:changed log entry) fires before this diagnostic.
                        queueMicrotask(() => {
                            addEvent({
                                type: 'question:suspiciousClick',
                                item: itemRef,
                                question: reference,
                                responseId,
                                data: { reason: 'noMouseMovement' },
                                timestamp: getTimestamp(),
                            });
                        });
                        return;
                    }

                    // Teleport detection: CDP-based automation (Puppeteer, Chrome MCP) dispatches
                    // a single mouseMoved event directly to the element centre before clicking,
                    // so the click coordinates match the last mouse position (distance ≈ 0) and
                    // a simple distance check never fires. Instead we check whether the mouse
                    // arrived at the click target via a single large jump from wherever it was
                    // before — real users approach a target gradually across many small steps.
                    if (pointer.prevX !== null && clickAtLastPosition) {
                        const jumpDistance = Math.round(Math.sqrt(Math.pow(pointer.lastX - pointer.prevX, 2) + Math.pow(pointer.lastY - pointer.prevY, 2)));

                        if (jumpDistance > JUMP_DISTANCE_THRESHOLD) {
                            // Defer so that Learnosity's own changed event (and our
                            // question:changed log entry) fires before this diagnostic.
                            queueMicrotask(() => {
                                addEvent({
                                    type: 'question:suspiciousClick',
                                    item: itemRef,
                                    question: reference,
                                    responseId,
                                    data: { reason: 'mouseTeleport', jumpDistance },
                                    timestamp: getTimestamp(),
                                });
                            });
                        }
                    }
                });
            }
        }

        question.on('changed', () => {
            const lastTracked = lastTrackedTimestamps[responseId] || 0;
            const { revision, value } = LT.questionResponse(responseId);

            // Log question:changed first so it always precedes any diagnostic events
            // that are derived from the same change (e.g. question:suspiciousInput).
            if (debounceQuestions.includes(type) || debounceAndStoreResponse.includes(type)) {
                if (getTimestamp() - lastTracked >= DEBOUNCE_INTERVAL) {
                    lastTrackedTimestamps[responseId] = getTimestamp();
                    const responseData = debounceAndStoreResponse.includes(type) ? { revision, value } : {};

                    addEvent({
                        type: 'question:changed',
                        item: itemRef,
                        question: reference,
                        responseId: responseId,
                        data: responseData,
                        timestamp: getTimestamp(),
                    });
                }
            } else {
                addEvent({
                    type: 'question:changed',
                    item: itemRef,
                    question: reference,
                    responseId: responseId,
                    data: { revision, value },
                    timestamp: getTimestamp(),
                });
            }

            if (!firstChangeFired[responseId]) {
                firstChangeFired[responseId] = true;
                const ms = getTimestamp() - itemLoadTime;

                if (ms < FAST_RESPONSE_THRESHOLD_MS) {
                    addEvent({
                        type: 'question:suspiciousResponseSpeed',
                        item: itemRef,
                        question: reference,
                        responseId,
                        data: { reason: 'fastResponse', ms },
                        timestamp: getTimestamp(),
                    });
                }
            }

            if (wpmTypes.includes(type) && value) {
                const currentWordCount = countWords(value, type);
                const tracking = wpmTracking[responseId];
                const timeDeltaMs = getTimestamp() - tracking.timestamp;
                const wordsDelta = currentWordCount - tracking.wordCount;

                if (timeDeltaMs > 0 && wordsDelta > 0) {
                    const wpm = Math.round((wordsDelta / timeDeltaMs) * 60_000);

                    if (wpm > WPM_THRESHOLD) {
                        addEvent({
                            type: 'question:suspiciousInput',
                            item: itemRef,
                            question: reference,
                            responseId,
                            data: { wpm, wordsDelta },
                            timestamp: getTimestamp(),
                        });
                    }
                }

                wpmTracking[responseId] = {
                    wordCount: currentWordCount,
                    timestamp: getTimestamp(),
                };
            }
        });

        question.on('masked', () => {
            addEvent({
                type: 'question:masked',
                item: itemRef,
                question: reference,
                timestamp: getTimestamp(),
            });
        });

        question.on('validated', () => {
            addEvent({
                type: 'question:validated',
                item: itemRef,
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
function setupFeatureEvents(itemRef) {
    const currentItem = LT.item(itemRef);

    if (!currentItem) {
        return;
    }

    const features = [...new Set([...(currentItem.feature_ids || []), ...(currentItem.simplefeature_ids || [])])];

    // Build a type lookup from the item's feature configuration data
    const featureTypeMap = (currentItem.features || []).reduce((map, f) => {
        map[f.feature_id] = f.type;
        return map;
    }, {});

    features.forEach(id => {
        const featureInstance = LT.itemsApp().feature(id);
        const isMediaFeature = ['audio', 'video'].includes(featureTypeMap[id]);

        if (featureInstance && isMediaFeature) {
            featureInstance.on('begin', () => {
                addEvent({
                    type: 'media:begin',
                    item: itemRef,
                    timestamp: getTimestamp(),
                });
            });
            featureInstance.on('complete', () => {
                addEvent({
                    type: 'media:complete',
                    item: itemRef,
                    timestamp: getTimestamp(),
                });
            });
            featureInstance.on('playback:started', () => {
                addEvent({
                    type: 'playback:started',
                    item: itemRef,
                    timestamp: getTimestamp(),
                });
            });
            featureInstance.on('playback:paused', () => {
                addEvent({
                    type: 'playback:paused',
                    item: itemRef,
                    timestamp: getTimestamp(),
                });
            });
            featureInstance.on('playback:resumed', () => {
                addEvent({
                    type: 'playback:resumed',
                    item: itemRef,
                    timestamp: getTimestamp(),
                });
            });
            featureInstance.on('playback:stopped', () => {
                addEvent({
                    type: 'playback:stopped',
                    item: itemRef,
                    timestamp: getTimestamp(),
                });
            });
            featureInstance.on('playback:complete', () => {
                addEvent({
                    type: 'playback:complete',
                    item: itemRef,
                    timestamp: getTimestamp(),
                });
            });
        }
    });
}

/**
 * Uses the BroadcastChannel API to detect when the same session is loaded in
 * a second tab. A ping/pong handshake is used so that only the duplicate tab
 * logs the `tab:duplicate` event. The channel is scoped to the session ID to
 * avoid cross-student interference on shared origins.
 * @since 3.6.0
 * @ignore
 */
function setupDuplicateTabDetection() {
    if (typeof BroadcastChannel === 'undefined') {
        return;
    }

    const channel = new BroadcastChannel(`lt_session_${LT.sessionId()}`);

    channel.onmessage = event => {
        if (event.data.type === 'tab:ping') {
            // Another tab is asking if anyone is here — reply so it knows it's a duplicate
            channel.postMessage({ type: 'tab:pong' });
        }

        if (event.data.type === 'tab:pong') {
            // We received a reply — this tab is the duplicate
            addEvent({
                type: 'tab:duplicate',
                item: LT.itemReference(),
                timestamp: getTimestamp(),
            });
        }
    };

    // Announce our presence to any already-open tabs
    channel.postMessage({ type: 'tab:ping' });

    window.addEventListener('beforeunload', () => channel.close());
}

/**
 * Sets up a Page Visibility API listener to detect when the user navigates
 * away from the page (e.g. switches tabs or minimises the browser) and when
 * they return. Fires `page:blur` on hide and `page:focus` on restore.
 * @since 3.6.0
 * @ignore
 */
function setupVisibilityEvents() {
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            addEvent({
                type: 'page:blur',
                item: LT.itemReference(),
                timestamp: getTimestamp(),
            });
        } else {
            addEvent({
                type: 'page:focus',
                item: LT.itemReference(),
                timestamp: getTimestamp(),
            });
        }
    });
}

/**
 * Tracks the last known mouse cursor position so it can be compared against
 * click coordinates on MCQ questions to detect automation tools.
 * Also sets a flag when a touch event is detected so that the absence of
 * mouse movement is not incorrectly flagged on touch devices.
 * @since 3.7.0
 * @ignore
 */
function setupPointerTracking() {
    document.addEventListener(
        'mousemove',
        e => {
            pointer.prevX = pointer.lastX;
            pointer.prevY = pointer.lastY;
            pointer.lastX = e.clientX;
            pointer.lastY = e.clientY;
        },
        { passive: true }
    );

    document.addEventListener(
        'touchstart',
        () => {
            pointer.hasTouch = true;
        },
        { once: true, passive: true }
    );
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
 * @param {number} timestamp The timestamp to use for the event.
 * @since 3.0.0
 * @ignore
 */
function addItemLoadEvent(timestamp) {
    addEvent({
        type: 'item:load',
        item: LT.itemReference(),
        data: {
            num: LT.itemPosition(),
        },
        timestamp,
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
 * Counts the number of words in a response value.
 * Strips HTML tags for types that store HTML (longtextV2, formulaessayV2) before counting.
 * @param {string} value The response value.
 * @param {string} type The question type.
 * @returns {number} The word count.
 * @since 3.7.0
 * @ignore
 */
function countWords(value, type) {
    if (!value) {
        return 0;
    }
    let text = value;
    if (['formulaessayV2', 'longtextV2'].includes(type)) {
        text = value.replace(/<[^>]+>/g, ' ');
    }
    return text
        .trim()
        .split(/\s+/)
        .filter(w => w.length > 0).length;
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
