import * as app from '../../../core/app';
import * as items from '../../../core/items';
import * as questions from '../../../core/questions';
import * as platform from 'platform-detect';
import * as Mousetrap from 'mousetrap';
import { isEmptyObject } from '../../../../utils/validation';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Enables keyboard shortcuts to perform an action against
 * a question or on the assessment player.
 * @module Extensions/Assessment/keyboardShortcuts
 */

const state = {
    supportedPlatforms: ['chromeos', 'macos', 'windows'],
};

/**
 * Sets up listeners to enable item or player keyboard shortcuts.
 *
 * Supports:
 *  - setting an MCQ response on items with a single MC questions, not multi-part.
 *  - enabling answer masking mode.
 *  - setting a mask on MCQ possible responses.
 *  - toggle flagging of an item.
 *
 * All listeners will fire when you call `run()`. Pass a custom
 * map if you want to remove any shortcuts.
 *
 * See example section below for bindings.
 * @param {object=} map A map of keyboard shortcut options.
 * ```
 * // Default configuration:
 * {
 *     global: [
 *         {
 *             bindings: {
 *                 chromeos: ['ctrl+shift+v'],
 *                 macos: ['command+shift+v'],
 *                 windows: ['ctrl+shift+v'],
 *             },
 *             type: 'item.flag',
 *         },
 *         {
 *             bindings: {
 *                 chromeos: ['ctrl+alt+0'],
 *                 macos: ['command+option+0'],
 *                 windows: ['ctrl+alt+0'],
 *             },
 *             type: 'masking.enable',
 *         },
 *     ],
 *     item: [
 *         {
 *             bindings: {
 *                 chromeos: ['ctrl+shift+1', 'ctrl+shift+2', 'ctrl+shift+3', 'ctrl+shift+4', 'ctrl+shift+5', 'ctrl+shift+6'],
 *                 macos: ['command+ctrl+1', 'command+ctrl+2', 'command+ctrl+3', 'command+ctrl+4', 'command+ctrl+5', 'command+ctrl+6'],
 *                 windows: ['ctrl+shift+1', 'ctrl+shift+2', 'ctrl+shift+3', 'ctrl+shift+4', 'ctrl+shift+5', 'ctrl+shift+6'],
 *             },
 *             restrictTo: ['mcq'],
 *             type: 'response.set',
 *         },
 *         {
 *             bindings: {
 *                 chromeos: ['ctrl+alt+1', 'ctrl+alt+2', 'ctrl+alt+3', 'ctrl+alt+4', 'ctrl+alt+5', 'ctrl+alt+6'],
 *                 macos: ['command+option+1', 'command+option+2', 'command+option+3', 'command+option+4', 'command+option+5', 'command+option+6'],
 *                 windows: ['ctrl+alt+1', 'ctrl+alt+2', 'ctrl+alt+3', 'ctrl+alt+4', 'ctrl+alt+5', 'ctrl+alt+6'],
 *             },
 *             type: 'response.mask',
 *         },
 *     ],
 * };
 * ```
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.keyboardShortcuts.run();
 * @since 0.4.0
 */
export function run(map = getDefaultBindings()) {
    const currentPlatform = getPlatform();

    state.bindings = map;

    if (currentPlatform) {
        overrideCallback();

        // Global (player wide) bindings
        if (state.bindings.hasOwnProperty('global') && Array.isArray(state.bindings.global)) {
            state.bindings.global.forEach(obj => {
                if (obj.hasOwnProperty('type')) {
                    switch (obj.type) {
                        case 'item.flag':
                            toggleFlag(obj.bindings[currentPlatform]);
                            break;

                        case 'masking.enable':
                            enableMasking(obj.bindings[currentPlatform]);
                            break;

                        default:
                            break;
                    }
                }
            });
        }

        // Per item bindings
        if (state.bindings.hasOwnProperty('item') && Array.isArray(state.bindings.item)) {
            app.appInstance().on('item:load', () => {
                state.bindings.item.forEach(obj => {
                    if (obj.hasOwnProperty('type')) {
                        switch (obj.type) {
                            case 'response.mask':
                                setResponseMask(obj.bindings[currentPlatform]);
                                break;

                            case 'response.set':
                                setMcqOption(obj.bindings[currentPlatform]);
                                break;

                            default:
                                break;
                        }
                    }
                });
            });
        }
    }
}

/**
 * Enables masking mode for a single question on the active
 * item (if supported).
 * @param {object} bindings Platform specific bindings for this action.
 * @since 0.4.0
 * @ignore
 */
function enableMasking(bindings) {
    const q = questions.questionInstance();

    if (!isEmptyObject(q) && q.isMaskable()) {
        Mousetrap.bind(bindings, () => {
            app.appInstance().questionsApp().masking(!items.isMaskingEnabled());
        });
    } else {
        // Ignoring items with more than one question
    }
}

/**
 * The default key bindings object.
 * @returns {object}
 * @since 0.4.0
 * @ignore
 */
