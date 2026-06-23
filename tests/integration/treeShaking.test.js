import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixtureEntry = path.resolve(__dirname, 'fixtures/tree-shaking/entry.js');
const outDir = path.resolve(__dirname, 'fixtures/tree-shaking/.output');

// Extensions that are NOT imported in the fixture and should be absent from output
const unusedExtensions = [
    'whiteNoise',
    'readingMask',
    'blueLightFilter',
    'columnResizer',
    'hideAlternatives',
    'keyboardShortcuts',
    'mcqLabelPrefix',
    'networkStatus',
    'resetResponse',
    'toggleTimer',
    'renderPDF',
    'ariaCountOnNav',
    'blockGrammarChecks',
    'checkAnswerValidation',
    'disableOnValidate',
    'essayLimitByCharacter',
    'periodicTable',
];

// Unique string markers that would only appear if unused extensions leak into the output.
// These come from createExtension('name', ...) calls in each extension source file.
const unusedExtensionMarkers = [
    'readingMask',
    'blueLightFilter',
    'whiteNoise',
    'networkStatus',
    'periodicTable',
    'ariaCountOnNav',
    'keyboardShortcuts',
    'columnResizer',
];

/**
 * Recursively collect the entry chunk and all of its statically imported chunks.
 * Dynamic import() targets are excluded — they represent lazy loads that would
 * only execute at runtime and are NOT part of the tree-shaken static graph.
 */
function collectStaticDeps(entryFile, dir) {
    const visited = new Set();
    const files = [];

    function walk(filePath) {
        if (visited.has(filePath)) return;
        visited.add(filePath);

        const content = fs.readFileSync(filePath, 'utf-8');
        files.push({ name: path.basename(filePath), path: filePath, content });

        // Match static import declarations: import ... from "./chunk.js"
        const importRegex = /import\s+.*?\s+from\s+["'](\.[^"']+)["']/g;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
            const depPath = path.resolve(dir, match[1]);
            if (fs.existsSync(depPath)) {
                walk(depPath);
            }
        }
    }

    walk(entryFile);
    return files;
}

describe('Tree-shaking integration', () => {
    let allOutputFiles;
    let staticDepFiles;

    // Build the fixture once before all tests
    beforeAll(async () => {
        // Clean output directory
        if (fs.existsSync(outDir)) {
            fs.rmSync(outDir, { recursive: true });
        }

        // Build using lib mode with code splitting enabled (default).
        // The entry chunk + its static imports represent what would actually
        // ship in a consumer's bundle. Lazy chunks from dynamic import() in
        // getRegistry() are separate and would not be loaded at runtime when
        // using the direct import pattern.
        await build({
            root: path.resolve(__dirname, 'fixtures/tree-shaking'),
            logLevel: 'silent',
            build: {
                outDir,
                emptyOutDir: true,
                target: 'esnext',
                minify: false,
                lib: {
                    entry: fixtureEntry,
                    formats: ['es'],
                    fileName: 'entry',
                },
                rolldownOptions: {
                    treeshake: true,
                },
            },
        });

        // Collect all output JS files
        allOutputFiles = [];
        const readDir = dir => {
            if (!fs.existsSync(dir)) return;
            const entries = fs.readdirSync(dir, { withFileTypes: true });
            for (const ent of entries) {
                const fullPath = path.join(dir, ent.name);
                if (ent.isDirectory()) {
                    readDir(fullPath);
                } else if (ent.name.endsWith('.js') || ent.name.endsWith('.mjs')) {
                    allOutputFiles.push({
                        name: ent.name,
                        path: fullPath,
                        content: fs.readFileSync(fullPath, 'utf-8'),
                    });
                }
            }
        };
        readDir(outDir);

        // Collect only the entry + its statically imported dependencies
        const entryPath = path.join(outDir, 'entry.js');
        staticDepFiles = collectStaticDeps(entryPath, outDir);
    }, 60000); // Allow up to 60s for build

    afterAll(() => {
        // Clean up output directory
        if (fs.existsSync(outDir)) {
            fs.rmSync(outDir, { recursive: true });
        }
    });

    it('should produce output files', () => {
        expect(allOutputFiles.length).toBeGreaterThan(0);
        expect(staticDepFiles.length).toBeGreaterThan(0);
    });

    it('should contain code from imported extensions (magnifier and contentTabs)', () => {
        const staticContent = staticDepFiles.map(f => f.content).join('\n');

        // magnifier has HTMLMagnifier constructor and is registered via createExtension
        expect(staticContent).toContain('magnifier');
        // contentTabs has tab theme logic
        expect(staticContent).toContain('contentTabs');
    });

    it('should NOT contain code from unused extensions in the static dependency graph', () => {
        const staticContent = staticDepFiles.map(f => f.content).join('\n');

        for (const marker of unusedExtensionMarkers) {
            expect(staticContent, `Expected "${marker}" to be absent from static deps (indicates unused extension code leaked in)`).not.toContain(marker);
        }
    });

    it('should NOT have unused extension chunks statically imported by the entry', () => {
        // Get filenames that the entry statically depends on
        const staticFileNames = staticDepFiles.map(f => f.name.toLowerCase());

        for (const ext of unusedExtensions) {
            const found = staticFileNames.some(name => name.includes(ext.toLowerCase()));
            expect(found, `Static dependency "${ext}" found in entry's import chain — unused extension should not be statically referenced`).toBe(false);
        }
    });

    it('should NOT contain extensionsRegistry in the static dependency graph', () => {
        const staticContent = staticDepFiles.map(f => f.content).join('\n');

        // The extensionsRegistry module should not be statically imported by the entry
        expect(staticContent).not.toContain('extensionsRegistry');
    });
});
