import * as app from '../../../core/app';
import logger from '../../../../utils/logger';
import { setObserver } from '../../../../utils/dom';
import activeTable from 'active-table';
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
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/dynamicContent/screenshot.gif" alt="" width="660"></p>
 * @module Extensions/Authoring/dynamicContent
 */

const state = {
    activeObservers: new Set(),
    currentData: [],
    dataTable: null,
    defaultData: [
        ['Heading1', 'Heading2', 'Heading3'],
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
        },
    },
    renderedCss: false,
    useElementCache: false,
};

/**
 * Sets up a listener when the data table panel opens to inject
 * new behaviour to author dynamic content.
 * @example
 * import { LT } from '@caspingus/lt/src/index';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.dynamicContent.run();
 * @param {object=} options - Optional configuration.
 *  ```
 * {
    labels: {
        btnContinue: 'Confirm',
        csvUploadHelp: 'Add dynamic data to your item by typing directly into the table below. Or, import a file
            (csv, xls, xlsx, ods, and txt are supported).'
    }
}
 *```
 * @since 2.24.0
 */
export function run(options) {
    state.options = validateOptions(options);
    state.renderedCss || injectCSS();

    // Needed for importing anything other than csv
    window.XLSX = xlsx;

    app.appInstance().on('navigate', checkForSetup);

    function checkForSetup() {
        setTimeout(() => {
            if (['items/:reference/settings/:tab', undefined].includes(app.appInstance().getLocation().route)) {
                const lastElement = app.appInstance().getLocation().location.split('/').pop();
                if (lastElement === 'data-table') {
                    setObserver(
                        '.lrn-author-datatable-editor',
                        setup,
                        {
                            root: getElement('[data-tab-content="data-table"]'),
                        },
                        state
                    );
                    setObserver(
                        '.lrn-author-datatable-preview',
                        actionContinue,
                        {
                            root: getElement('[data-tab-content="data-table"]'),
                        },
                        state
                    );
                }
            }
        }, 150);

        // Reset the state when an item is first rendered
        app.appInstance().on('render:item', () => {
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

    if (elAPIDataSource) {
        const dataTableExists = getElement('#dynamic-content-table');

        if (!dataTableExists) {
            const existingData = document.querySelector('.CodeMirror').CodeMirror.getDoc().getValue();
            const elHelpText = document.createElement('p');
            const elDataTable = getTableTemplate();

            elContinueBtn.textContent = state.options.labels.btnContinue;
            elHelpText.className = 'lt-dynamic-content-help-text';
            elHelpText.textContent = state.options.labels.csvUploadHelp;
            elAPIDataSourceHeader.insertAdjacentHTML('afterend', elDataTable);
            elAPIDataSourceHeader.appendChild(elHelpText);

            if (existingData.length) {
                state.currentData = Papa.parse(existingData.trim()).data;
            }
        }

        const dataTable = getElement('#dynamic-content-table');
        if (dataTable) {
            const currentData = state.currentData.length ? state.currentData : state.defaultData;

            elContinueBtn.addEventListener('click', actionContinue);
            dataTable.updateData(currentData);
            dataTable.onDataUpdate = data => {
                updateAPIDataTable(data);
            };

            // Remove hyphens from header row (API doesn't like them)
            dataTable.onCellUpdate = cell => {
                if (cell.rowIndex === 0 && cell.text.includes('-')) {
                    dataTable.updateCell({
                        newText: cell.text.replace(/-/g, '_'),
                        rowIndex: cell.rowIndex,
                        columnIndex: cell.columnIndex,
                    });
                }
            };
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
        quotes: true,
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ',',
        header: true,
        newline: '\r\n',
        skipEmptyLines: false,
    };
    const csv = Papa.unparse(data, config);
    document.querySelector('.CodeMirror').CodeMirror.getDoc().setValue(csv);
    state.currentData = data;
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
    const dataTableHeight = elSettingsContainer.offsetHeight - 165 || 300;

    return `<active-table
        id='dynamic-content-table'
        enterkeymovedown='true'
        allowduplicateheaders='false'
        maxcolumns='25'
        maxrows='500'
        dragcolumns='true'
        dragrows='true'
        draganddrop='true'
        preserveNarrowColumns='true'
        spellcheck='false'
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
            "maxWidth":"480px"
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
.lrn.lrn-author .lrn-author-api-react-container .lrn-author-item-settings .tab-content,
.lrn.lrn-author .lrn-author-api-react-container .lrn-author-activity-labels .tab-content {
    max-width: 600px;
}

.lt__contenttabs.lrn-author.lrn-author  {
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

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
