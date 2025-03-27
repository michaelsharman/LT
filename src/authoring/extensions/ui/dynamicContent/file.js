import { updateDataTable } from './index';
import Papa from 'papaparse';

const state = {
    options: {},
};

export function setupCsvUpload(options) {
    state.options = options;

    const backButton = document.querySelector('.lt__btn-back');
    const continueButton = document.querySelector('[data-authorapi-selector="datatable-source-continue"]');
    const elAPIDataSourceHeader = document.querySelector('.lrn-author-datatable-header');
    const elHelpText = elAPIDataSourceHeader.querySelector('.lt-dynamic-content-help-text');
    const elDropzoneWrapper = document.createElement('div');
    const csvUploadTemplate = getCSVUploadTemplate();

    backButton.classList.remove('hidden');
    continueButton.setAttribute('disabled', '');
    elDropzoneWrapper.className = ['lt-file-dropzone-wrapper'].join(' ');
    elDropzoneWrapper.innerHTML = csvUploadTemplate;
    elAPIDataSourceHeader.insertAdjacentElement('afterend', elDropzoneWrapper);

    backButton.addEventListener('click', () => {
        elDropzoneWrapper.remove();
        backButton.remove();
        elHelpText.remove();
        continueButton.removeAttribute('disabled');

        const event = new CustomEvent('lt-csv-back');
        document.dispatchEvent(event);
    });

    setupFileListener();
}

/**
 * Sets up listeners for the CSV file upload component
 * @ignore
 */
function setupFileListener() {
    const dropArea = document.getElementById('lt-file-dropzone');
    const fileInput = document.getElementById('lt-fileinput');

    dropArea.addEventListener('dragover', event => {
        event.preventDefault();
        event.stopPropagation();
        dropArea.classList.add('dragover');
    });

    dropArea.addEventListener('dragleave', event => {
        dropArea.classList.remove('dragover');
    });

    dropArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        handleFile(fileInput.files[0]);
    });

    dropArea.addEventListener('drop', event => {
        event.preventDefault();
        dropArea.classList.remove('dragover');
        const files = event.dataTransfer.files;

        if (files.length > 0) {
            const file = files[0];
            handleFile(file);
        }
    });
}

/**
 * Opens the file uploaded by the user
 * @param {*} file
 * @ignore
 */
function handleFile(file) {
    const reader = new FileReader();

    reader.onload = event => {
        parseContent(event.target.result);
    };
    reader.readAsText(file);
}

/**
 * Converts the CSV to JSON and adds to the widget in
 * the `content` property, then calls the function
 * in the `complete` config property.
 * @param {string} csv
 * @ignore
 */
function parseContent(csv) {
    const backButton = document.querySelector('.lt__btn-back');
    const data = Papa.parse(csv.trim()).data;
    updateDataTable(data);
    backButton.click();
}

function getCSVUploadTemplate() {
    return `<div id="lt-file-dropzone" class="lt-file-dropzone">
        <input type="file" id="lt-fileinput" class="hidden">
        <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
            </svg>
        </p>
        <p>${state.options.labels.csvUploadLabel}</p>
    </div>
    `;
}
