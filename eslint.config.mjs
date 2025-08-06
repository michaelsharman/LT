import globals from 'globals';
import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                __LT_VERSION__: 'readonly',
            },
        },
        plugins: {
            '@stylistic/js': stylistic,
        },
        rules: {
            '@stylistic/js/indent': ['error', 4, { SwitchCase: 1 }], // 4-space indent
            '@stylistic/js/semi': ['error', 'always'], // Always semicolons
            '@stylistic/js/quotes': ['error', 'single', { avoidEscape: true }], // Single quotes
            '@stylistic/js/object-curly-spacing': ['error', 'always'], // Spaces in `{ }`
            '@stylistic/js/space-before-function-paren': [
                'error',
                {
                    anonymous: 'never',
                    named: 'never',
                    asyncArrow: 'always', // allow `async () => {}` to have space
                },
            ],

            'array-bracket-spacing': ['error', 'never'],
            curly: 'error',
            'dot-notation': 'error',
            'no-case-declarations': 'off',
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-duplicate-imports': 'error',
            'no-empty': 'error',
            'no-eval': 'error',
            'no-extra-boolean-cast': 'off',
            'no-prototype-builtins': 'off',
            'no-return-await': 'error',
            'no-undef': 'error',
            'no-unused-vars': ['error'],
            'no-var': 'error',
            'prefer-arrow-callback': 'error',
            'prefer-const': 'error',
            'space-in-parens': ['error', 'never'],
        },
    },
    {
        files: ['src/**/*.js'],
    },
    {
        ignores: ['src/vendor/**', 'tests/**', 'docs/**', 'dist/**', 'vite.config.js'],
    },
];
