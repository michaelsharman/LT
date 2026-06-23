import { describe, it, expect, beforeAll } from 'vitest';
import { build } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../..');
const distDir = path.resolve(projectRoot, 'dist');

// Extension identifiers that are specific enough to only appear if extension code
// leaked into the core output. Generic names like 'events' or 'renderPDF' are excluded
// because they can legitimately appear in core validation/utility code.
const assessmentExtensionMarkers = [
    'ariaCountOnNav',
    'blockGrammarChecks',
    'blueLightFilter',
    'checkAnswerValidation',
    'columnResizer',
    'contentTabs',
    'disableOnValidate',
    'hideAlternatives',
    'keyboardShortcuts',
    'magnifier',
    'mcqLabelPrefix',
    'networkStatus',
    'periodicTable',
    'readingMask',
    'resetResponse',
    'toggleTimer',
    'whiteNoise',
];

const authoringExtensionMarkers = [
    'contentTabs',
    'createTags',
    'dynamicContent',
    'essayMaxLength',
    'languageTextDirection',
    'nativeTabs',
    'requiredTags',
    'singleQuestion',
];

/**
 * Read a core entry file and all its statically imported chunks.
 * Returns concatenated content of the entry + its static dependency graph.
 */
function collectStaticContent(entryPath) {
    const visited = new Set();
    const contents = [];

    function walk(filePath) {
        const resolved = path.resolve(path.dirname(entryPath), filePath);
        const normalised = fs.existsSync(resolved) ? resolved : filePath;

        if (visited.has(normalised)) return;
        if (!fs.existsSync(normalised)) return;
        visited.add(normalised);

        const content = fs.readFileSync(normalised, 'utf-8');
        contents.push(content);

        // Follow static imports (import ... from "...")
        const importRegex = /import\s+.*?\s+from\s+["'](\.[^"']+)["']/g;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
            const depPath = path.resolve(path.dirname(normalised), match[1]);
            if (fs.existsSync(depPath)) {
                walk(depPath);
            }
        }
    }

    walk(entryPath);
    return contents.join('\n');
}

describe('Build verification - dist output has no registry references', () => {
    let assessmentCoreContent;
    let authoringCoreContent;

    beforeAll(async () => {
        // Build the project if dist doesn't exist or is stale
        if (!fs.existsSync(path.join(distDir, 'assessment/core.js'))) {
            await build({
                root: projectRoot,
                logLevel: 'silent',
            });
        }

        // Collect the static dependency graph for each core entry
        assessmentCoreContent = collectStaticContent(path.join(distDir, 'assessment/core.js'));
        authoringCoreContent = collectStaticContent(path.join(distDir, 'authoring/core.js'));
    }, 120000);

    describe('assessment/core.js', () => {
        it('should not contain extensionsRegistry string', () => {
            expect(assessmentCoreContent).not.toContain('extensionsRegistry');
        });

        it('should not contain dynamic import() calls to extension module paths', () => {
            // Check for import() calls referencing extension directories
            const extensionImportPattern = /import\(\s*["'][^"']*extensions\/[^"']+["']\s*\)/g;
            const matches = assessmentCoreContent.match(extensionImportPattern);
            expect(matches, 'Found dynamic import() calls referencing extension paths in assessment/core.js static graph').toBeNull();
        });

        it('should not contain extension identifier strings as literal values', () => {
            for (const id of assessmentExtensionMarkers) {
                const pattern = new RegExp(`["']${id}["']`);
                expect(pattern.test(assessmentCoreContent), `Found extension identifier "${id}" as a string literal in assessment/core.js static graph`).toBe(
                    false
                );
            }
        });
    });

    describe('authoring/core.js', () => {
        it('should not contain extensionsRegistry string', () => {
            expect(authoringCoreContent).not.toContain('extensionsRegistry');
        });

        it('should not contain dynamic import() calls to extension module paths', () => {
            const extensionImportPattern = /import\(\s*["'][^"']*extensions\/[^"']+["']\s*\)/g;
            const matches = authoringCoreContent.match(extensionImportPattern);
            expect(matches, 'Found dynamic import() calls referencing extension paths in authoring/core.js static graph').toBeNull();
        });

        it('should not contain extension identifier strings as literal values', () => {
            for (const id of authoringExtensionMarkers) {
                const pattern = new RegExp(`["']${id}["']`);
                expect(pattern.test(authoringCoreContent), `Found extension identifier "${id}" as a string literal in authoring/core.js static graph`).toBe(
                    false
                );
            }
        });
    });
});
