import * as app from '../../../core/app';
import logger from '../../../../utils/logger';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import Compressor from '@uppy/compressor';
import ImageEditor from '@uppy/image-editor';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import spinner from './assets/spinner.svg';

/**
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * This extension replaces the default Learnosity image uploader with a custom image
 * uploader that supports image editing and compression before uploading to the
 * Learnosity CDN.
 *
 * Consider this extension if you're looking to reduce the file size of images or
 * if you want to give users the flexibility to crop or rotate them before uploading.
 *
 * Supported mime types: `image/gif`, `image/jpeg`, `image/png`, `image/svg+xml`
 *
 * .webp files are not supported by Learnosity, so we don't support them here.
 *
 * Animated gifs become static.
 *
 * By default, we resize images to a maximum width or height of 1500px. The calling
 * page can override `width`, `height`, and `quality`. See below in `run()`.
 *
 * <h2>Image comparisons (before and after)</h2>
 * <p>Click image to view full size.</p>
 * <table style="table-layout: auto; max-width: 1000px;">
 *  <thead>
 *    <tr>
 *      <th>Original</th>
 *      <th>Compressed</th>
 *      <th>File size reduction</th>
 *    </tr>
 *  </thead>
 *  <tr>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/original/20-preiodic-table-elements-icon-pack-design-vector-illustration_1142-18270.jpg" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/original/20-preiodic-table-elements-icon-pack-design-vector-illustration_1142-18270.jpg" width="200"></a>
 *          <br><code>205kB (2000x1589)</code></td>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/compressed-0.7-1500px/9e9324ea-19b0-4698-99e6-60b1bf42a883.jpg" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/compressed-0.7-1500px/9e9324ea-19b0-4698-99e6-60b1bf42a883.jpg" width="200"></a>
 *          <br><code>128kB (1500x1091)</code></td>
 *      </td>
 *      <td><code>37.56%</code></td>
 *  </tr>
 *  <tr>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/original/Colour_18-col_PT_with_labels.png" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/original/Colour_18-col_PT_with_labels.png" width="200"></a>
 *          <br><code>480kB (2584x1518)</code></td>
 *      </td>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/compressed-0.7-1500px/9f299c65-5032-47c7-b1ff-7cae16a5155b.png" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/compressed-0.7-1500px/9f299c65-5032-47c7-b1ff-7cae16a5155b.png" width="200"></a>
 *          <br><code>305kB (1500x881)</code></td>
 *      </td>
 *      <td><code>36.46%</code></td>
 *  </tr>
 *  <tr>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/original/Screenshot 2024-05-29 at 3.52.07 PM.png" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/original/Screenshot 2024-05-29 at 3.52.07 PM.png" width="200"></a>
 *          <br><code>16.5mb (5102x2488)</code>
 *      </td>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/compressed-0.7-1500px/714093c2-e0ae-429f-a540-c9991fa1ed31.png" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/compressed-0.7-1500px/714093c2-e0ae-429f-a540-c9991fa1ed31.png" width="200"></a>
 *          <br><code>155kB (1500x731)</code>
 *      </td>
 *      <td><code>99.06%</code></td>
 *  </tr>
 *  <tr>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/original/Screenshot 2024-05-29 at 3.53.09 PM.png" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/original/Screenshot 2024-05-29 at 3.53.09 PM.png" width="200"></a>
 *          <br><code>11.9mb (5098x2480)</code>
 *      </td>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/compressed-0.7-1500px/8f60995d-e1e3-44d0-b250-845e8929872c.png" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/compressed-0.7-1500px/8f60995d-e1e3-44d0-b250-845e8929872c.png" width="200"></a>
 *          <br><code>97kB (1500x729)</code></td>
 *      </td>
 *      <td><code>99.18%</code></td>
 *  </tr>
 *  <tr>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/original/thumb.gif" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/original/thumb.gif" width="200"></a>
 *          <br><code>4.7mb (770x702)</code>
 *      </td>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/compressed-0.7-1500px/3619d683-95ac-4890-895f-0b8ec61d43e9.gif" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUploader/compressed-0.7-1500px/3619d683-95ac-4890-895f-0b8ec61d43e9.gif" width="200"></a>
 *          <br><code>50kB (770x702)</code></td>
 *      </td>
 *      <td><code>98.94%</code></td>
 *  </tr>
 * </table>
 * <br>
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/imageUpload.gif" alt="" width="900"></p>
 * @module Extensions/Authoring/imageUploader
 */

const LOG_LEVEL = 'ERROR';

const state = {
    observer: null,
    observedElements: new Map(),
    renderedCss: false,
    options: {
        quality: 0.7,
        maxWidth: 1500,
        maxHeight: 1500,
    },
    upload: {
        request: null,
        security: null,
        uriUploadForm: checkUploadFormUri('https://authorapi.learnosity.com/latest-lts/assets/uploadform'),
    },
    uppy: null,
};

