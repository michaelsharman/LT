/**
 * Property-based test: CSS Collection and Injection
 *
 * **Validates: Requirements 1.3, 5.1, 5.2**
 *
 * Property 3: For any array of Extension_Modules where each has either a
 * getStyles() method returning a non-empty string or a styles property with
 * a non-empty string, the resulting injected <style#lt-extensions> element
 * SHALL contain all CSS strings concatenated in array order, each prefixed
 * with a comment identifying the extension name.
 */
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { runExtensions } from '../../src/utils/initExtensions.js';

function cleanupStyleElement() {
    const existing = document.head.querySelector('style#lt-extensions');
    if (existing) {
        existing.remove();
    }
}

beforeEach(() => {
    cleanupStyleElement();
});

afterEach(() => {
    cleanupStyleElement();
    vi.restoreAllMocks();
});

/**
 * Generate a valid CSS-like string (non-empty, avoids characters that cause
 * DOM parsing issues in happy-dom like angle brackets).
 */
const cssStringArb = fc.stringMatching(/^[a-zA-Z0-9 .#:;{}_\-,()]+$/).filter(s => s.trim().length > 0);

/**
 * Generate a unique extension name (alphanumeric with hyphens/underscores).
 */
const extNameArb = fc.stringMatching(/^[a-z][a-z0-9_-]{0,14}$/);

/**
 * CSS source type: either getStyles() method or styles property
 */
const cssSourceTypeArb = fc.constantFrom('getStyles', 'styles');

/**
 * Generate an Extension_Module with CSS capabilities.
 * Each module has a unique name, a no-op run(), and either getStyles() or styles.
 */
function extensionModuleWithCssArb(name) {
    return fc
        .record({
            cssSource: cssSourceTypeArb,
            css: cssStringArb,
        })
        .map(({ cssSource, css }) => {
            const mod = {
                name,
                run: () => {},
            };
            if (cssSource === 'getStyles') {
                mod.getStyles = () => css;
            } else {
                mod.styles = css;
            }
            return { module: mod, css, cssSource };
        });
}

/**
 * Generate an array of extension module descriptors, each with a unique name.
 */
const extensionArrayArb = fc
    .uniqueArray(extNameArb, { minLength: 1, maxLength: 8 })
    .chain(names => fc.tuple(...names.map(name => extensionModuleWithCssArb(name))));

describe('Property 3: CSS Collection and Injection', () => {
    test('injected style element contains all CSS in array order with name comment prefixes', async () => {
        await fc.assert(
            fc.asyncProperty(extensionArrayArb, async extensionDescriptors => {
                // Clean up from previous iteration
                cleanupStyleElement();

                const modules = extensionDescriptors.map(d => d.module);
                const LT = { extensions: {} };

                await runExtensions(LT, modules, 'assessment', {
                    collectCSS: true,
                    registry: null,
                });

                // Find the injected style element
                const styleEl = document.head.querySelector('style#lt-extensions');
                expect(styleEl).not.toBeNull();

                const injectedCSS = styleEl.textContent;

                // Verify each module's CSS is present with the comment prefix
                for (const descriptor of extensionDescriptors) {
                    const expectedPrefix = `/* ${descriptor.module.name} */`;
                    expect(injectedCSS).toContain(expectedPrefix);
                    expect(injectedCSS).toContain(descriptor.css.trim());
                }

                // Verify ordering: each extension's comment should appear before the next one
                for (let i = 0; i < extensionDescriptors.length - 1; i++) {
                    const currentPrefix = `/* ${extensionDescriptors[i].module.name} */`;
                    const nextPrefix = `/* ${extensionDescriptors[i + 1].module.name} */`;
                    const currentIndex = injectedCSS.indexOf(currentPrefix);
                    const nextIndex = injectedCSS.indexOf(nextPrefix);
                    expect(currentIndex).toBeLessThan(nextIndex);
                }
            }),
            { numRuns: 100 }
        );
    });

    test('modules without CSS (no getStyles or styles) do not contribute to style element', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc.uniqueArray(extNameArb, { minLength: 2, maxLength: 6 }).chain(names => {
                    // First half have CSS, second half don't
                    const midpoint = Math.ceil(names.length / 2);
                    const withCss = names.slice(0, midpoint);
                    const withoutCss = names.slice(midpoint);

                    return fc.tuple(
                        fc.tuple(...withCss.map(name => extensionModuleWithCssArb(name))),
                        fc.constant(
                            withoutCss.map(name => ({
                                module: { name, run: () => {} },
                                css: null,
                                cssSource: 'none',
                            }))
                        )
                    );
                }),
                async ([withCssDescriptors, withoutCssDescriptors]) => {
                    // Clean up from previous iteration
                    cleanupStyleElement();

                    // All modules in order: css modules first, then non-css
                    const allDescriptors = [...withCssDescriptors, ...withoutCssDescriptors];
                    const modules = allDescriptors.map(d => d.module);

                    const LT = { extensions: {} };

                    await runExtensions(LT, modules, 'assessment', {
                        collectCSS: true,
                        registry: null,
                    });

                    const styleEl = document.head.querySelector('style#lt-extensions');

                    if (withCssDescriptors.length > 0) {
                        expect(styleEl).not.toBeNull();
                        const injectedCSS = styleEl.textContent;

                        // CSS modules should be present
                        for (const descriptor of withCssDescriptors) {
                            expect(injectedCSS).toContain(`/* ${descriptor.module.name} */`);
                        }

                        // Non-CSS modules should NOT have comment entries
                        for (const descriptor of withoutCssDescriptors) {
                            expect(injectedCSS).not.toContain(`/* ${descriptor.module.name} */`);
                        }
                    }
                }
            ),
            { numRuns: 100 }
        );
    });
});
