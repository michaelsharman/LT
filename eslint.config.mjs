import globals from 'globals';
import pluginJs from '@eslint/js';

export default {
    files: ['src/**/*.js'],
    ignores: ['src/vendor/**'],
    languageOptions: { ecmaVersion: 2021, globals: globals.browser },
};
