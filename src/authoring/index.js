/**
 * index.js is a "kitchen sink" file that will load everything when imported. The
 * core LT library, plus all extensions. Probably only use this for development
 * because of the size. In production, try importing core.js and any extensions
 * you might want separately.
 */

import { LT as core } from './core';

import * as contentTabs from './extensions/ui/contentTabs/index';
import * as languageTextDirection from './extensions/ui/languageTextDirection/index';
import * as renderPDF from './extensions/ui/renderPDF/index';

const extensions = {
    extensions: {
        contentTabs: { ...contentTabs },
        languageTextDirection: { ...languageTextDirection },
        renderPDF: { ...renderPDF },
    },
};

export const LT = { ...core, ...extensions };