/**
 * Extension constructor. We require `security` and `request` from the Author API
 * initialisation to be passed in.
 * @example
 * import { LT } from '@caspingus/lt/src/authoring/core';
 * import * as imageUploader from '@caspingus/lt/src/authoring/extensions/ui/imageUploader/index';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 *
 * // Put individual extensions in the LT object if that makes your life easier
 * LT.extensions = {
 *     imageUploader,
 * };
 *
 * LT.extensions.imageUploader.run(security, request);
 * @since 2.10.0
 * @param {object} security The security object returned from the SDK.
 * @param {object} request The request object returned from the SDK.
 * @param {object=} options Override for `quality` (value between 0 and 1), `maxWidth` (number), and `maxHeight` (number).
 * Default values are `0.7`, `1500`, and `1500` respectively.
 */
export function run(security, request, options = {}) {
    if (!state.renderedCss) injectCSS();

    state.upload.security = security;
    state.upload.request = request;

    overrideOptions(options);

    if (validateRunParams()) app.appInstance().on('widgetedit:widget:ready', setupModalObserver);
}

/**
 * Listen for the Learnosity image upload modal to be ready.
 * @since 2.10.0
 * @ignore
 */
function setupModalObserver() {
    logger.debug('setupModalObserver()', LOG_LEVEL);

    const callback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const modal = document.querySelector('[data-authorapi-selector="asset-uploader-iframe-outlet"]');
                if (modal) {
                    logger.debug('Disconnecting observer', LOG_LEVEL);
                    state.observer.disconnect();
                    state.observedElements.clear();
                    setupUploderUI();
                    break;
                }
            }
        }
    };

    // Enable the observer if it's not already active
    if (!state.observedElements.size) {
        state.observer = new MutationObserver(callback);

        activateObserver();
    }
}

/**
 * Activates the mutation observer to watch for the
 * Learnosity image upload modal.
 * @since 2.10.0
 * @ignore
 */
function activateObserver() {
    const parentElement = document.querySelector('.lrn-author-item');

    if (!state.observedElements.has(parentElement)) {
        logger.debug('Activate observer', LOG_LEVEL);
        state.observer.observe(parentElement, { childList: true, subtree: true });
        state.observedElements.set(parentElement, state.observer);
    }
}

/**
 * Hides the Learnosity upload UI (iframe) and
 * injects the custom uploader.
 * @since 2.10.0
 * @ignore
 */
function setupUploderUI() {
    const lrnImageUploader = document.querySelector('[data-authorapi-selector="asset-uploader-iframe-outlet"]');
    const lrnFrame = lrnImageUploader.querySelector('iframe');
    const wrapper = document.createElement('div');
    const elMoreOptions = document.querySelector('.lrn-adv-options');

    lrnFrame.setAttribute('hidden', '');
    wrapper.setAttribute('id', 'uppy-dashboard');
    lrnImageUploader.insertAdjacentElement('afterbegin', wrapper);

    const modalParent = document.querySelector('.lrn-modal-dialog');
    prepareModalButtons(modalParent);

    elMoreOptions.removeAttribute('hidden');

    setupUploadLibrary();
}

/**
 * Initialises the library used for image management.
 * @since 2.10.0
 * @ignore
 */
