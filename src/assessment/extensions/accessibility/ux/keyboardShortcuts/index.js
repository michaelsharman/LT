import * as platform from 'platform-detect';
import * as Mousetrap from 'mousetrap';
import { createExtension, LT } from '../../../../../utils/extensionsFactory.js';
import { isEmptyObject } from '../../../../../utils/validation.js';

/**
 * Enables keyboard shortcuts to perform an action against a question or on the assessment player.
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
 * @param {object=} options Object of configuration options.
 * @param {array=} options.global An array of global keyboard shortcuts.
 * @param {array=} options.item An array of item-specific keyboard shortcuts.
 *
 * @example
 * const options = {
 *      global: [
 *          {
 *              bindings: {
 *                  chromeos: ['ctrl+shift+v'],
 *                  macos: ['command+shift+v'],
 *                  windows: ['ctrl+shift+v'],
 *              },
 *              type: 'item.flag',
 *          },
 *          {
 *              bindings: {
 *                  chromeos: ['ctrl+alt+0'],
 *                  macos: ['command+option+0'],
 *                  windows: ['ctrl+alt+0'],
 *              },
 *              type: 'masking.enable',
 *          },
 *      ],
 *      item: [
 *          {
 *              bindings: {
 *                  chromeos: ['ctrl+shift+1', 'ctrl+shift+2', 'ctrl+shift+3', 'ctrl+shift+4', 'ctrl+shift+5', 'ctrl+shift+6'],
 *                  macos: ['command+ctrl+1', 'command+ctrl+2', 'command+ctrl+3', 'command+ctrl+4', 'command+ctrl+5', 'command+ctrl+6'],
 *                  windows: ['ctrl+shift+1', 'ctrl+shift+2', 'ctrl+shift+3', 'ctrl+shift+4', 'ctrl+shift+5', 'ctrl+shift+6'],
 *              },
 *              restrictTo: ['mcq'],
 *              type: 'response.set',
 *          },
 *          {
 *              bindings: {
 *                  chromeos: ['ctrl+alt+1', 'ctrl+alt+2', 'ctrl+alt+3', 'ctrl+alt+4', 'ctrl+alt+5', 'ctrl+alt+6'],
 *                  macos: ['command+option+1', 'command+option+2', 'command+option+3', 'command+option+4', 'command+option+5', 'command+option+6'],
 *                  windows: ['ctrl+alt+1', 'ctrl+alt+2', 'ctrl+alt+3', 'ctrl+alt+4', 'ctrl+alt+5', 'ctrl+alt+6'],
 *              },
 *              type: 'response.mask',
 *          },
 *      ],
 *  };
 *
 * LT.init(itemsApp, {
 *     extensions: [
 *         { id: 'keyboardShortcuts', args: options },
 *     ]
 * });
 *
 * @module Extensions/Assessment/keyboardShortcuts
 */

const state = {
    bound: false,
    effective: null,
    overrideDone: false,
    platform: null,
    supportedPlatforms: ['chromeos', 'macos', 'windows'],
};

/**
 * Sets up listeners to enable item or player keyboard shortcuts.
 * @param {object=} config A map of keyboard shortcut options.
 * @since 0.4.0
 * @ignore
 */
function run(config = getDefaultBindings()) {
    if (!state.platform) {
        state.platform = getPlatform();
    }

    if (!state.platform) {
        return;
    }

    if (!state.overrideDone) {
        overrideCallback();
        state.overrideDone = true;
    }

    if (!state.effective) {
        state.effective = buildEffectiveBindings(config, state.platform);
    }

    if (!state.bound) {
        bindAll(state.effective);
        state.bound = true;
    }
}

function bindAll(eff) {
    if (eff.global.itemFlag.length) {
        Mousetrap.bind(eff.global.itemFlag, onToggleFlag);
    }

    if (eff.global.maskingEnable.length) {
        Mousetrap.bind(eff.global.maskingEnable, onEnableMasking);
    }

    if (eff.item.responseSet.length) {
        Mousetrap.bind(eff.item.responseSet, onSetMcqOption);
    }

    if (eff.item.responseMask.length) {
        Mousetrap.bind(eff.item.responseMask, onSetResponseMask);
    }
}

