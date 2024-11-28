/**
 * index.js is a "kitchen sink" file that will load everything when imported. The
 * core LT library, plus all extensions. Probably only use this for development
 * because of the size. In production, try importing core.js and any extensions
 * you might want separately.
 */

import { LT as core } from './core';

import * as contentTabs from './extensions/ui/contentTabs/index';
import * as createTags from './extensions/ui/createTags/index';
import * as essayMaxLength from './extensions/validation/essayMaxLength/index';
import * as imageUploader from './extensions/ui/imageUploader/index';
import * as languageTextDirection from './extensions/ui/languageTextDirection/index';
import * as renderPDF from './extensions/ui/renderPDF/index';
import * as singleQuestion from './extensions/validation/singleQuestion/index';
import * as ssmlEditor from './extensions/ui/ssmlEditor/index';

const extensions = {
    extensions: {
        contentTabs: { ...contentTabs },
        createTags: { ...createTags },
        essayMaxLength: { ...essayMaxLength },
        imageUploader: { ...imageUploader },
        languageTextDirection: { ...languageTextDirection },
        renderPDF: { ...renderPDF },
        singleQuestion: { ...singleQuestion },
        ssmlEditor: { ...ssmlEditor },
    },
};

export const LT = { ...core, ...extensions };
