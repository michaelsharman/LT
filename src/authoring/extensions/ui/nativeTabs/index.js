import * as app from '../../../core/app.js';
import logger from '../../../../utils/logger.js';
import { max } from 'lodash-es';

/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds the ability for authors to add more native column tabs
 * than is currently possible today in the Layout area.
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/nativeTabs/tabs.gif" alt="" width="860"></p>
 * @module Extensions/Authoring/nativeTabs
 */

const state = {
    columns: {
        numTabsLeft: 2,
        numTabsRight: 2,
    },
    dirty: false,
    logPrefix: 'LT Native Tabs: ',
    options: {
        maxTabs: 5,
    },
    renderedCss: false,
};

/**
 * Extension constructor.
 * @example
 * import { LT } from '@caspingus/lt/authoring';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.nativeTabs.run();
 * @since 2.26.0
 * @param {object=} options Override for `maxTabs` (value between 2 and 10). Default is 5.
 */
export function run(options = {}) {
    state.renderedCss || injectCSS();

    overrideOptions(options);

    // Reset state on item render
    app.appInstance().on('render:item', () => {
        state.columns.numTabsLeft = 2;
        state.columns.numTabsRight = 2;
        state.dirty = false;
    });
    app.appInstance().on('navigate', checkForSetup);
    // app.appInstance().on('itemsettings:applied', saveTabsToItem);

    function checkForSetup() {
        setTimeout(() => {
            if (['items/:reference/settings/:tab', 'items/:reference/settings', undefined].includes(app.appInstance().getLocation().route)) {
                const lastElement = app.appInstance().getLocation().location.split('/').pop();
                if (['layout', 'settings'].includes(lastElement)) {
                    setup();
                }
            }
        }, 100);
    }
}

/**
 * Injects an input field to choose number of tabs.
 * @since 2.26.0
 * @ignore
 */
function setup() {
    const elTabsWrapper1 = document.querySelector('[data-authorapi-selector="lrn-author-tabs-col1"]');
    const elTabsWrapper2 = document.querySelector('[data-authorapi-selector="lrn-author-tabs-col2"]');
    const elNumTabs1 = document.getElementById('lt__nativeTabs-col1');
    const elNumTabs2 = document.getElementById('lt__nativeTabs-col2');
    const elSettingsApply = document.querySelector('[data-authorapi-selector="lrn-author-apply-settings"]');
    const itemJson = app.appInstance().getItem();
    const numCurrentTabs = countTabs(itemJson.item.definition);

    state.columns.numTabsLeft = max([numCurrentTabs[0], state.columns.numTabsLeft]);
    state.columns.numTabsRight = max([numCurrentTabs[1], state.columns.numTabsRight]);

    if (elSettingsApply) {
        if (!elNumTabs1 && elTabsWrapper1) {
            elTabsWrapper1.querySelector('.lrn-author-layout-content').insertAdjacentHTML('beforeend', getNumTabsUI('col1', state.columns.numTabsLeft));
        }
        if (!elNumTabs2 && elTabsWrapper2) {
            elTabsWrapper2.querySelector('.lrn-author-layout-content').insertAdjacentHTML('beforeend', getNumTabsUI('col2', state.columns.numTabsRight));
        }

        setNumColumnsState();

        elSettingsApply.addEventListener('click', () => {
            saveTabsToItem(numCurrentTabs);
        });
    } else {
        logger.warn(`${state.logPrefix}Settings apply button not found`);
    }

    function getNumTabsUI(idSuffix, numTabs) {
        return `
            <label class="lrn-author-checkbox-label" for="lt__nativeTabs-${idSuffix}">
                <span class="label-full">Number of tabs</span>
                <span class="label-short">Num tabs</span>
            </label>
            <div class="lrn-form-group">
                <input id="lt__nativeTabs-${idSuffix}" class="lrn-author-form-control lt__nativeTabsInput" type="number" min="2" max="${state.options.maxTabs}" value="${numTabs}" class="lrn-form-control lt__width-sm">
            </div>
        `;
    }
}

/**
 * If the user changes the number of tabs in the UI,
 * we need to make sure the Apply button is enabled.
 * This is a workaround for the fact that the Apply button
 * is not enabled when the user changes the number of tabs.
 * @since 2.26.0
 * @ignore
 */
function checkApplyButtonEnabled() {
    if (state.dirty) {
        const elSettingsApply = document.querySelector('[data-authorapi-selector="lrn-author-apply-settings"]');

        if (elSettingsApply && elSettingsApply.disabled) {
            const elTabsEnabledLeft = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Left"]');
            const elTabsEnabledRight = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Right"]');

            // Toggle the checkbox to activate the Apply button

            if (elTabsEnabledLeft.checked) {
                elTabsEnabledLeft.click();
                elTabsEnabledLeft.click();
                return;
            }

            if (elTabsEnabledRight.checked) {
                elTabsEnabledRight.click();
                elTabsEnabledRight.click();
            }
        }
    }
}

/**
 * If the user unchecks the tabs enabled checkbox,
 * we need to (re)set the number of tabs to 2.
 * @since 2.26.0
 * @ignore
 */
function checkTabsEnabled() {
    const elTabsEnabledLeft = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Left"]');
    const elTabsEnabledRight = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Right"]');

    if (!elTabsEnabledLeft.checked) {
        state.columns.numTabsLeft = 2;
    }

    if (!elTabsEnabledRight.checked) {
        state.columns.numTabsRight = 2;
    }

    return {
        leftEnabled: elTabsEnabledLeft.checked,
        rightEnabled: elTabsEnabledRight.checked,
    };
}