function onToggleFlag() {
    LT.items.flag();
}

function onEnableMasking() {
    const q = LT.questions.questionInstance();
    if (!isEmptyObject(q) && typeof q.isMaskable === 'function' && q.isMaskable()) {
        LT.itemsApp().questionsApp().masking(!LT.items.isMaskingEnabled());
    }
}

function onSetMcqOption(e, combo) {
    const mcq = getSingleMcq();
    if (!mcq) {
        return;
    }

    const idx = extractLastDigit(combo);
    if (idx == null) {
        return;
    }

    if (Array.isArray(mcq.options) && mcq.options.length >= idx) {
        const wrapper = document.getElementById(mcq.response_id);
        if (!wrapper) {
            return;
        }
        const inputs = wrapper.querySelectorAll('.lrn-input');
        if (inputs && inputs[idx - 1]) {
            inputs[idx - 1].click();
        }
    }
}

function onSetResponseMask(e, combo) {
    if (!LT.items.isMaskingEnabled()) {
        return;
    }

    const mcq = getSingleMcq();
    if (!mcq) {
        return;
    }

    const idx = extractLastDigit(combo);
    if (idx == null) {
        return;
    }

    const root = LT.items.itemElement();
    if (!root) {
        return;
    }
    const optionsEls = root.querySelectorAll('.lrn-mcq-option');
    const optionEl = optionsEls && optionsEls[idx - 1];
    if (!optionEl) {
        return;
    }
    const maskBtn = optionEl.querySelector('.lrn-mask');
    if (maskBtn) {
        maskBtn.click();
    }
}

function extractLastDigit(combo) {
    const m = /(\d)$/.exec(combo);
    if (!m) {
        return null;
    }
    const n = Number(m[1]);
    return Number.isFinite(n) ? n : null;
}

function getSingleMcq() {
    const qs = LT.questions.questions();
    let mcq = null;

    for (const q of qs) {
        if (q && q.type === 'mcq') {
            if (mcq) {
                return null;
            }
            mcq = q;
        }
    }
    return mcq;
}

function buildEffectiveBindings(map, platformKey) {
    const eff = {
        global: {
            itemFlag: [],
            maskingEnable: [],
        },
        item: {
            responseSet: [],
            responseMask: [],
        },
    };

    if (map && Array.isArray(map.global)) {
        for (const entry of map.global) {
            if (!entry || !entry.type || !entry.bindings) {
                continue;
            }
            const combos = entry.bindings[platformKey] || [];
            if (!Array.isArray(combos) || combos.length === 0) {
                continue;
            }
            if (entry.type === 'item.flag') {
                eff.global.itemFlag.push(...combos);
            } else if (entry.type === 'masking.enable') {
                eff.global.maskingEnable.push(...combos);
            }
        }
    }

    if (map && Array.isArray(map.item)) {
        for (const entry of map.item) {
            if (!entry || !entry.type || !entry.bindings) {
                continue;
            }
            const combos = entry.bindings[platformKey] || [];
            if (!Array.isArray(combos) || combos.length === 0) {
                continue;
            }
            if (entry.type === 'response.set') {
                eff.item.responseSet.push(...combos);
            } else if (entry.type === 'response.mask') {
                eff.item.responseMask.push(...combos);
            }
        }
    }

    return eff;
}

function getPlatform() {
    for (const p of state.supportedPlatforms) {
        if (platform[p]) {
            return p;
        }
    }
    return null;
}

function overrideCallback() {
    Mousetrap.prototype.stopCallback = (e, element) => {
        const activeEl = document.activeElement;

        if (activeEl && (activeEl.getAttribute('type') === 'radio' || activeEl.getAttribute('type') === 'checkbox')) {
            return false;
        }

        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
            return false;
        }

        return (
            element.tagName === 'INPUT' ||
            element.tagName === 'SELECT' ||
            element.tagName === 'TEXTAREA' ||
            (element.contentEditable && element.contentEditable === 'true')
        );
    };
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

export const keyboardShortcuts = createExtension('keyboardShortcuts', run);
