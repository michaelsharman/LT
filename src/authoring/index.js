import * as app from './app';
import * as diagnostics from './diagnostics';
import * as navigation from './navigation';
import logger from '../utils/logger';

import * as contentTabs from './extensions/ui/contentTabs/index';
import * as languageTextDirection from './extensions/ui/languageTextDirection/index';

const utils = {
    utils: {
        logger,
    },
};

const extensions = {
    extensions: {
        contentTabs: { ...contentTabs },
        languageTextDirection: { ...languageTextDirection },
    },
};

export const LT = { ...app, ...diagnostics, ...navigation, ...utils, ...extensions };
