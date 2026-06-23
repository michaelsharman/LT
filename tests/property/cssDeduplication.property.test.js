import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fc from 'fast-check';
import { runExtensions } from '../../src/utils/initExtensions.js';

/**
 * Property 4: CSS Deduplication by Name
 *
 * For any array of Extension_Modules where two or more entries share the same
 * `name` property, the injected CSS SHALL include only the CSS from the first
 * occurrence of that name, and subsequent occurrences with the same name SHALL
 * be skipped.
 *
 * **Validates: Requirements 5.3**
 */
describe('Property 4: CSS Deduplication by Name', () => {
    beforeEach(() => {
        document.head.innerHTML = '';
    });

    afterEach(() => {
        document.head.innerHTML = '';
    });

    /**
     * Generate a valid extension name (lowercase alphanumeric, 3+ chars).
     */
    const extNameArb = fc.stringMatching(/^[a-z][a-z0-9]{2,10}$/).filter(s => s.length >= 3);

    /**
     * Generate a unique CSS rule using an index-based marker to ensure uniqueness
     * and avoid substring collisions between different generated values.
     */
    function uniqueCssArb(marker) {
        return fc.nat({ max: 99999 }).map(n => `.${marker}-${n} { content: "${marker}-${n}"; }`);
    }

    it('should include CSS only from the first occurrence of each duplicate name', async () => {
        await fc.assert(
            fc.asyncProperty(
                // Generate 1-4 extension names, each with a first CSS and 1-3 duplicate CSS values
                fc
                    .array(extNameArb, { minLength: 1, maxLength: 4 })
                    .filter(names => new Set(names).size === names.length)
                    .chain(names => {
                        const groupArbs = names.map((name, idx) =>
                            fc
                                .tuple(uniqueCssArb(`first${idx}`), fc.array(uniqueCssArb(`dup${idx}`), { minLength: 1, maxLength: 3 }))
                                .map(([firstCss, dupCssList]) => ({
                                    name,
                                    firstCss,
                                    dupCssList,
                                }))
                        );
                        return fc.tuple(...groupArbs);
                    }),
                async groups => {
                    document.head.innerHTML = '';

                    // Build a flat array: for each group, first module then duplicates
                    const modules = [];
                    for (const group of groups) {
                        // First occurrence
                        modules.push({
                            name: group.name,
                            run: vi.fn(),
                            getStyles: () => group.firstCss,
                        });
                        // Duplicate occurrences with different CSS
                        for (const css of group.dupCssList) {
                            modules.push({
                                name: group.name,
                                run: vi.fn(),
                                getStyles: () => css,
                            });
                        }
                    }

                    const LT = { extensions: {} };

                    await runExtensions(LT, modules, 'assessment', {
                        collectCSS: true,
                        dedupeCSS: true,
                        registry: null,
                    });

                    const el = document.head.querySelector('style#lt-extensions');
                    const cssContent = el ? el.textContent : '';

                    // For each group:
                    for (const group of groups) {
                        // First occurrence CSS MUST be present
                        expect(cssContent).toContain(group.firstCss);

                        // Subsequent duplicates' CSS MUST NOT be present
                        for (const dupCss of group.dupCssList) {
                            expect(cssContent).not.toContain(dupCss);
                        }
                    }
                }
            ),
            { numRuns: 100 }
        );
    });

    it('should deduplicate by name even when duplicates are interleaved with other extensions', async () => {
        await fc.assert(
            fc.asyncProperty(
                fc
                    .tuple(
                        // Shared name for the duplicated extension
                        extNameArb,
                        // A unique name for an interleaving extension
                        extNameArb
                    )
                    .filter(([shared, unique]) => shared !== unique)
                    .chain(([sharedName, uniqueName]) =>
                        fc.tuple(
                            fc.constant(sharedName),
                            fc.constant(uniqueName),
                            // CSS for first occurrence of shared name
                            uniqueCssArb('shared-first'),
                            // CSS for duplicate occurrences (1-3 different CSS values)
                            fc.array(uniqueCssArb('shared-dup'), { minLength: 1, maxLength: 3 }),
                            // CSS for the unique extension
                            uniqueCssArb('unique')
                        )
                    ),
                async ([sharedName, uniqueName, firstCss, dupCssList, uniqueCss]) => {
                    document.head.innerHTML = '';

                    // Build: [first(shared)] [unique] [dup1(shared)] [dup2(shared)] ...
                    const modules = [
                        {
                            name: sharedName,
                            run: vi.fn(),
                            getStyles: () => firstCss,
                        },
                        {
                            name: uniqueName,
                            run: vi.fn(),
                            getStyles: () => uniqueCss,
                        },
                        ...dupCssList.map(css => ({
                            name: sharedName,
                            run: vi.fn(),
                            getStyles: () => css,
                        })),
                    ];

                    const LT = { extensions: {} };

                    await runExtensions(LT, modules, 'assessment', {
                        collectCSS: true,
                        dedupeCSS: true,
                        registry: null,
                    });

                    const el = document.head.querySelector('style#lt-extensions');
                    const cssContent = el ? el.textContent : '';

                    // First occurrence CSS MUST be present
                    expect(cssContent).toContain(firstCss);

                    // Unique extension CSS MUST be present
                    expect(cssContent).toContain(uniqueCss);

                    // Duplicate occurrences' CSS MUST NOT be present
                    for (const dupCss of dupCssList) {
                        expect(cssContent).not.toContain(dupCss);
                    }
                }
            ),
            { numRuns: 100 }
        );
    });
});
