import * as app from '../../../core/app';
import * as items from '../../../core/items';

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
        theme: 'default',
    },
    renderedCss: false,
};

/**
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/core';
 * import * as contentTabs from '@caspingus/lt/src/assessment/extensions/ui/contentTabs/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * contentTabs.run();
 * @param {object=} options - Optional configuration object includes:
 *  - `theme` (string) Which tabs theme to load. Default is `default`. Also `rounded`.
 * @since 2.19.0
 */
export function run(options) {
    validateOptions(options);

    if (!state.renderedCss) injectCSS();

    app.appInstance().on('item:load', e => {
        const itemReference = items.itemReference();
        const elItem = document.querySelector(`div[data-reference="${itemReference}"]`);
        const tabsContainer = elItem.querySelectorAll('ul.lt__nav-tabs');

        // Were tabs found on the item?
        if (tabsContainer) {
            for (let tabContainer of tabsContainer) {
                const styleExists = tabContainer.getAttribute('style');
                if (!styleExists || !styleExists.includes('--tab-count')) {
                    const tabs = tabContainer.querySelectorAll('li');
                    tabContainer.style.setProperty('--tab-count', tabs.length);
                    tabContainer.querySelectorAll('a[data-tab-target]').forEach(anchor => {
                        if (!anchor.hasAttribute('title')) {
                            const escapedText = escapeHTML(anchor.textContent.trim());
                            anchor.setAttribute('title', escapedText);
                        }
                    });
                }
            }
        }
    });
}

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
    if (options && typeof options === 'object') {
        state.options = { ...state.options, ...options };
    }
}

/**
 * Injects the necessary CSS to the header
 * @since 2.19.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    let css = `/* Learnosity content tab styles */`;

    css += getTabsTheme();
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}

export function getTabsTheme() {
    let themeCss = '';

    switch (state.options.theme) {
        case 'default':
            themeCss = `
            /* Default theme */
            .lrn.lrn-assess .lt__tabs,
            .lrn-author-item-content-wrapper .lt__tabs {
                .lt__nav-tabs {
                    container-type: inline-size;
                    display: block;

                    li {
                        min-width: 0;

                        a {
                            text-decoration: none;
                            color: #333;
                            overflow: hidden;
                            max-width: 100px;
                            text-overflow: ellipsis;
                            display: inline-block;
                            white-space: nowrap;
                        }

                        @container (min-width: 200px) {
                            a {
                                max-width: calc(200px / var(--tab-count));
                            }
                        }
                        @container (min-width: 250px) {
                            a {
                                max-width: calc(240px / var(--tab-count));
                            }
                        }
                        @container (min-width: 300px) {
                            a {
                                max-width: calc(290px / var(--tab-count));
                            }
                        }
                        @container (min-width: 330px) {
                            a {
                                max-width: calc(320px / var(--tab-count));
                            }
                        }
                        @container (min-width: 400px) {
                            a {
                                max-width: calc(400px / var(--tab-count));
                            }
                        }
                        @container (min-width: 500px) {
                            a {
                                max-width: calc(550px / var(--tab-count));
                            }
                        }
                        @container (min-width: 600px) {
                            a {
                                max-width: calc(700px / var(--tab-count));
                            }
                        }
                        @container (min-width: 700px) {
                            a {
                                max-width: calc(1000px / var(--tab-count));
                            }
                        }
                        @container (min-width: 800px) {
                            a {
                                max-width: calc(1200px / var(--tab-count));
                            }
                        }
                    }
                }
            }

            .lrn-author-item-content-wrapper .lt__tabs .lt__tab-pane {
                padding-top: 10px;
            }`;
            break;

        case 'rounded':
            themeCss = `
            /* Rounded theme */
            :root {
                --color-active: #333333;
                --customer-bg-blue: #e6f1ff;
                --bg-grey: #f0f0f0;
                --tab-bg-active: #ffffff;
                --tab-border: #d9d9d9;
                --tab-border-bottom: #eeeeee;
                --input-border: #898989;
            }

            .lrn.lrn-assess .lt__tabs,
            .lrn-author-item-content-wrapper .lt__tabs {
                container-type: inline-size;

                .lt__nav-tabs {
                    display: flex;
                    flex-wrap: wrap;
                    box-shadow: none;

                    li {
                        border: 1px solid var(--tab-border);
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                        margin-right: 6px;
                        background-color: var(--bg-grey);
                        border-bottom: 1px solid var(--tab-border-bottom);
                        box-shadow: none;
                        min-width: 0;

                        .active {
                            border-bottom: none;
                            background: var(--tab-bg-active);
                            color: var(--color-active);
                        }

                        a {
                            text-decoration: none;
                            font-weight: bold;
                            color: inherit;

                            overflow: hidden;
                            max-width: 100px;
                            text-overflow: ellipsis;
                            display: inline-block;
                            white-space: nowrap;
                        }

                        @container (min-width: 200px) {
                            a {
                                max-width: calc(180px / var(--tab-count));
                            }
                        }
                        @container (min-width: 250px) {
                            a {
                                max-width: calc(210px / var(--tab-count));
                            }
                        }
                        @container (min-width: 300px) {
                            a {
                                max-width: calc(260px / var(--tab-count));
                            }
                        }
                        @container (min-width: 330px) {
                            a {
                                max-width: calc(290px / var(--tab-count));
                            }
                        }
                        @container (min-width: 400px) {
                            a {
                                max-width: calc(370px / var(--tab-count));
                            }
                        }
                        @container (min-width: 500px) {
                            a {
                                max-width: calc(550px / var(--tab-count));
                            }
                        }
                        @container (min-width: 600px) {
                            a {
                                max-width: calc(650px / var(--tab-count));
                            }
                        }
                        @container (min-width: 700px) {
                            a {
                                max-width: calc(900px / var(--tab-count));
                            }
                        }
                        @container (min-width: 800px) {
                            a {
                                max-width: calc(1000px / var(--tab-count));
                            }
                        }
                    }

                    li.active {
                        border-bottom: none;
                        background: var(--tab-bg-active);
                    }

                    > li:after,
                    .nav-tabs:after {
                        background: none;
                    }
                }

                .lt__tab-content {
                    border: 1px solid var(--tab-border);
                    padding: 15px;
                }
            }

            .lrn-author-item-content-wrapper .lt__tabs .lt__tab-pane {
                padding-top: 10px;
            }`;
            break;

        default:
            break;
    }

    return themeCss;
}
