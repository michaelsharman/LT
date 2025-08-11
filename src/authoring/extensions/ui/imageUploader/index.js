import { appInstance } from '../../../core/app.js';
import { checkAppVersion } from '../../../utils/styling.js';
import logger from '../../../../utils/logger.js';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import Compressor from '@uppy/compressor';
import ImageEditor from '@uppy/image-editor';

import uppyCore from '@uppy/core/dist/style.min.css?inline';
import uppyDashboard from '@uppy/dashboard/dist/style.min.css?inline';
import uppyImageEditor from '@uppy/image-editor/dist/style.min.css?inline';

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
 * Supported mime types: `image/gif`, `image/jpeg`, `image/png`, `image/svg+xml`
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
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/original/periodic2.jpg" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/original/periodic2.jpg" width="200"></a>
 *          <br><code>205kB (2000x1589)</code></td>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/compressed-0.7-1500px/periodic2.jpg" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/compressed-0.7-1500px/periodic2.jpg" width="200"></a>
 *          <br><code>128kB (1500x1091)</code></td>
 *      </td>
 *      <td><code>37.56%</code></td>
 *  </tr>
 *  <tr>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/original/periodic1.png" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/original/periodic1.png" width="200"></a>
 *          <br><code>480kB (2584x1518)</code></td>
 *      </td>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/compressed-0.7-1500px/periodic1.png" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/compressed-0.7-1500px/periodic1.png" width="200"></a>
 *          <br><code>305kB (1500x881)</code></td>
 *      </td>
 *      <td><code>36.46%</code></td>
 *  </tr>
 *  <tr>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/original/scene2.png" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/original/scene2.png" width="200"></a>
 *          <br><code>16.5mb (5102x2488)</code>
 *      </td>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/compressed-0.7-1500px/scene2.png" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/compressed-0.7-1500px/scene2.png" width="200"></a>
 *          <br><code>155kB (1500x731)</code>
 *      </td>
 *      <td><code>99.06%</code></td>
 *  </tr>
 *  <tr>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/original/scene1.png" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/original/scene1.png" width="200"></a>
 *          <br><code>11.9mb (5098x2480)</code>
 *      </td>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/compressed-0.7-1500px/scene1.png" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/compressed-0.7-1500px/scene1.png" width="200"></a>
 *          <br><code>97kB (1500x729)</code></td>
 *      </td>
 *      <td><code>99.18%</code></td>
 *  </tr>
 *  <tr>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/original/thumb.gif" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/original/thumb.gif" width="200"></a>
 *          <br><code>4.7mb (770x702)</code>
 *      </td>
 *      <td>
 *          <a href="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/compressed-0.7-1500px/thumb.gif" target="blank"><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUploader/compressed-0.7-1500px/thumb.gif" width="200"></a>
 *          <br><code>50kB (770x702)</code></td>
 *      </td>
 *      <td><code>98.94%</code></td>
 *  </tr>
 * </table>
 * <br>
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/imageUpload.gif" alt="" width="900"></p>
 *
 * <h2>Exclusions</h2>
 * <p>This extension doesn't run inside the simple features dialog. This mainly impacts posters for video files and background images for audio files.</p>
 * @module Extensions/Authoring/imageUploader
 */

