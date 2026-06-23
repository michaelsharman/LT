/**
 * Property 5: CSS Error Resilience
 *
 * For any Extension_Module whose `getStyles()` method throws an error, the system SHALL
 * log a warning for that module, skip its CSS contribution, and continue collecting CSS
 * from all remaining extensions without interruption.
 *
 * **Validates: Requirements 5.4**
 */
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';

// Mock the logger module so we can spy on logger.warn
vi.mock('../../src/utils/logger.js', () => ({
    default: {
        debug: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        log: vi.fn(),
        warn: vi.fn(),
    },
}));

let runExtensions;
let logger;

beforeEach(async () => {
    const initMod = await import('../../src/utils/initExtensions.js');
    runExtensions = initMod.runExtensions;

    const loggerMod = await import('../../src/utils/logger.js');
    logger = loggerMod.default;
});

afterEach(() => {
    // Clean up any style elements injected during tests
    const styleEl = document.head.querySelector('style#lt-extensions');
    if (styleEl) {
        styleEl.remove();
    }
    vi.restoreAllMocks();
});

/**
 * Arbitrary: generate a unique extension name (alphabetic, 3-10 chars)
 */
const extNameArb = fc.string({ minLength: 3, maxLength: 10, unit: fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'.split('')) });

/**
 * Arbitrary: generate a CSS string (non-empty, safe characters)
 */
const cssStringArb = fc
    .string({ minLength: 1, maxLength: 50, unit: fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz0123456789-.#{}: '.split('')) })
    .map(s => `.cls-${s.replace(/[^a-z0-9-]/g, '')} { color: red; }`);

/**
 * Arbitrary: generate a list of extension modules where some throw in getStyles()
 * Returns { modules, throwingIndices, normalIndices }
 */
const extensionListArb = fc
    .tuple(
        fc.integer({ min: 1, max: 8 }), // total count
        fc.integer({ min: 1, max: 4 }) // number of throwing extensions (min 1)
    )
    .chain(([total, throwCount]) => {
        const actualThrowCount = Math.min(throwCount, total);
        const normalCount = total - actualThrowCount;

        return fc
            .tuple(
                // Generate unique names for all extensions
                fc.uniqueArray(extNameArb, { minLength: total, maxLength: total }),
                // Generate CSS for normal extensions
                fc.array(cssStringArb, { minLength: normalCount, maxLength: normalCount }),
                // Generate positions for throwing extensions (indices 0..total-1)
                fc.uniqueArray(fc.integer({ min: 0, max: total - 1 }), { minLength: actualThrowCount, maxLength: actualThrowCount })
            )
            .map(([names, cssList, throwingPositions]) => {
                const throwingSet = new Set(throwingPositions);
                let normalIdx = 0;
                const modules = [];
                const throwingIndices = [];
                const normalIndices = [];
                const normalCssMap = new Map();

                for (let i = 0; i < total; i++) {
                    const name = names[i];
                    if (throwingSet.has(i)) {
                        // Extension whose getStyles() throws
                        modules.push({
                            name,
                            run: vi.fn(),
                            getStyles: () => {
                                throw new Error(`CSS error in ${name}`);
                            },
                        });
                        throwingIndices.push(i);
                    } else {
                        // Normal extension with valid CSS
                        const css = cssList[normalIdx] || `.${name} { display: block; }`;
                        normalIdx++;
                        modules.push({
                            name,
                            run: vi.fn(),
                            getStyles: () => css,
                        });
                        normalIndices.push(i);
                        normalCssMap.set(name, css);
                    }
                }

                return { modules, throwingIndices, normalIndices, normalCssMap };
            });
    });

describe('Property 5: CSS Error Resilience', () => {
    test('a warning is logged for each extension whose getStyles() throws, its CSS is skipped, and other CSS is collected', async () => {
        await fc.assert(
            fc.asyncProperty(extensionListArb, async ({ modules, throwingIndices, normalIndices, normalCssMap }) => {
                // Clean up from previous iteration
                const existingStyle = document.head.querySelector('style#lt-extensions');
                if (existingStyle) existingStyle.remove();
                logger.warn.mockClear();
                logger.error.mockClear();

                const LT = { extensions: {} };

                await runExtensions(LT, modules, 'assessment', {
                    collectCSS: true,
                    registry: null,
                });

                // 1. A warning was logged for each throwing extension
                const warnCalls = logger.warn.mock.calls;
                for (const idx of throwingIndices) {
                    const name = modules[idx].name;
                    const found = warnCalls.some(call => call.some(arg => typeof arg === 'string' && arg.includes(name)));
                    expect(found, `Expected warning for throwing extension "${name}"`).toBe(true);
                }

                // 2. The style element content should NOT contain CSS from throwing extensions
                // (throwing extensions don't produce CSS, so their name comment shouldn't appear as a CSS block)
                const styleEl = document.head.querySelector('style#lt-extensions');
                const injectedCSS = styleEl ? styleEl.textContent : '';

                for (const idx of throwingIndices) {
                    const name = modules[idx].name;
                    // The CSS comment prefix format is `/* name */\n<css>`
                    // Since getStyles() threw, there should be no CSS block for this extension
                    const cssBlockPattern = `/* ${name} */`;
                    expect(injectedCSS.includes(cssBlockPattern), `Throwing extension "${name}" CSS should NOT be in the style element`).toBe(false);
                }

                // 3. All non-throwing extensions' CSS IS present in the correct order
                if (normalIndices.length > 0) {
                    expect(styleEl, 'Style element should exist when normal extensions have CSS').not.toBeNull();

                    for (const idx of normalIndices) {
                        const name = modules[idx].name;
                        const expectedCSS = normalCssMap.get(name);
                        expect(injectedCSS.includes(`/* ${name} */`), `Normal extension "${name}" comment should be in the style element`).toBe(true);
                        expect(injectedCSS.includes(expectedCSS), `Normal extension "${name}" CSS should be in the style element`).toBe(true);
                    }

                    // Verify order: normal extensions appear in their original array order
                    const normalNames = normalIndices.map(i => modules[i].name);
                    let lastPos = -1;
                    for (const name of normalNames) {
                        const pos = injectedCSS.indexOf(`/* ${name} */`);
                        expect(pos).toBeGreaterThan(lastPos);
                        lastPos = pos;
                    }
                }
            }),
            { numRuns: 100 }
        );
    });
});