function getDefaultBindings() {
    return {
        global: [
            {
                bindings: {
                    chromeos: ['ctrl+shift+v'],
                    macos: ['command+shift+v'],
                    windows: ['ctrl+shift+v'],
                },
                type: 'item.flag',
            },
            {
                bindings: {
                    chromeos: ['ctrl+alt+0'],
                    macos: ['command+option+0'],
                    windows: ['ctrl+alt+0'],
                },
                type: 'masking.enable',
            },
        ],
        item: [
            {
                bindings: {
                    chromeos: ['ctrl+shift+1', 'ctrl+shift+2', 'ctrl+shift+3', 'ctrl+shift+4', 'ctrl+shift+5', 'ctrl+shift+6'],
                    macos: ['command+ctrl+1', 'command+ctrl+2', 'command+ctrl+3', 'command+ctrl+4', 'command+ctrl+5', 'command+ctrl+6'],
                    windows: ['ctrl+shift+1', 'ctrl+shift+2', 'ctrl+shift+3', 'ctrl+shift+4', 'ctrl+shift+5', 'ctrl+shift+6'],
                },
                restrictTo: ['mcq'],
                type: 'response.set',
            },
            {
                bindings: {
                    chromeos: ['ctrl+alt+1', 'ctrl+alt+2', 'ctrl+alt+3', 'ctrl+alt+4', 'ctrl+alt+5', 'ctrl+alt+6'],
                    macos: ['command+option+1', 'command+option+2', 'command+option+3', 'command+option+4', 'command+option+5', 'command+option+6'],
                    windows: ['ctrl+alt+1', 'ctrl+alt+2', 'ctrl+alt+3', 'ctrl+alt+4', 'ctrl+alt+5', 'ctrl+alt+6'],
                },
                type: 'response.mask',
            },
        ],
    };
}

/**
 * Checks to see whether the user platform is supported
 * for keyboard shortcuts. Eg we won't support touch
 * platforms.
 * @returns {boolean}
 * @since 0.4.0
 * @ignore
 */
function getPlatform() {
    let currentPlatform;

    state.supportedPlatforms.forEach(p => {
        if (platform[p]) {
            currentPlatform = p;
        }
    });

    return currentPlatform;
}

/**
 * Override the default stop callback method of mousetrap
 * because if the focus is on an MCQ element (radio or
 * checkbox) we still want to fire an event if the user
 * chooses a different option.
 * @since 0.4.0
 * @ignore
 */
function overrideCallback() {
    Mousetrap.prototype.stopCallback = (e, element) => {
        const activeEl = document.activeElement;

        // We don't stop if focus is on a radio button
        if (activeEl.getAttribute('type') === 'radio' || activeEl.getAttribute('type') === 'checkbox') {
            return false;
        }

        // if the element has the class "mousetrap" then no need to stop
        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
            return false;
        }

        // stop for input, select, and textarea
        return (
            element.tagName == 'INPUT' ||
            element.tagName == 'SELECT' ||
            element.tagName == 'TEXTAREA' ||
            (element.contentEditable && element.contentEditable == 'true')
        );
    };
}

/**
 * Manually clicks an MCQ possible response.
 * @param {object} bindings Platform specific bindings for this action.
 * @since 0.4.0
 * @ignore
 */
function setMcqOption(bindings) {
    const qs = questions.questions();
    let numMCQs = 0;

    qs.forEach(q => {
        if (q.type === 'mcq') {
            numMCQs++;
        }
    });

    if (numMCQs === 1) {
        Object.values(qs).forEach(question => {
            if (question.type === 'mcq') {
                Mousetrap.bind(bindings, e => {
                    if (question.options?.length >= e.key) {
                        const domWrapper = document.getElementById(`${question.response_id}`);
                        const domOptions = domWrapper.querySelectorAll('.lrn-input');
                        domOptions[e.key - 1].click();
                    }
                });
            }
        });
    } else {
        // Ignoring items with more than one MCQ
    }
}

/**
 * Manually masks a possible response.
 * @param {object} bindings Platform specific bindings for this action.
 * @since 0.4.0
 * @ignore
 */
function setResponseMask(bindings) {
    const qs = questions.questions();
    let numMCQs = 0;

    qs.forEach(q => {
        if (q.type === 'mcq') {
            numMCQs++;
        }
    });

    if (numMCQs === 1) {
        Object.values(qs).forEach(question => {
            if (question.type === 'mcq') {
                Mousetrap.bind(bindings, (e, combo) => {
                    if (items.isMaskingEnabled()) {
                        const index = Number(combo.at(-1));
                        if (question.options?.length >= index) {
                            const domWrapper = items.itemElement();
                            const domOptions = domWrapper.querySelectorAll('.lrn-mcq-option');
                            const elMask = domOptions[index - 1].querySelector('.lrn-mask');
                            if (elMask) {
                                elMask.click();
                            }
                        }
                    }
                });
            }
        });
    } else {
        // Ignoring items with more than one MCQ
    }
}

/**
 * Manually toggles the item flag button.
 * @param {object} bindings Platform specific bindings for this action.
 * @since 0.4.0
 * @ignore
 */
function toggleFlag(bindings) {
    Mousetrap.bind(bindings, items.flag);
}
