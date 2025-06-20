import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import pkg from './package.json' assert { type: 'json' };
import postcss from 'postcss';
import postcssImport from 'postcss-import';

const writeVersionFile = () => ({
    name: 'write-version',
    buildStart() {
        const versionOut = path.resolve(__dirname, 'src/version.js');
        fs.writeFileSync(versionOut, `export const version = '${pkg.version}';\n`);
    },
});

function findAllStylesJS(dir, results = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            findAllStylesJS(fullPath, results);
        } else if (entry.isFile() && entry.name === 'styles.js') {
            results.push(fullPath);
        }
    }

    return results;
}

function inlineCSSPluginFromStylesJS() {
    const watchedFiles = new Set();
    const isBuild = process.env.NODE_ENV === 'production';

    async function buildBundle(stylesEntry) {
        const outputPath = path.join(path.dirname(stylesEntry), 'bundle.js');
        const raw = fs.readFileSync(stylesEntry, 'utf-8');

        const match = raw.match(/export const styles\s*=\s*`([\s\S]*?)`;/);
        if (!match) return;

        const cssContent = match[1];

        const result = await postcss([postcssImport()]).process(cssContent, {
            from: stylesEntry,
        });

        // Watch all imported CSS files
        result.messages
            .filter(msg => msg.type === 'dependency' && msg.file.endsWith('.css'))
            .forEach(msg => {
                if (!isBuild && !watchedFiles.has(msg.file)) {
                    fs.watchFile(msg.file, { interval: 100 }, async () => {
                        console.log(`[inline-css] CSS changed: ${msg.file}`);
                        await buildBundle(stylesEntry);
                    });
                    watchedFiles.add(msg.file);
                }
            });

        const escaped = result.css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${');

        const jsOut = `/* eslint-disable */\nexport const styles = \`\n${escaped}\n\`;\n`;
        fs.writeFileSync(outputPath, jsOut);
        console.log(`[inline-css] Wrote: ${outputPath}`);
    }

    function findAllStylesJS(dir, results = []) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                findAllStylesJS(fullPath, results);
            } else if (entry.name === 'styles.js') {
                results.push(fullPath);
            }
        }
        return results;
    }

    return {
        name: 'inline-css-from-styles-js',

        async buildStart() {
            const stylesFiles = findAllStylesJS(path.resolve(__dirname, 'src'));
            for (const file of stylesFiles) {
                await buildBundle(file);
            }
        },

        configureServer(server) {
            const stylesFiles = findAllStylesJS(path.resolve(__dirname, 'src'));

            for (const file of stylesFiles) {
                if (!watchedFiles.has(file)) {
                    fs.watchFile(file, { interval: 100 }, async () => {
                        console.log(`[inline-css] styles.js changed: ${file}`);
                        await buildBundle(file);
                    });
                    watchedFiles.add(file);
                }
            }

            console.log('[inline-css] Watching styles.js and imported CSS for changes');
        },
    };
}

const manualEntries = {
    'assessment/core': 'src/assessment/core.js',
    'assessment/index': 'src/assessment/index.js',
    'assessment/extensions/accessibility/ariaCountOnNav': 'src/assessment/extensions/accessibility/aria/ariaCountOnNav.js',
    'assessment/extensions/accessibility/columnResizer': 'src/assessment/extensions/accessibility/ux/columnResizer.js',
    'assessment/extensions/accessibility/hideAlternatives': 'src/assessment/extensions/accessibility/ux/hideAlternatives.js',
    'assessment/extensions/accessibility/keyboardShortcuts': 'src/assessment/extensions/accessibility/ux/keyboardShortcuts.js',
    'assessment/extensions/accessibility/magnifier': 'src/assessment/extensions/accessibility/ux/magnifier.js',
    'assessment/extensions/accessibility/mcqLabelPrefix': 'src/assessment/extensions/accessibility/ux/mcqLabelPrefix.js',
    'assessment/extensions/accessibility/pageOverlay': 'src/assessment/extensions/accessibility/ux/pageOverlay.js',
    'assessment/extensions/accessibility/resetResponse': 'src/assessment/extensions/accessibility/ux/resetResponse.js',
    'assessment/extensions/accessibility/toggleTimer': 'src/assessment/extensions/accessibility/ux/toggleTimer.js',
    'assessment/extensions/accessibility/whiteNoise': 'src/assessment/extensions/accessibility/ux/whiteNoise/index.js',
    'assessment/extensions/networkStatus': 'src/assessment/extensions/ui/networkStatus/index.js',
    'assessment/extensions/telemetry': 'src/assessment/extensions/telemetry/index.js',
    'assessment/extensions/ui/contentTabs': 'src/assessment/extensions/ui/contentTabs/index.js',
    'assessment/extensions/ui/renderPDF': 'src/assessment/extensions/ui/renderPDF/index.js',
    'assessment/extensions/themes/canvas': 'src/assessment/extensions/ui/themes/canvas/index.js',
    'assessment/extensions/themes/juniorQuest': 'src/assessment/extensions/ui/themes/juniorQuest/index.js',
    'assessment/extensions/themes/nextGen': 'src/assessment/extensions/ui/themes/nextGen/index.js',
    'assessment/extensions/validation/blockGrammarChecks': 'src/assessment/extensions/validation/blockGrammarChecks.js',
    'assessment/extensions/validation/checkAnswerValidation': 'src/assessment/extensions/validation/checkAnswerValidation.js',
    'assessment/extensions/validation/disableOnValidate': 'src/assessment/extensions/validation/disableOnValidate.js',
    'assessment/extensions/validation/essayLimitByCharacter': 'src/assessment/extensions/validation/essayLimitByCharacter.js',
    'authoring/core': 'src/authoring/core.js',
    'authoring/index': 'src/authoring/index.js',
};

const SRC_DIR = path.resolve(__dirname, '');
const entry = Object.fromEntries(Object.entries(manualEntries).map(([importPath, srcPath]) => [importPath, path.resolve(SRC_DIR, srcPath)]));

export default defineConfig({
    plugins: [writeVersionFile(), inlineCSSPluginFromStylesJS()],

    build: {
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
            output: {
                // preserveModules: true,
                // preserveModulesRoot: 'src',
            },
        },
    },
});
