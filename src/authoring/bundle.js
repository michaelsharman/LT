/**
 * bundle.js is a "kitchen sink" file that will load everything when imported. The
 * core LT library, plus all extensions. Probably only use this for development
 * because of the size. In production, try importing core.js and any extensions
 * you might want separately.
 */

import { LT as core } from './core.js';

import * as contentTabs from './extensions/ui/contentTabs/index.js';
import * as createTags from './extensions/ui/createTags/index.js';
import * as dynamicContent from './extensions/ui/dynamicContent/index.js';
import * as essayMaxLength from './extensions/validation/essayMaxLength/index.js';
import * as imageUploader from './extensions/ui/imageUploader/index.js';
import * as languageTextDirection from './extensions/ui/languageTextDirection/index.js';
import * as nativeTabs from './extensions/ui/nativeTabs/index.js';
import * as requiredTags from './extensions/validation/requiredTags/index.js';
import * as renderPDF from './extensions/ui/renderPDF/index.js';
import * as singleQuestion from './extensions/validation/singleQuestion/index.js';

const extensions = {
    extensions: {
        contentTabs: { ...contentTabs },
        createTags: { ...createTags },
        dynamicContent: { ...dynamicContent },
        essayMaxLength: { ...essayMaxLength },
        imageUploader: { ...imageUploader },
        languageTextDirection: { ...languageTextDirection },
        nativeTabs: { ...nativeTabs },
        requiredTags: { ...requiredTags },
        renderPDF: { ...renderPDF },
        singleQuestion: { ...singleQuestion },
    },
};

export const LT = { ...core, ...extensions };