const state = {
    classNamePrefix: null,
    logPrefix: 'LT Image Uploader: ',
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
 * import { LT } from '@caspingus/lt/authoring';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.imageUploader.run(security, request);
 * @since 2.10.0
 * @param {object} security The security object returned from the SDK.
 * @param {object} request The request object returned from the SDK.
 * @param {object=} options Override for `quality` (value between 0 and 1), `maxWidth` (number), and `maxHeight` (number).
 * Default values are `0.7`, `1500`, and `1500` respectively.
 */
export function run(security, request, options = {}) {
    state.renderedCss || (injectCSS(), (state.renderedCss = true));

    state.upload.security = security;
    state.upload.request = request;

    overrideOptions(options);

    if (validateRunParams()) {
        appInstance().on('widgetedit:widget:ready', setupModalObserver);
    }
}

/**
 * Listen for the Learnosity image upload modal to be ready.
 * @since 2.10.0
 * @ignore
 */
function setupModalObserver() {
    logger.debug(`${state.logPrefix}setupModalObserver()`);

    state.classNamePrefix = checkAppVersion(state.classNamePrefix);
    clearObserver();

    const callback = mutationsList => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const modal = document.querySelector(
                    '[data-authorapi-selector="asset-uploader-iframe-outlet"]:not(.lrn-author-slide-pane [data-authorapi-selector="asset-uploader-iframe-outlet"]):not(.lrn-qe-slide-pane [data-authorapi-selector="asset-uploader-iframe-outlet"])'
                );
                const elResourceDisplayName = document.querySelector('[data-authorapi-selector="asset-display-name"]');
                if (modal && !elResourceDisplayName) {
                    logger.debug(`${state.logPrefix}Disconnecting observer`);
                    clearObserver();
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
    } else {
        logger.debug(`${state.logPrefix}Observed elements full`);
    }
}

/**
 * Activates the mutation observer to watch for the
 * Learnosity image upload modal.
 * @since 2.10.0
 * @ignore
 */
function activateObserver() {
    logger.debug(`${state.logPrefix}Looking to activate observer`);
    const parentElement = document.querySelector('.lrn-author-item');

    if (!state.observedElements.has(parentElement)) {
        logger.debug(`${state.logPrefix}Activated observer`);
        state.observer.observe(parentElement, { childList: true, subtree: true });
        state.observedElements.set(parentElement, state.observer);
    }
}

/**
 * Clears the modal observer and disconnects it.
 * @since 2.13.0
 * @ignore
 */
function clearObserver() {
    state.observer?.disconnect();
    state.observedElements.clear();
}

/**
 * Hides the Learnosity upload UI (iframe) and
 * injects the custom uploader.
 * @since 2.10.0
 * @ignore
 */
function setupUploderUI() {
    const elImageAlignment = document.querySelector('[data-authorapi-selector="asset-uploader-alignment"]');
    const elImagePreview = document.querySelector(`.lrn-${state.classNamePrefix}image-uploader-preview`);
    const timeoutValue = !elImageAlignment && !elImagePreview ? 0 : 500;

    /**
     * It looks like Question Editor reloads the modal after opening. It could be based on the
     * structure of the modal required, which changes depending on where you are.
     *
     * This function is called by an observer, but we need a timeout to ensure the final modal
     * is fully loaded before we add our custom uploader.
     */

    setTimeout(() => {
        const lrnImageUploader = document.querySelector('[data-authorapi-selector="asset-uploader-iframe-outlet"]');
        const lrnFrame = lrnImageUploader.querySelector('iframe');
        const elMoreOptions = document.querySelector(`.lrn-${state.classNamePrefix}adv-options`);
        const wrapper = document.createElement('div');

        wrapper.setAttribute('id', 'uppy-dashboard');
        lrnFrame.setAttribute('hidden', '');
        lrnImageUploader.insertAdjacentElement('afterbegin', wrapper);

        listenForSelfHostedImages();
        prepareModalButtons();

        elMoreOptions.removeAttribute('hidden');
        setupUploadLibrary();
    }, timeoutValue);
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
        logger.debug(`${state.logPrefix}file-added: ${file.source}`);
        const elMoreOptions = document.querySelector(`.lrn-${state.classNamePrefix}adv-options`);
        elMoreOptions.setAttribute('hidden', '');

        if (file.source === 'Dashboard') {
            compressImage(file);
        }
    });

    state.uppy.on('file-removed', () => {
        logger.debug(`${state.logPrefix}file-removed`);
        toggleElement('lt__image-uploader-upload-btn', 'remove');
    });

    state.uppy.on('file-editor:start', () => {
        logger.debug(`${state.logPrefix}file-editor:start`);
        toggleElement('lt__image-uploader-upload-btn', 'disable');
    });

    state.uppy.on('file-editor:complete', updatedFile => {
        logger.debug(`${state.logPrefix}file-editor:complete`);
        compressImage(updatedFile);
        toggleElement('lt__image-uploader-upload-btn', 'enable');
    });

    state.uppy.on('file-editor:cancel', () => {
        logger.debug(`${state.logPrefix}file-editor:cancel`);
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
        logger.debug(`${state.logPrefix}Compressing image`);
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
                    for (const file in files) {
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
    const elFooter = document.querySelector(`.lrn-${state.classNamePrefix}modal-footer`);

    removeUploadButton();

    const elUploadButton = document.createElement('button');
    const cssOldSuffix = state.classNamePrefix ? '-old' : '';
    elUploadButton.setAttribute(
        'class',
        `lrn-${state.classNamePrefix}btn${cssOldSuffix} lrn-${state.classNamePrefix}btn${cssOldSuffix}-legacy lt__image-uploader-upload-btn`
    );
    elUploadButton.textContent = 'Upload';
    elFooter.insertAdjacentElement('afterbegin', elUploadButton);
    elUploadButton.addEventListener('click', () => uploadImage(fileId));
}

/**
 * Removes the upload button from the UI when not needed.
 * @since 2.14.2
 * @ignore
 */
function removeUploadButton() {
    const elExistingUploadButton = document.querySelector('.lt__image-uploader-upload-btn');

    if (elExistingUploadButton) {
        logger.debug(`${state.logPrefix}Removing existing upload button`);
        elExistingUploadButton.remove();
    }
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
    elEditButton?.setAttribute('disabled', '');

    const file = state.uppy.getFile(fileId);

    // Add loading spinner and hide text
    const elButton = document.querySelector('.lt__image-uploader-upload-btn');
    elButton.setAttribute('style', 'width:105px;');
    elButton.innerHTML =
        '<span class="lt__upload-spinner"><svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_6kVp{transform-origin:center;animation:spinner_irSm .75s infinite linear}@keyframes spinner_irSm{100%{transform:rotate(360deg)};fill:#ffffff;}</style><path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" class="spinner_6kVp" style="fill: white"/></svg></span>';
    elButton.setAttribute('disabled', '');

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

    async function fetchTokens() {
        const response = await fetch(state.upload.uriUploadForm, {
            method: 'POST',
            body: formData,
        });
        return response.json();
    }

    fetchTokens()
        .then(response => {
            // Now we upload the image to the Learnosity CDN
            const uploadData = new FormData();
            uploadData.append('key', response.data.formInputs.key);
            uploadData.append('Content-Type', response.data.formInputs['Content-Type']);
            uploadData.append('X-Amz-Security-Token', response.data.formInputs['X-Amz-Security-Token']);
            uploadData.append('X-Amz-Credential', response.data.formInputs['X-Amz-Credential']);
            uploadData.append('X-Amz-Algorithm', response.data.formInputs['X-Amz-Algorithm']);
            uploadData.append('X-Amz-Date', response.data.formInputs['X-Amz-Date']);
            uploadData.append('Policy', response.data.formInputs.Policy);
            uploadData.append('X-Amz-Signature', response.data.formInputs['X-Amz-Signature']);
            uploadData.append('file', file.data);

            async function uploadImageToCDN() {
                const uploadImageResponse = await fetch(response.data.formAttributes.action, {
                    method: 'POST',
                    body: uploadData,
                });
                return uploadImageResponse;
            }

            uploadImageToCDN()
                .then(() => {
                    const assetUrl = response.data.assetUrl;
                    const src = document.querySelector('[data-authorapi-selector="asset-uploader-source"]');

                    src.value = assetUrl.trim();
                    src.dispatchEvent(new Event('input', { bubbles: true }));
                    logger.debug(`${state.logPrefix}Added image path to URI`);

                    setTimeout(() => {
                        removeUploadButton();
                        const btnReset = document.querySelector(
                            `.lrn-author-item .lrn-${state.classNamePrefix}delete-btn-wrapper [data-authorapi-action="asset-uploader-delete"]`
                        );
                        const elAltText = document.querySelector(
                            `.lrn-author-item .lrn-${state.classNamePrefix}image-uploader [data-authorapi-selector="asset-uploader-alignment"]`
                        );
                        if (btnReset && !elAltText) {
                            const btnOk = document.querySelector('[data-authorapi-selector="asset-uploader-okay"]');
                            if (btnOk) {
                                btnOk.click();
                                logger.debug(`${state.logPrefix}Clicked OK button for background images`);
                            }
                        }
                        prepareModalButtons();
                    }, 1500);
                })
                .catch(error => console.error('Error in uploading image:', error));
        })
        .catch(error => console.error('Error in fetching tokens:', error));
}

/**
 * Sets a listener for pasting self-hosted image URIs
 * @since 2.14.2
 * @ignore
 */
function listenForSelfHostedImages() {
    logger.debug(`${state.logPrefix}listenForSelfHostedImages()`);

    /**
     * It looks like Question Editor reloads the modal after opening. It could be based on the
     * structure of the modal required, which changes depending on where you are.
     *
     * This function is called by an observer, but we need a timeout to ensure the final modal
     * is fully loaded before we add our custom uploader.
     */

    setTimeout(() => {
        const src = document.querySelector('[data-authorapi-selector="asset-uploader-source"]');

        if (src) {
            src.addEventListener('input', handleSelfHostedImage);
        }
    }, 500);
}

/**
 * Event handler if an author add a self-hosted image URI
 * @since 2.14.2
 * @ignore
 */
function handleSelfHostedImage() {
    logger.debug(`${state.logPrefix}handleSelfHostedImage()`);
    setTimeout(() => {
        prepareModalButtons();
    }, 1500);
}

/**
 * Activates the mutation observer (listening for the image upload modal)
 * when the model is closed.
 * @since 2.10.0
 * @ignore
 * @param {object} modalParent
 */
function prepareModalButtons() {
    logger.debug(`${state.logPrefix}prepareModalButtons()`);
    const elCloseButtons = [
        `lrn-${state.classNamePrefix}modal-button-close`,
        `lrn-${state.classNamePrefix}btn-default`,
        `lrn-${state.classNamePrefix}btn-primary-legacy`,
        `lrn-${state.classNamePrefix}btn-sec`,
    ];
    const modalParent = document.querySelector(`.lrn-${state.classNamePrefix}modal`);

    removeHandler();

    // Waiting for footer buttons to appear so we can add click events
    function waitForElement(parentWrapper, selector, callback) {
        const observer = new MutationObserver((mutationsList, observer) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    const element = document.querySelector(selector);
                    if (element) {
                        callback(element);
                        observer.disconnect();
                    }
                }
            }
        });

        observer.observe(parentWrapper, { childList: true, subtree: true });

        // In case the element is already present when this function is called
        const initialCheck = document.querySelector(selector);
        if (initialCheck) {
            callback(initialCheck);
            observer.disconnect();
        }
    }

    setTimeout(() => {
        waitForElement(modalParent, `.lrn-${state.classNamePrefix}modal-footer .lrn-${state.classNamePrefix}delete-btn-wrapper`, () => {
            logger.debug(`${state.logPrefix}waitForElement() observed`);
            for (const btn of elCloseButtons) {
                const elBtn = modalParent.querySelector(`.lrn-${state.classNamePrefix}modal-dialog button.${btn}`);
                if (elBtn) {
                    elBtn.addEventListener('click', clickHandler);
                    logger.debug(`Adding clickHanders for: ${btn}`);
                    logger.debug(elBtn);
                }
            }
        });
    }, 100);

    function clickHandler() {
        logger.debug(`${state.logPrefix}clickHandler()`);
        removeHandler();
        // Wait to set a click event for the modal to close
        // We don't want the observer firing while still open
        setTimeout(() => {
            activateObserver();
        }, 1000);
    }

    function removeHandler() {
        for (const btn of elCloseButtons) {
            const elBtn = modalParent.querySelector(`.lrn-${state.classNamePrefix}modal-dialog button.${btn}`);
            if (elBtn) {
                logger.debug(`${state.logPrefix}Removed clickHandler`);
                elBtn.removeEventListener('click', clickHandler);
            }
        }

        const src = document.querySelector('[data-authorapi-selector="asset-uploader-source"]');
        if (src) {
            src.removeEventListener('input', handleSelfHostedImage);
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
    ['quality', 'maxWidth', 'maxHeight'].forEach(prop => {
        if (typeof options?.[prop] === 'number') {
            state.options[prop] = options[prop];
        }
    });
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
        logger.error(`${state.logPrefix}imageUploader extension failed to run - Missing/invalid security or request parameters`);
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
    const vendorCSS = [uppyCore, uppyDashboard, uppyImageEditor].join('\n');
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

.lrn .uppy-Dashboard-input[type=file] {
    display: none;
}
`;

    elStyle.setAttribute('data-style', 'LT Image Uploader');
    elStyle.textContent = `${vendorCSS}\n\n${css}`;
    document.head.append(elStyle);

    state.renderedCss = true;
}
