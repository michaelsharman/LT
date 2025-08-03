import { appInstance } from '../../../core/app.js';
import logger from '../../../../utils/logger.js';
import { setObserver } from '../../../../utils/dom.js';
import 'active-table';
import { debounce } from 'lodash-es';
import Papa from 'papaparse';
import * as xlsx from 'xlsx/xlsx.mjs';

/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds an interactive table for users to author dynamic content.
 * Users can also upload a file to populate the table, and export any data
 * to work on it locally.
 *
 * Supported file types for import: csv, xls, xlsx, ods, and txt.
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/dynamicContent/screenshot.gif" alt="" width="660"></p>
 * @module Extensions/Authoring/dynamicContent
 */

const state = {
    activeObservers: new Set(),
    currentData: [],
    dataTable: null,
    defaultData: [
        ['var_1', 'var_2', 'var_3'],
        ['sample1', 'sample2', 'sample3'],
        ['', '', ''],
        ['', '', ''],
    ],
    elements: {},
    logPrefix: 'LT Dynamic Content: ',
    options: {
        labels: {
            btnContinue: 'Confirm',
            csvUploadHelp: `Add dynamic data to your item by typing directly into the table below. Or, import a file
            (csv, xls, xlsx, ods, and txt are supported).`,
            headerValidationHelp: `The header row must contain only lowercase letters, numbers, and underscores.
            Supports a maximum of 20 columns and 50 rows.`,
        },
    },
    renderedCss: false,
    useElementCache: false,
};

/**
 * Sets up a listener when the data table panel opens to inject
 * new behaviour to author dynamic content.
 * @example
 * import { LT } from '@caspingus/lt/authoring';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.dynamicContent.run();
 * @param {object=} options - Optional configuration.
 *  ```
 * {
    labels: {
        btnContinue: 'Confirm',
        csvUploadHelp: `Add dynamic data to your item by typing directly into the table below. Or, import a file
            (csv, xls, xlsx, ods, and txt are supported).`,
        headerValidationHelp: `The header row must contain only lowercase letters, numbers, and underscores.
            Hyphens are not allowed.`,
    }
}
 *```
 * @since 2.24.0
 */
export function run(options) {
    state.options = validateOptions(options);
    state.renderedCss || injectCSS();

    // Inject class for specificity
    const elLrnApi = document.querySelector('.lrn-author');
    elLrnApi.classList.add('lt__dynamicContent');

    // Needed for importing anything other than csv
    window.XLSX = xlsx;

    appInstance().on('navigate', checkForSetup);

    function checkForSetup() {
        setTimeout(() => {
            if (['items/:reference/settings/:tab', undefined].includes(appInstance().getLocation().route)) {
                const lastElement = appInstance().getLocation().location.split('/').pop();
                if (lastElement === 'data-table') {
                    setObserver('.lrn-author-datatable-editor', setup, {
                        dispatchEvent: false,
                        root: getElement('[data-tab-content="data-table"]'),
                        state: state,
                    });
                    setObserver('.lrn-author-datatable-preview', actionContinue, {
                        dispatchEvent: false,
                        root: getElement('[data-tab-content="data-table"]'),
                        state: state,
                    });
                }
            }
        }, 150);

        // Reset the state when an item is first rendered
        appInstance().on('render:item', () => {
            state.currentData = [];
            state.dataTable = null;
            state.elements = {};
        });
    }
}

/**
 * Add a new data table editing UI to the Author API
 * @since 2.24.0
 * @ignore
 */
