/**
 * Unit tests for core.js and bundle.js entry points.
 * Validates tree-shakeable architecture: core has no registry import,
 * bundle passes _registry, and extension loading behavior is correct.
 *
 * Requirements: 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 8.2, 8.3
 */
import { describe, test, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../../');

// Helper to read source file content
function readSource(relativePath) {
    return readFileSync(resolve(ROOT, relativePath), 'utf-8');
}

describe('core.js - no static import of extensionsRegistry', () => {
    test('assessment/core.js does not statically import extensionsRegistry.js', () => {
        const source = readSource('src/assessment/core.js');
        expect(source).not.toMatch(/import\s+.*extensionsRegistry/);
    });

    test('authoring/core.js does not statically import extensionsRegistry.js', () => {
        const source = readSource('src/authoring/core.js');
        expect(source).not.toMatch(/import\s+.*extensionsRegistry/);
    });
});

describe('core.js - empty or omitted extensions produces empty LT.extensions', () => {
    test('assessment/core.js exports LT with an empty extensions object by default', async () => {
        const { LT } = await import('../../src/assessment/core.js');
        // Before init is called, LT.extensions should be an empty object
        expect(LT.extensions).toEqual({});
    });

    test('authoring/core.js exports LT with an empty extensions object by default', async () => {
        const { LT } = await import('../../src/authoring/core.js');
        // Before init is called, LT.extensions should be an empty object
        expect(LT.extensions).toEqual({});
    });
});

describe('bundle.js - passes _registry to core.init', () => {
    test('assessment/bundle.js source contains _registry: EXTENSIONS', () => {
        const source = readSource('src/assessment/bundle.js');
        expect(source).toMatch(/_registry:\s*EXTENSIONS/);
    });

    test('authoring/bundle.js source contains _registry: EXTENSIONS', () => {
        const source = readSource('src/authoring/bundle.js');
        expect(source).toMatch(/_registry:\s*EXTENSIONS/);
    });
});

describe('bundle.js - deterministic alphabetical ordering', () => {
    test('assessment/bundle.js sorts extension keys alphabetically', () => {
        const source = readSource('src/assessment/bundle.js');
        // Verify the bundle uses .sort() on the registry keys for deterministic order
        expect(source).toMatch(/Object\.keys\(.*\)\.sort\(\)/);
    });

    test('authoring/bundle.js sorts extension keys alphabetically', () => {
        const source = readSource('src/authoring/bundle.js');
        // Verify the bundle uses .sort() on the registry keys for deterministic order
        expect(source).toMatch(/Object\.keys\(.*\)\.sort\(\)/);
    });
});
