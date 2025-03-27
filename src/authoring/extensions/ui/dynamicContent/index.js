import * as app from '../../../core/app';
import * as file from './file';
import logger from '../../../../utils/logger';
import { setObserver } from '../../../../utils/dom';
import Papa from 'papaparse';
import activeTable from 'active-table';

/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds the ability for authors to create tags (type:tag)
 * via the Author API if they don't yet exist in the item bank.
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/dynamicContent.gif" alt="" width="660"></p>
 * @module Extensions/Authoring/dynamicContent
 */

const state = {
    activeObservers: new Set(),
    currentData: [],
    dataTable: null,
    defaultData: [
        ['Heading1', 'Heading2', 'Heading3'],
        ['', '', ''],
    ],
    elements: {},
    logPrefix: 'LT Dynamic Content: ',
    options: {
        labels: {
            btnContinue: 'Confirm',
            csvUploadHelp: `The content added below will be available within the questions (or features) in this item.
            Uploading a CSV will replace any existing data in the table.`,
            csvUploadLabel: 'Drop CSV here',
            headerLabel: 'Add CSV data below',
        },
    },
    renderedCss: false,
};

/**
 * Sets up a listener when the tags panel opens to inject
 * new behaviour to create a tag type:tag.
 * @example
 * import { LT } from '@caspingus/lt/src/index';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.dynamicContent.run();
 * @since 2.22.0
 */
export function run(options) {
    state.options = validateOptions(options);
    state.renderedCss || injectCSS();

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

        document.addEventListener('lt-csv-back', setup);
    }
}

/**
 * Add a new data table editing UI to the Author API
 * @since 2.22.0
 * @ignore
 */
export function setup() {
    console.log('Setting up');

    // Noop if the CSV upload UI is already present
    if (getElement('.lt-file-dropzone-wrapper')) {
        return;
    }

    const elAPIDataSource = getElement('.lrn-author-datatable-source');
    const elAPIDataSourceHeader = getElement('.lrn-author-datatable-header');
    const elAPIDataSourceFooter = getElement('.lrn-author-datatable-footer');
    const elAPIDataWrapper = getElement('.lrn-author-datatable-source-wrapper');
    const elContinueBtn = getElement('[data-authorapi-selector="datatable-source-continue"]');

    if (elAPIDataSource) {
        const dataTableExists = getElement('#dynamic-content-table');

        if (!dataTableExists) {
            const csvButton = getButtonTemplate('csvUpload', 'lt__btn-upload-csv');
            const backButton = getButtonTemplate('back', 'lt__btn-back');
            const existingData = document.querySelector('.CodeMirror').CodeMirror.getDoc().getValue();
            const elDataTable = document.createElement('active-table');
            const elHelpText = document.createElement('p');
            const elSettingsContainer = document.querySelector('.lrn-author-item-settings-container');
            const dataTableHeight = elSettingsContainer.offsetHeight - 160 || 300;

            elContinueBtn.textContent = state.options.labels.btnContinue;
            elAPIDataSourceHeader.querySelector('.lrn-author-form-label-name').textContent = state.options.labels.headerLabel;
            elHelpText.className = 'lt-dynamic-content-help-text';
            elHelpText.textContent = state.options.labels.csvUploadHelp;
            elDataTable.id = 'dynamic-content-table';
            elDataTable.setAttribute('enterKeyMoveDown', 'true');
            elDataTable.setAttribute('allowDuplicateHeaders', 'false');
            elDataTable.setAttribute('maxColumns', '50');
            elDataTable.setAttribute('maxRows', '500');
            elDataTable.setAttribute('dragColumns', 'true');
            elDataTable.setAttribute('dragRows', 'true');
            elDataTable.setAttribute('dragAndDrop', 'true');
            elDataTable.setAttribute('files', '{"buttons": [{"import": true}, {"export": true}]}');

            elDataTable.setAttribute(
                'tableStyle',
                JSON.stringify({
                    borderRadius: '4px',
                    width: '100%',
                })
            );
            elDataTable.setAttribute(
                'overflow',
                JSON.stringify({
                    maxHeight: `${dataTableHeight}px`,
                    maxWidth: '100%',
                })
            );
            elDataTable.setAttribute(
                'frameComponentsStyles',
                JSON.stringify({
                    styles: {
                        default: { backgroundColor: '#f5f5f5' },
                        hoverColors: { backgroundColor: '#dedede' },
                    },
                    inheritHeaderColors: false,
                })
            );
            elDataTable.setAttribute(
                'rowHoverStyles',
                JSON.stringify({
                    style: { backgroundColor: '#d6d6d630', transitionDuration: '0.05s' },
                })
            );
            elDataTable.setAttribute(
                'stripedRows',
                JSON.stringify({
                    odd: { backgroundColor: '' },
                    even: { backgroundColor: '#ebebeb7a' },
                })
            );
            elAPIDataSourceHeader.insertAdjacentElement('afterend', elDataTable);

            if (existingData.length) {
                state.currentData = Papa.parse(existingData.trim()).data;
            }

            elAPIDataSourceHeader.appendChild(elHelpText);
            backButton.classList.add('hidden');
            elAPIDataSourceFooter.prepend(csvButton);
            elAPIDataSourceFooter.prepend(backButton);
            csvButton.addEventListener('click', () => {
                elDataTable.remove();
                csvButton.remove();
                file.setupCsvUpload(state.options);
            });
        }

        const dataTable = getElement('#dynamic-content-table');
        if (dataTable) {
            const currentData = state.currentData.length ? state.currentData : state.defaultData;

            elAPIDataWrapper.classList.add('hidden');
            elContinueBtn.addEventListener('click', actionContinue);
            dataTable.updateData(currentData);
            dataTable.onDataUpdate = data => {
                updateDataTable(data);
            };
        } else {
            logger.error(`${state.logPrefix}Dynamic table element not found`);
        }
    } else {
        logger.error(`${state.logPrefix}Data element not found`);
    }
}

