import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import pkg from './package.json' assert { type: 'json' };
import { log } from 'console';

const manualEntries = {
    'assessment/core': 'src/assessment/core.js',
    'assessment/bundle': 'src/assessment/bundle.js',
    'assessment/extensions/ariaCountOnNav': 'src/assessment/extensions/accessibility/aria/ariaCountOnNav/index.js',
    'assessment/extensions/blockGrammarChecks': 'src/assessment/extensions/validation/blockGrammarChecks/index.js',
    'assessment/extensions/blueLightFilter': 'src/assessment/extensions/accessibility/ux/blueLightFilter/index.js',
    'assessment/extensions/checkAnswerValidation': 'src/assessment/extensions/validation/checkAnswerValidation/index.js',
    'assessment/extensions/columnResizer': 'src/assessment/extensions/accessibility/ux/columnResizer/index.js',
    'assessment/extensions/contentTabs': 'src/assessment/extensions/ui/contentTabs/index.js',
    'assessment/extensions/disableOnValidate': 'src/assessment/extensions/validation/disableOnValidate/index.js',
    'assessment/extensions/essayLimitByCharacter': 'src/assessment/extensions/validation/essayLimitByCharacter/index.js',
    'assessment/extensions/events': 'src/assessment/extensions/events/index.js',
    'assessment/extensions/hideAlternatives': 'src/assessment/extensions/accessibility/ux/hideAlternatives/index.js',
    'assessment/extensions/keyboardShortcuts': 'src/assessment/extensions/accessibility/ux/keyboardShortcuts/index.js',
    'assessment/extensions/magnifier': 'src/assessment/extensions/accessibility/ux/magnifier/index.js',
    'assessment/extensions/mcqLabelPrefix': 'src/assessment/extensions/accessibility/ux/mcqLabelPrefix/index.js',
    'assessment/extensions/networkStatus': 'src/assessment/extensions/ui/networkStatus/index.js',
    'assessment/extensions/readingMask': 'src/assessment/extensions/accessibility/ux/readingMask/index.js',
    'assessment/extensions/renderPDF': 'src/assessment/extensions/ui/renderPDF/index.js',
    'assessment/extensions/resetResponse': 'src/assessment/extensions/accessibility/ux/resetResponse/index.js',
    'assessment/extensions/toggleTimer': 'src/assessment/extensions/accessibility/ux/toggleTimer/index.js',
    'assessment/extensions/whiteNoise': 'src/assessment/extensions/accessibility/ux/whiteNoise/index.js',
    'assessment/extensions/resources/periodicTable': 'src/assessment/extensions/ui/resources/periodicTable/index.js',
    'assessment/extensions/themes/canvas': 'src/assessment/extensions/ui/themes/canvas/index.js',
    'assessment/extensions/themes/juniorQuest': 'src/assessment/extensions/ui/themes/juniorQuest/index.js',
    'assessment/extensions/themes/nextGen': 'src/assessment/extensions/ui/themes/nextGen/index.js',
    'authoring/core': 'src/authoring/core.js',
    'authoring/bundle': 'src/authoring/bundle.js',
    'authoring/extensions/contentTabs': 'src/authoring/extensions/ui/contentTabs/index.js',
    'authoring/extensions/createTags': 'src/authoring/extensions/ui/createTags/index.js',
    'authoring/extensions/dynamicContent': 'src/authoring/extensions/ui/dynamicContent/index.js',
    'authoring/extensions/essayMaxLength': 'src/authoring/extensions/validation/essayMaxLength/index.js',
    'authoring/extensions/imageUploader': 'src/authoring/extensions/ui/imageUploader/index.js',
    'authoring/extensions/languageTextDirection': 'src/authoring/extensions/ui/languageTextDirection/index.js',
    'authoring/extensions/nativeTabs': 'src/authoring/extensions/ui/nativeTabs/index.js',
    'authoring/extensions/requiredTags': 'src/authoring/extensions/validation/requiredTags/index.js',
    'authoring/extensions/renderPDF': 'src/authoring/extensions/ui/renderPDF/index.js',
    'authoring/extensions/singleQuestion': 'src/authoring/extensions/validation/singleQuestion/index.js',
    logger: 'src/utils/logger.js',
};

const SRC_DIR = path.resolve(__dirname, '');
const entry = Object.fromEntries(Object.entries(manualEntries).map(([importPath, srcPath]) => [importPath, path.resolve(SRC_DIR, srcPath)]));

export default defineConfig(({ command }) => {
    const isBuild = command === 'build';
    const isStats = process.env.npm_lifecycle_event === 'build:stats';
    const isTrace = process.env.npm_lifecycle_event === 'build:trace';

    return {
        build: {
            ...(isBuild
                ? {}
                : {
                      watch: {
                          include: 'src/**',
                          exclude: ['dist/**', 'docs/**', 'tests/**', 'node_modules/**', '**/version.js'],
                      },
                  }),
            target: 'esnext',
            outDir: 'dist',
            emptyOutDir: true,
            cssCodeSplit: false,

            lib: {
                entry,
                formats: ['es'],
                fileName: '[name]',
            },

            rollupOptions: {
                treeshake: true,
            },
        },
        define: {
            __LT_VERSION__: JSON.stringify(pkg.version),
        },
        plugins: [...(isTrace ? [traceModuleAnalysis()] : []), ...(isStats ? [visualizer({ open: true, filename: 'dist/stats.html' })] : [])],
    };
});

function traceModuleAnalysis() {
    return {
        name: 'trace-module-analysis',
        transform(code, id) {
            if (id.includes('node_modules')) {
                console.log('[trace-module-analysis]', id);
            }
            return null;
        },
    };
}