function setupUploadLibrary() {
    state.uppy = new Uppy({
        debug: false,
        autoProceed: false,
        restrictions: { maxNumberOfFiles: 1, minNumberOfFiles: 1, allowedFileTypes: ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'] },
    })
        .use(Dashboard, {
            inline: true,
            width: 790,
            height: 350,
            autoOpen: null,
            disableStatusBar: true,
            target: '#uppy-dashboard',
            showProgressDetails: false,
            proudlyDisplayPoweredByUppy: false,
        })
        .use(Compressor, {
            quality: state.options.quality,
            convertSize: 500000,
            convertTypes: ['image/png'],
            maxHeight: state.options.maxHeight,
            maxWidth: state.options.maxWidth,
        })
        .use(ImageEditor, { target: Dashboard });

    state.uppy.on('file-added', file => {
        logger.debug(`file-added: ${file.source}`, LOG_LEVEL);
        const elMoreOptions = document.querySelector('.lrn-adv-options');
        elMoreOptions.setAttribute('hidden', '');

        if (file.source === 'Dashboard') {
            compressImage(file);
        }
    });

    state.uppy.on('file-removed', file => {
        logger.debug('file-removed', LOG_LEVEL);
        toggleElement('lt__image-uploader-upload-btn', 'remove');
    });

    state.uppy.on('file-editor:start', file => {
        logger.debug('file-editor:start', LOG_LEVEL);
        toggleElement('lt__image-uploader-upload-btn', 'disable');
    });

    state.uppy.on('file-editor:complete', updatedFile => {
        logger.debug('file-editor:complete', LOG_LEVEL);
        compressImage(updatedFile);
        toggleElement('lt__image-uploader-upload-btn', 'enable');
    });

    state.uppy.on('file-editor:cancel', updatedFile => {
        logger.debug('file-editor:cancel', LOG_LEVEL);
        toggleElement('lt__image-uploader-upload-btn', 'enable');
    });

    state.uppy.on('error', error => {
        logger.error(error.stack);
    });
}

/**
 * Compresses all images (except SVG)
 * @since 2.10.0
 * @ignore
 * @param {object} file
 */
function compressImage(file) {
    const name = file.name;
    const meta = file.meta;
    const type = file.type;

    // We don't try to compress SVGs
    if (type !== 'image/svg+xml') {
        logger.debug('Compressing image', LOG_LEVEL);
        state.uppy
            .getPlugin('Compressor')
            .compress(file.data)
            .then(compressedFile => {
                setTimeout(() => {
                    state.uppy.removeFile(file.id);
                    state.uppy.addFile({
                        name: name,
                        type: type,
                        meta: meta,
                        data: compressedFile,
                        source: 'Local',
                    });

                    const files = state.uppy.store.state.files;
                    let newFileId;
                    for (let file in files) {
                        newFileId = file;
                    }
                    addUploadButton(newFileId);
                }, 50);
            });
    } else {
        addUploadButton(file.id);
    }
}

/**
 * We add a custom upload button to the modal footer because
 * Uppy compresses on upload, meaning it happens twice.
 * @since 2.10.0
 * @ignore
 * @param {string} fileId
 */
function addUploadButton(fileId) {
    const elFooter = document.querySelector('.lrn-modal-footer');
    const elExistingUploadButton = document.querySelector('.lt__image-uploader-upload-btn');

    if (elExistingUploadButton) {
        logger.debug('Removing existing upload button', LOG_LEVEL);
        elExistingUploadButton.remove();
    }

    let elUploadButton = document.createElement('button');
    elUploadButton.setAttribute('class', 'lrn-btn lrn-btn-legacy lt__image-uploader-upload-btn');
    elUploadButton.textContent = 'Upload';
    elFooter.insertAdjacentElement('afterbegin', elUploadButton);
    elUploadButton.addEventListener('click', () => uploadImage(fileId));
}

/**
 * Uploads the image to Learnosity CDN.
 * First we get credentials and access tokens, then we upload.
 * @since 2.10.0
 * @ignore
 * @param {string} fileId
 */
function uploadImage(fileId) {
    const elUploadButton = document.querySelector('.lt__image-uploader-upload-btn');
    elUploadButton.removeEventListener('click', () => uploadImage(fileId));

    const elEditButton = document.querySelector('.uppy-Dashboard-Item-action--edit');
    if (elEditButton) elEditButton.setAttribute('disabled', '');

    return new Promise(async (resolve, reject) => {
        const file = state.uppy.getFile(fileId);

        // Add loading spinner
        const elButton = document.querySelector('.lt__image-uploader-upload-btn');
        elButton.innerHTML = `Uploading <span class="lt__upload-spinner"><img src="${spinner}"</span> `;

        // Make the first request to get access details
        const formData = new FormData();
        const request = {
            usrequest: { assetName: file.name, mimeType: file.type, fileType: 'image' },
            action: 'get',
            security: state.upload.security,
            request: state.upload.request,
        };
        formData.append('usrequest', JSON.stringify(request.usrequest));
        formData.append('action', request.action);
        formData.append('security', JSON.stringify(request.security));
        formData.append('request', JSON.stringify(request.request));

        const response = await fetch(state.upload.uriUploadForm, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Now we upload the image to the Learnosity CDN
        const uploadData = new FormData();
        uploadData.append('key', data.data.formInputs.key);
        uploadData.append('Content-Type', data.data.formInputs['Content-Type']);
        uploadData.append('X-Amz-Security-Token', data.data.formInputs['X-Amz-Security-Token']);
        uploadData.append('X-Amz-Credential', data.data.formInputs['X-Amz-Credential']);
        uploadData.append('X-Amz-Algorithm', data.data.formInputs['X-Amz-Algorithm']);
        uploadData.append('X-Amz-Date', data.data.formInputs['X-Amz-Date']);
        uploadData.append('Policy', data.data.formInputs.Policy);
        uploadData.append('X-Amz-Signature', data.data.formInputs['X-Amz-Signature']);
        uploadData.append('file', file.data);

        const uploadResponse = await fetch(data.data.formAttributes.action, {
            method: 'POST',
            body: uploadData,
        });

        if (!uploadResponse.ok) {
            throw new Error('Network response was not ok');
        } else {
            const assetUrl = data.data.assetUrl;
            const src = document.querySelector('[data-authorapi-selector="asset-uploader-source"]');
            src.value = assetUrl.trim();
            src.dispatchEvent(new Event('input', { bubbles: true }));

            setTimeout(() => {
                const modalParent = document.querySelector('.lrn-modal');
                prepareModalButtons(modalParent);
            }, 1500);
        }
    });
}

/**
 * Activates the mutation observer (listening for the image upload modal)
 * when the model is closed.
 * @since 2.10.0
 * @ignore
 * @param {object} modalParent
 */
function prepareModalButtons(modalParent) {
    const elCloseButtons = ['lrn-modal-button-close', 'lrn-btn-default', 'lrn-btn-primary-legacy'];

    for (let btn of elCloseButtons) {
        let elBtn = modalParent.querySelector(`.lrn-modal-dialog button.${btn}`);
        if (elBtn) {
            elBtn.addEventListener('click', clickHandler);
        }
    }

    function clickHandler() {
        logger.debug('clickHandler()', LOG_LEVEL);
        removeHandler();
        // Wait to set a click event for the modal to close
        // We don't want the observer firing while still open
        setTimeout(() => {
            activateObserver();
        }, 1000);
    }

    function removeHandler() {
        for (let btn of elCloseButtons) {
            let elBtn = modalParent.querySelector(`.lrn-modal-dialog button.${btn}`);
            if (elBtn) {
                logger.debug('Removed click event', LOG_LEVEL);
                elBtn.removeEventListener('click', clickHandler);
            }
        }
    }
}

/**
 * Checks for Author API upload form URI to see
 * if we're running in staging or production.
 * For Learnosity development only.
 * @since 2.10.0
 * @ignore
 * @param {string} uri
 * @returns {string}
 */
function checkUploadFormUri(uri) {
    const urlParams = new URLSearchParams(window.location.search);
    const domain = window.location.hostname;
    const env = urlParams.get('env');

    if (domain.includes('learnosity.com') && env === 'staging') {
        return uri.replace('authorapi.', 'authorapi.staging.');
    }

    return uri;
}

/**
 * Calling page can override certain compression options.
 * @since 2.10.0
 * @ignore
 * @param {object} options
 */
function overrideOptions(options) {
    if (options?.quality && typeof options.quality === 'number') state.options.quality = options.quality;
    if (options?.maxWidth && typeof options.maxWidth === 'number') state.options.maxWidth = options.maxWidth;
    if (options?.maxHeight && typeof options.maxHeight === 'number') state.options.maxHeight = options.maxHeight;
}

/**
 * Validates that the calling page passed `security` and `request`
 * to the `run()` method.
 * @since 2.10.0
 * @ignore
 * @returns {boolean}
 */
function validateRunParams() {
    if (!state.upload.security || !state.upload.request || typeof state.upload.security !== 'object' || typeof state.upload.request !== 'object') {
        logger.error('imageUploader extension failed to run - Missing/invalid security or request parameters');
        return false;
    }
    return true;
}

/**
 * Sets an action on an element.
 * @since 2.10.0
 * @ignore
 * @param {string} classname
 * @param {string} action
 */
function toggleElement(classname, action) {
    const el = document.querySelector(`.${classname}`);

    if (el) {
        if (action === 'disable') {
            el.setAttribute('disabled', '');
        } else if (action === 'enable') {
            el.removeAttribute('disabled');
        } else if (action === 'remove') {
            el.remove();
        }
    }
}

/**
 * Injects the necessary CSS to the header
 * @since 2.10.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity custom image uploader (DAM) */
/* Used to style content tabs added by via rich-text editor */
.lrn .lrn-author-ui-no-preview .uppy-c-btn,
.lrn .lrn-author-ui-no-preview button.uppy-c-btn {
    color: #fff;
}
.lrn .lrn-author-ui-no-preview button.uppy-Dashboard-browse {
    color: #1269cf;
}
.lrn .uppy-Dashboard-inner {
    margin-bottom: 15px;
}
.lrn .lrn-author-ui-no-preview .uppy-Dashboard-Item-actionWrapper button {
    color: inherit;
}
.lrn .uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload,
.lrn .uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload:hover {
    background-color: #1877b1;
}
.lrn .lrn-author-ui-no-preview button.lt__image-uploader-upload-btn {
    color: #fff;
    background: #1877b1;
}
.lrn .lrn-author-ui-no-preview button.lt__image-uploader-upload-btn[disabled],
.lrn .lrn-author-ui-no-preview button.lt__image-uploader-upload-btn[disabled]:hover,
.lrn .lrn-author-ui-no-preview button.lt__image-uploader-upload-btn[disabled]:focus {
    color: #d9d9d9;
    border-color: #96b7cb;
    background: #96b7cb;
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
