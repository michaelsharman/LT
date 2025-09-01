/**
 * bundle.js is a "kitchen sink" file that will load everything when imported. The
 * core LT library, plus all extensions (excluding themes). Probably only use this
 * for development because of the size. In production, try importing core.js and
 * define any extensions you might want separately.
 */

import { LT as core } from './core.js';
import { EXTENSIONS } from '../utils/extensionsRegistry.js';

const ALL_AUTHORING_EXT_IDS = Object.freeze(
    Object.keys(EXTENSIONS.authoring || {}).sort() // sort for deterministic order
);

export const LT = {
    ...core,

    /**
     * LT.init(authorApp, options?)
     *  - authorApp: Learnosity Author API instance (object, required)
     *  - options: { extensions?: string[], security?: object, request?: object }
     */
    async init(authorApp, options = {}) {
        // Hard guard: first arg must be the Author API instance object
        if (typeof authorApp !== 'object' || authorApp === null) {
            throw new TypeError('LT.init(authorApp, options): the first argument must be the Learnosity Author API instance object.');
        }

        // Extract options (second arg)
        const { extensions: userExtensions, security, request } = options || {};

        // If caller provides an array, use it; otherwise load all (minus disabled)
        const finalExtensions = Array.isArray(userExtensions) && userExtensions.length > 0 ? userExtensions : ALL_AUTHORING_EXT_IDS;

        // Delegate to core.init (which calls runExtensions with 'authoring')
        return core.init(authorApp, {
            extensions: finalExtensions,
            security,
            request,
        });
    },
};