export function setup() {
    const elAPIDataSource = getElement('.lrn-author-datatable-source');
    const elAPIDataSourceHeader = getElement('.lrn-author-datatable-header');
    const elContinueBtn = getElement('[data-authorapi-selector="datatable-source-continue"]');

    // Let any call page know when the data table has been rendered
    setObserver('#dynamic-content-table', () => {}, {
        dispatchEvent: true,
        name: 'lt:datatable:editor',
        root: getElement('[data-tab-content="data-table"]'),
        state: state,
    });

    if (elAPIDataSource) {
        const dataTableExists = getElement('#dynamic-content-table');

        if (!dataTableExists) {
            const existingData = document.querySelector('.CodeMirror').CodeMirror.getDoc().getValue();
            const elDataTable = getTableTemplate();

            elContinueBtn.textContent = state.options.labels.btnContinue;
            elAPIDataSourceHeader.insertAdjacentHTML('afterend', elDataTable);

            // Add help text
            if (state.options.labels.csvUploadHelp.length) {
                const elHelpText = document.createElement('p');
                elHelpText.className = 'lt-dynamic-content-help-text';
                elHelpText.textContent = state.options.labels.csvUploadHelp;
                elAPIDataSourceHeader.appendChild(elHelpText);
            }

            // Add validation help text for the header row
            if (state.options.labels.headerValidationHelp.length) {
                const elValidationText = document.createElement('p');
                elValidationText.className = 'lrn-author-message lrn-author-message-small lrn-author-message-info';
                elValidationText.textContent = state.options.labels.headerValidationHelp;
                elAPIDataSourceHeader.appendChild(elValidationText);
            }

            if (existingData.length) {
                state.currentData = Papa.parse(existingData.trim()).data;
            }
        }

        const dataTable = getElement('#dynamic-content-table');
        if (dataTable) {
            const currentData = state.currentData.length ? state.currentData : state.defaultData;
            const debouncedUpdateAPI = debounce(updateAPIDataTable, 200);
            const debouncedCheckHeader = debounce(checkHeader, 200);

            state.dataTable = dataTable;
            state.dataTable.updateData(currentData);
            state.dataTable.onDataUpdate = data => {
                debouncedUpdateAPI(data);
                debouncedCheckHeader(data);
            };

            elContinueBtn.addEventListener('click', actionContinue);
        } else {
            logger.error(`${state.logPrefix}Dynamic table element not found`);
        }
    } else {
        logger.error(`${state.logPrefix}Data element not found`);
    }
}

/**
 * Updates the default API code mirror with the new data
 * from the Active Table UI.
 * @param {array} data
 * @since 2.24.0
 * @ignore
 */
export function updateAPIDataTable(data) {
    const config = {
        delimiter: ',',
        escapeChar: '"',
        header: true,
        newline: '\r\n',
        quotes: true,
        quoteChar: '"',
        skipEmptyLines: 'greedy',
    };
    const csv = Papa.unparse(data, config);
    document.querySelector('.CodeMirror').CodeMirror.getDoc().setValue(csv);
    state.currentData = data;
}

/**
 * Validates the header row of the data table and updates it if needed.
 * The API doesn't like hyphens or invalid characters in the header row.
 * This function replaces hyphens with underscores and removes invalid characters.
 * It also converts the header row to lowercase.
 * @param {array} data
 * @since 2.24.0
 * @ignore
 */
function checkHeader(data) {
    // Replace hyphens and remove invalid characters from the header row (API doesn't like them)
    if (Array.isArray(data) && data.length) {
        for (const [i, cell] of data[0].entries()) {
            if (!/^[a-z0-9 _]+$/.test(cell)) {
                try {
                    state.dataTable.updateCell({
                        newText: cell
                            .replace(/-/g, '_')
                            .replace(/[^a-zA-Z0-9 _]/g, '')
                            .toLowerCase(),
                        rowIndex: 0,
                        columnIndex: i,
                    });
                } catch (error) {
                    // ActiveTable throws an error when you programmatically update the header cell.
                    if (error.message !== "Cannot read properties of undefined (reading 'settings')") {
                        logger.error(`${state.logPrefix}Error updating header cell: ${error}`);
                    }
                }
            }
        }
    }
}

/**
 * Fires when the API "Continue" button is clicked and adds a listener
 * to the edit button to continue the process.
 * @since 2.24.0
 * @ignore
 */
function actionContinue() {
    const elAPIDataSourceHeader = getElement('.lrn-author-datatable-header');
    elAPIDataSourceHeader.querySelector('.lrn-author-form-label-name').textContent = state.options.labels.headerLabel;

    setTimeout(() => {
        const elEditBtn = getElement('[data-authorapi-selector="datatable-preview-edit"]');
        if (elEditBtn) {
            elEditBtn.addEventListener('click', () => {
                setTimeout(() => {
                    elAPIDataSourceHeader.classList.add('hidden');
                    setup();
                }, 300);
            });
        } else {
            logger.error(`${state.logPrefix}Edit button not found`);
        }

        const elResetBtn = getElement('[data-authorapi-selector="datatable-preview-reset"]');
        elResetBtn.addEventListener('click', () => {
            if (elResetBtn.classList.contains('lrn-author-btn-confirm-active')) {
                setTimeout(() => {
                    state.currentData = [];
                    setup();
                }, 200);
            }
        });
    }, 300);
}

/**
 * Retrieves and element from the DOM, caches and returns it.
 * @param {string} selector
 * @returns {Element}
 * @since 2.24.0
 * @ignore
 */
