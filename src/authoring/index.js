import * as app from './app';
import * as diagnostics from './diagnostics';
import * as logger from '../utils/logger';

import * as createTags from './extensions/ui/createTags';

const extensions = {
    extensions: {
        createTags: { ...createTags },
    },
};
export const LT = { ...app, ...diagnostics, ...logger, ...extensions };
