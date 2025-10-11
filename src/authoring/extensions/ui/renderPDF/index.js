import { renderPDF as renderPDFAssessment } from '../../../../assessment/extensions/ui/renderPDF/index.js';
import { checkAppVersion } from '../../../utils/styling.js';
import { createExtension, LT } from '../../../../utils/extensionsFactory.js';

/**
 * <h4 class="name">############ Incomplete - DO NOT USE</h4>
 *
 * Extensions add specific functionality to Learnosity APIs.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds the ability for authors to choose whether uploaded (PDF)
 * resources should be rendered to the learner on the front-end.
 *
 * @example
 * LT.init(authorApp, {
 *     extensions: ['renderPDF'],
 * });
 *
 * @module Extensions/Authoring/renderPDF
 */

const state = {
    classNamePrefix: null,
};

/**
 * Extension constructor.
 * @since 2.2.0
 * @ignore
 */
function run() {
    state.classNamePrefix = checkAppVersion(state.classNamePrefix);

    LT.authorApp().on('render:item', () => {
        doRenderPDF(document.querySelector('.lrn-author-item-content-wrapper'));
    });

    LT.authorApp().on('widgetedit:preview:changed', () => {
        doRenderPDF(document.querySelector('.lrn-question-preview'));
    });
}

/**
 * Uses the native viewer to render any resource PDFs in iframes.
 * @since 2.2.0
 * @ignore
 */
function doRenderPDF(elParent) {
    if (!elParent) {
        return;
    }

    const resources = elParent.querySelectorAll('.lrn_widget .resource');
    if (!resources.length) {
        return;
    }

    resources.forEach(resource => {
        const anchor = resource.querySelector('a');
        if (!anchor) {
            return;
        }

        const url = anchor.getAttribute('href') || '';
        if (!url.toLowerCase().endsWith('.pdf')) {
            return;
        }

        if (resource.dataset.ltRenderedPdf === '1') {
            return;
        }

        resource.dataset.ltRenderedPdf = '1';
        renderPDFAssessment.mountNativePdf(resource, url);
    });
}

/**
 * Adds a checkbox to the resource upload panel
 * to allow authors to choose whether to render PDFs inline.
 * @since 3.0.0
 * @ignore
 */
function setupUploadOption() {
    LT.authorApp().on('widgetedit:widget:ready', () => {
        const elResourceButtons = document.querySelectorAll('.cke_button__lrnresource');

        elResourceButtons.forEach(btn => {
            LT.utils.logger.debug('Found resource button in editor');
            btn.addEventListener('click', () => {
                addRenderOption();
            });
        });
    });
}

function addRenderOption() {
    const elAdvOptionsGroup = document.querySelector(`.lrn-${state.classNamePrefix}adv-options-group`);
    const randomId = generateRandomString();
    const elRenderRow = `<div class="lrn-row">
        <div class="lrn-col-xs-12 lrn-author-padding-top-sm">
            <label for="lt__renderPDF-Id_${randomId}" class="lrn-author-asset-upload lrn-form-label-name">
                <span class="lrn-author-asset-upload lrn-form-label-name">Render PDF inline?</span>
            </label>
            <div class="lrn-form-control-wrapper">
                <input id="lt__renderPDF-Id_${randomId}" name="renderPDF" value="true" type="checkbox" class="lrn-form-control lt__renderPDFOption">
            </div>
        </div>
    </div>`;

    if (elAdvOptionsGroup) {
        elAdvOptionsGroup.insertAdjacentHTML('beforeend', elRenderRow);
    }
}

/**
 * Generates a random string.
 * @since 2.2.0
 * @returns {string}
 * @ignore
 */
function generateRandomString() {
    return Math.floor(Math.random() * Date.now()).toString(36);
}

/**
 * Returns the extension CSS
 * @since 3.0.0
 * @ignore
 */
function getStyles() {
    return `
        /* Learnosity language text direction styles */
        /* Used to style render PDF options added to the resource upload panel */
        .lrn .lrn-author-ui .lrn-form-control.lt__renderPDFOption {
            width: auto;
        }

        .lt__renderPDF_pdf {
            display: block;
            width: 100%;
            max-width: 100%;
        }
        .lt__renderPDF_pdf .pdf-viewer {
            display: block;
            width: 100%;
            height: 650px;
            border: 0;
            background: #fff;
        }
    `;
}

export const renderPDF = createExtension('renderPDF', run, {
    getStyles,
});