/**
 * Updates the API code mirror with the new data
 * @since 2.24.0
 * @ignore
 * @param {array} data
 */
export function updateDataTable(data) {
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
    console.log('Continue action');

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
 */
function getElement(selector) {
    // Turned off caching for now because of React
    if (0 && state.elements[selector]) {
        return state.elements[selector];
    }

    const el = document.querySelector(selector);
    if (el) {
        state.elements[selector] = el;
    }

    return el;
}

function getButtonTemplate(type, classname = '') {
    const btn = document.createElement('button');
    const iconWrapper = document.createElement('span');
    let iconUpload, textNode;

    btn.type = 'button';
    btn.className = ['lds-btn', 'lds-btn-outline-primary', classname].join(' ');

    switch (type) {
        case 'csvUpload':
            // Create the icon element
            iconUpload = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="lt__icon" viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                `;

            iconWrapper.innerHTML = iconUpload;

            // Create text node
            textNode = document.createTextNode('Upload CSV');

            // Add the icon and text to the button
            btn.appendChild(iconWrapper);
            btn.appendChild(textNode);
            break;

        case 'back':
            // Create the icon element
            iconUpload = `
                <svg class="w-6 h-6 text-gray-800 dark:text-white lt__icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
                </svg>
                `;
            iconWrapper.innerHTML = iconUpload;

            // Create text node
            textNode = document.createTextNode('Back');

            // Add the icon and text to the button
            btn.appendChild(iconWrapper);
            btn.appendChild(textNode);
            break;

        default:
            break;
    }

    return btn;
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
 * @since 2.22.0
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

.lt-file-dropzone {
    height: 7rem;
    background-color: #f7f7f7;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 1.7em 1em 1em 1em;
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 10px;
    cursor: pointer;
    outline: 2px dashed #d9d9d9;
    outline-offset: -10px;
    -webkit-transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
    transition: outline-offset 0.15s ease-in-out, background-color 0.15s linear;
}

.lt-file-dropzone.dragover {
    background-color: #f4f3f3;
    outline: 1px solid #d9d9d9;
    outline-offset: -20px;
}

.lt-file-content textarea.form-control {
    color: #333;
    font-family: serif;
    font-size: 1rem;
    background-color: #fefefe;
}

.lt__contenttabs.lrn-author.lrn-author  {
    .lt__icon {
        vertical-align: text-bottom;
    }

    .lrn-author-datatable-footer {
        justify-content: space-between;
    }

    .lrn-author-api-react-container .lrn-author-item-settings .lrn-author-datatable-footer button:nth-child(2),
    .lrn-author-api-react-container .lrn-author-activity-labels .lrn-author-datatable-footer button:nth-child(2) {
        margin: 0 2px;
    }

    .lrn-author-api-react-container .lrn-author-item-settings .lrn-author-datatable-header,
    .lrn-author-api-react-container .lrn-author-activity-labels .lrn-author-datatable-header {
        height: auto;
    }
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