/**
 * Returns the number of tabs on the item. Returns an array
 * of 2 elements, one for each column.
 * @param {object} root Item definition
 * @returns {array}
 * @since 2.26.0
 * @ignore
 */
function countTabs(root) {
    const result = [0, 0]; // Default to two columns, both with 0 tabs

    // Helper to count tabs in a nested region tree
    function countTabs(region) {
        let count = 0;

        function traverse(node) {
            if (Array.isArray(node)) {
                node.forEach(traverse);
            } else if (typeof node === 'object' && node !== null) {
                if (node.type === 'tab') {
                    count++;
                }

                for (const key in node) {
                    if (node.hasOwnProperty(key)) {
                        traverse(node[key]);
                    }
                }
            }
        }

        traverse(region);
        return count;
    }

    // Traverse first two columns only
    const columns = root.regions?.filter(r => r.type === 'column') || [];

    for (let i = 0; i < 2; i++) {
        if (columns[i]) {
            result[i] = countTabs(columns[i]);
        }
    }

    return result;
}

/**
 * Saves tab layout to item JSON
 * @since 2.26.0
 * @ignore
 */
function saveTabsToItem(numCurrentTabs) {
    const tabsEnabled = checkTabsEnabled();

    setTimeout(() => {
        const itemJson = app.appInstance().getItem();
        const currentDefinition = itemJson.item.definition;

        adjustTabs(0, state.columns.numTabsLeft, tabsEnabled.leftEnabled, numCurrentTabs[0], currentDefinition);
        adjustTabs(1, state.columns.numTabsRight, tabsEnabled.rightEnabled, numCurrentTabs[1], currentDefinition);

        itemJson.item.definition = currentDefinition;
        app.appInstance().setItemJson(itemJson);
    }, 100);

    function adjustTabs(columnIndex, tabCount, isEnabled, currentCount, currentDefinition) {
        if (tabCount >= 2 && isEnabled) {
            const tabRegions = currentDefinition.regions[columnIndex].regions[0].regions;

            if (tabCount < tabRegions.length) {
                const tabsToRemove = tabRegions.length - tabCount;
                // Before removing tabs, check if the tabs are empty.
                // If they are not, we need to move the content to another tab
                for (let i = tabRegions.length; i > tabRegions.length - tabsToRemove; i--) {
                    if (tabRegions[i - 1].hasOwnProperty('widgets')) {
                        if (tabRegions[0].hasOwnProperty('widgets')) {
                            tabRegions[0].widgets.push(tabRegions[i - 1].widgets);
                        } else {
                            tabRegions[0].widgets = tabRegions[i - 1].widgets;
                        }
                    }
                }
                tabRegions.splice(-tabsToRemove);
            } else {
                const startIndex = (currentCount || 2) + 1;
                for (let index = startIndex; index <= tabCount; index++) {
                    tabRegions.push({
                        label: `Tab ${index}`,
                        type: 'tab',
                    });
                }
            }
        }
    }
}

/**
 * Saves the UI number of tabs to internal state
 * so we can use it once the Apply button is clicked.
 * @since 2.26.0
 * @ignore
 */
function setNumColumnsState() {
    const elNumTabs1 = document.getElementById('lt__nativeTabs-col1');
    const elNumTabs2 = document.getElementById('lt__nativeTabs-col2');

    elNumTabs1.addEventListener('change', () => {
        state.columns.numTabsLeft = validateNumTabs(+elNumTabs1.value);
        state.dirty = true;
        checkApplyButtonEnabled();
    });
    elNumTabs2.addEventListener('change', () => {
        state.columns.numTabsRight = validateNumTabs(+elNumTabs2.value);
        state.dirty = true;
        checkApplyButtonEnabled();
    });
}

/**
 * Validates the number of tabs entered by the user.
 * If the number is less than 2, it returns 2.
 * If the number is greater than the maxTabs option, it returns maxTabs.
 * Otherwise, it returns the number entered by the user.
 * @param {number} num
 * @returns {number}
 * @since 2.26.0
 * @ignore
 */
function validateNumTabs(num) {
    if (num < 2) {
        return 2;
    } else if (num > state.options.maxTabs) {
        return state.options.maxTabs;
    }
    return num;
}

/**
 * Calling page can override certain options.
 * @since 2.26.0
 * @ignore
 * @param {object} options
 */
function overrideOptions(options) {
    ['maxTabs'].forEach(prop => {
        if (typeof options?.[prop] === 'number' && options?.[prop] >= 2 && options?.[prop] <= 10) {
            state.options[prop] = options[prop];
        }
    });
}

/**
 * Injects the necessary CSS to the header
 * @since 2.26.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity native tab styles */
.lrn .lrn-author-ui,
.lrn.lrn-author {
    .lrn-author-api-react-container .lrn-author-item-settings .lrn-author-layout-settings .lrn-author-layout-tab .lrn-author-layout-content,
    .lrn-author-api-react-container .lrn-author-activity-labels .lrn-author-layout-settings .lrn-author-layout-tab .lrn-author-layout-content {
        padding: 9px;
    }

    .lrn-form-control.lt__width-sm,
    .lrn-author-form-control.lt__nativeTabsInput {
        width: 80px;
    }

    .lrn-author-checkbox-label {
        padding-bottom: .5714285714em;
    }

    [data-authorapi-selector="lrn-author-tabs-col1"],
    [data-authorapi-selector="lrn-author-tabs-col2"] {
        .lrn-author-layout-content {
            container-type: inline-size;

            .label-short {
                display: none;
            }

            @container (max-width: 120px) {
                .label-full {
                    display: none;
                }

                .label-short {
                    display: inline;
                }
            }
        }
    }
}
`;

    elStyle.setAttribute('data-style', 'LT Native Tabs');
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
