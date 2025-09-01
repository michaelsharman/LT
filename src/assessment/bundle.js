/**
 * bundle.js is a "kitchen sink" file that will load everything when imported. The
 * core LT library, plus all extensions (excluding themes). Probably only use this
 * for development because of the size. In production, try importing core.js and
 * define any extensions you might want separately.
 */

import { LT as core } from './core.js';
import { EXTENSIONS } from '../utils/extensionsRegistry.js';

const ALL_ASSESSMENT_EXT_IDS = Object.freeze(
    Object.keys(EXTENSIONS.assessment || {}).sort() // sort for deterministic order
);

export const LT = {
    ...core,

    /**
     * LT.init(itemsApp, options?)
     *  - itemsApp: Learnosity Items API instance (object, required)
     *  - options: { extensions?: string[] }
     */
    async init(itemsApp, options = {}) {
        // Hard guard: first arg must be the Items API instance object
        if (typeof itemsApp !== 'object' || itemsApp === null) {
            throw new TypeError('LT.init(itemsApp, options): the first argument must be the Learnosity Items API instance object.');
        }

        // Extract options (second arg)
        const { extensions: userExtensions } = options || {};

        // If caller provides an array, use it; otherwise load all (minus disabled)
        const finalExtensions = Array.isArray(userExtensions) && userExtensions.length > 0 ? userExtensions : ALL_ASSESSMENT_EXT_IDS;

        // Delegate to core.init (which calls runExtensions with 'assessment')
        return core.init(itemsApp, {
            extensions: finalExtensions,
        });
    },
};
