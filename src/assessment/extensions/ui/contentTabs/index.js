import * as app from '../../../core/app.js';
import * as items from '../../../core/items.js';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Renders styles and responsive logic for LT content tabs.
 *
 * Pass in a theme option to change the look of the tabs.
 *
 * @module Extensions/Assessment/contentTabs
 */

const state = {
    options: {
        theme: 'api-column-tabs',
    },
    renderedCss: false,
    visitedItems: new Set(),
};

/**
 * @example
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.contentTabs.run();
 * @param {object=} options - Optional configuration object includes:
 *  - `theme` (string) Which tabs theme to load. Options are `rounded` (default) and `api-column-tabs`.
 * @since 2.19.0
 */
export function run(options) {
    state.options = validateOptions(options);
    state.renderedCss || (injectCSS(), (state.renderedCss = true));

    app.appInstance().on('item:load', () => {
        const itemReference = items.itemReference();

        if (!state.visitedItems.has(itemReference)) {
            const elItem = document.querySelector(`div[data-reference="${itemReference}"]`);
            const tabsContainer = elItem.querySelectorAll('ul.lt__nav-tabs');

            // Were tabs found on the item?
            if (tabsContainer) {
                for (const tabContainer of tabsContainer) {
                    // Make sure the first tab is active (fixing a hole in authoring)
                    tabContainer.querySelectorAll('li[role=tab]').forEach((list, index) => {
                        if (index === 0) {
                            list.classList.add('active');
                        } else {
                            list.classList.remove('active');
                        }
                    });

                    // Add the title value from the text label for responsive tooltips
                    tabContainer.querySelectorAll('a[data-tab-target]').forEach(anchor => {
                        if (!anchor.hasAttribute('title') || anchor.getAttribute('title') === '') {
                            const escapedText = escapeHTML(anchor.textContent.trim());
                            anchor.setAttribute('title', escapedText);
                        }
                    });
                }
            }

            state.visitedItems.add(itemReference);
        }
    });
}

/**
 * Replace special characters with HTML entities
 * @param {*} str
 * @returns String
 * @since 2.23.1
 * @ignore
 */
export function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;') // Escape `&`
        .replace(/</g, '&lt;') // Escape `<`
        .replace(/>/g, '&gt;') // Escape `>`
        .replace(/"/g, '&quot;') // Escape `"`
        .replace(/'/g, '&#39;'); // Escape `'`
}

/**
 * Validates user passed options and merges them with the default options.
 * @param {*} options
 * @since 2.19.0
 * @ignore
 */
export function validateOptions(options) {
    const validThemes = ['rounded', 'api-column-tabs'];
    let opt = options || {};

    if (options && typeof options === 'object') {
        opt = { ...state.options, ...options };
        if (!validThemes.includes(opt.theme)) {
            opt.theme = 'api-column-tabs';
        }
    } else {
        opt = { ...state.options };
    }

    return opt;
}

/**
 * Injects the necessary CSS to the header
 * @since 2.19.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = '/* Learnosity content tab styles */';

    elStyle.setAttribute('data-style', 'LT Content Tabs');
    elStyle.textContent = css.concat('\n', getTabsTheme(state.options.theme));
    document.head.append(elStyle);

    state.renderedCss = true;
}

/**
 * Appends the base CSS styles and the chosen theme for tabs
 * @param {String} theme
 * @returns String
 * @since 2.23.1
 * @ignore
 */
export function getTabsTheme(theme) {
    const base = `/* Base tabs styles */
        .lrn.lrn-assess .lt__tabs,
        .lrn-author-item-content-wrapper .lt__tabs {
            container-type: inline-size;

            .lt__nav-tabs {
                display: flex;
                box-shadow: none;
                flex-wrap: nowrap;
                overflow: hidden;
                padding-top: 1px;

                li {
                    flex: 0 1 auto; /* don't grow, but shrink if needed */
                    border: 1px solid var(--tab-border);
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    margin-right: 6px;
                    background-color: var(--bg-grey);
                    box-shadow: none;
                    min-width: 0;

                    a {
                        text-decoration: none;
                        font-weight: bold;
                        color: var(--tab-color);
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        display: block;
                        overflow: hidden;
                    }
                }

                li.active {
                    border-bottom: none;
                    background: var(--tab-bg-active);
                    color: var(--color-active);
                    border-bottom: none;
                }

                > li:after,
                .nav-tabs:after {
                    background: none;
                }
            }

            .lt__tab-content {
                border: 1px solid var(--tab-border);
                padding: 15px;
                margin-top: -1px; /* Fix for the tabs bottom border */

                .lt__guard {
                    user-select: none;
                    width: 0;
                    height: 0;
                    margin: 0;
                }

                .lt__tab-pane p:last-child {
                    margin-bottom: 0;
                }
            }

            .tab-content>.active {
                padding-top: 0;
            }
        }

        .lrn-author-item-content-wrapper .lt__tabs .lt__tab-pane {
            padding-top: 10px;
        }
    `;
    let themeCss = '',
        customProperties = '';

    switch (theme || state.options.theme) {
        case 'default':
        case 'api-column-tabs':
            customProperties = `
            /* API column tabs theme */
            :root {
                --tab-border: #d9d9d9;
                --tab-color: #333333;
            }`;
            themeCss = `
            .lrn.lrn-assess .lt__tabs {
                .lt__nav-tabs {
                    overflow: initial;

                    li {
                        border: none;

                        a {
                            text-decoration: none;
                            font-weight: normal;
                        }
                    }
                }

                .nav-tabs {
                    -webkit-box-shadow: 0 4px 2px -2px rgba(0, 0, 0, .2);
                    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, .2);
                    text-align: center;
                }

                .nav-tabs>li:after, .nav-tabs .nav-tab:after {
                    background: #1877b1;
                    border: none;
                    content: "";
                    display: block;
                    height: 2px;
                    outline: none;
                    transition: all .2s ease-in-out;
                    width: 100%;
                }

                .nav-tabs>li:focus-within {
                    outline: none;
                }

                .lt__tab-content {
                    border: none;
                    padding: 15px;
                    margin-top: -1px;
                }
            }`;
            break;

        case 'rounded':
            customProperties = `
            /* Rounded tabs theme */
            :root {
                --color-active: #333333;
                --customer-bg-blue: #e6f1ff;
                --bg-grey: #f0f0f0;
                --tab-bg-active: #ffffff;
                --tab-border: #d9d9d9;
                --tab-border-bottom: #eeeeee;
                --tab-color: inherit;
                --input-border: #898989;
            }`;
            break;

        default:
            break;
    }

    return customProperties.concat('\n', base, '\n', themeCss);
}