function getElement(selector) {
    // Turned off caching for now because of React
    if (state.useElementCache && state.elements[selector]) {
        return state.elements[selector];
    }

    const el = document.querySelector(selector);
    if (el) {
        state.elements[selector] = el;
    }

    return el;
}

/**
 * The HTML needed to load the Active Table plugin.
 * FYI the Filter option doesn't work with dynamically loaded data.
 * @returns {string}
 * @since 2.24.0
 * @ignore
 */
function getTableTemplate() {
    const elSettingsContainer = document.querySelector('.lrn-author-item-settings-container');
    const dataTableHeight = elSettingsContainer.offsetHeight - 230 || 300;

    // We define customColumnTypes here (with changeTextFunc) to allow for custom
    // text processing, stripping surrounding double quotes from each data row cell
    // text on change.

    return `<active-table
        id='dynamic-content-table'
        allowduplicateheaders='false'
        availableDefaultColumnTypes='[]'
        customColumnTypes='[
            {
                "name": "api-column",
                "customTextProcessing": {
                    "changeTextFunc": "(cellText) => cellText.replace(/^\\"(.*)\\"$/, \\"$1\\")"
                }
            }
        ]'
        defaultColumnTypeName="api-column"
        displayHeaderIcons='true'
        dragcolumns='true'
        dragrows='true'
        draganddrop='true'
        enterkeymovedown='true'
        maxcolumns='20'
        maxrows='51'
        preserveNarrowColumns='true'
        spellcheck='false'
        stickyHeader='true'
        files='{
            "buttons": [
                {
                    "position": "top-left",
                    "order": 0,
                    "text": "Import",
                    "import": {
                        "formats": ["csv", "xls", "xlsx", "ods", "txt"]
                    },
                    "styles": {
                        "default":{
                            "backgroundColor":"#eaeaea",
                            "color":"#333"
                        },
                        "hover":{
                            "backgroundColor":"#d9d9d9",
                            "color":"#333"
                        }
                    }
                },
                {
                    "position": "top-left",
                    "order": 1,
                    "text": "Export",
                    "export": {
                        "formats": ["csv", "xlsx", "ods"]
                    },
                    "styles": {
                        "default":{
                            "backgroundColor":"#eaeaea"
                        },
                        "hover":{
                            "backgroundColor":"#d9d9d9"
                        }
                    }
                }
            ]
        }'
        tableStyle='{
            "borderRadius":"4px"
        }'
        overflow='{
            "maxHeight":"${dataTableHeight}px",
            "maxWidth":"481px"
        }'
        framecomponentsstyles='{
            "styles":{
                "default": {"backgroundColor": "#f5f5f5"},
                "hoverColors": {"backgroundColor": "#dedede"}
            },
            "inheritHeaderColors":false
        }'
        rowhoverstyles='{
            "style":{
                "backgroundColor":"#d6d6d630",
                "transitionDuration":"0.05s"
            }
        }'
    ></active-table>`;
}

/**
 * Validates user passed options and merges them with the default options.
 * @param {*} options
 * @since 2.24.0
 * @ignore
 */
export function validateOptions(options) {
    let opt = options || {};

    if (options && typeof options === 'object') {
        opt = { ...state.options, ...options };
    } else {
        opt = { ...state.options };
    }

    return opt;
}

/**
 * Injects the necessary CSS to the header
 * @since 2.24.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity dynamic content styles */
.lt__dynamicContent.lrn-author.lrn-author  {
    .lt-dynamic-content-help-text {
        font-size: 15.4px;
        line-height: 1.4em;
    }

    .lrn-author-datatable-footer {
        justify-content: space-between;
    }

    .lrn-author-api-react-container .lrn-author-item-settings .lrn-author-datatable-footer button:nth-child(2),
    .lrn-author-api-react-container .lrn-author-activity-labels .lrn-author-datatable-footer button:nth-child(2) {
        margin: 0 2px;
    }

    .lrn-author-api-react-container .lrn-author-item-settings,
    .lrn-author-api-react-container .lrn-author-activity-labels {
        .lrn-author-datatable-editor {
            .lrn-author-datatable-header {
                height: auto;
                padding-bottom: 0;
            }

            .lrn-author-datatable-source-wrapper {
                display: none;
            }
        }

        .lrn-author-datatable-header {
            label {
                display: none;
            }
        }
    }
}
`;

    elStyle.setAttribute('data-style', 'LT Dynamic Content');
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
