import { appInstance } from '../../../core/app.js';
import { createModule } from '../../../../utils/moduleFactory.js';
import logger from '../../../../utils/logger.js';

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
 * @module Extensions/Authoring/renderPDF
 */

const state = {
    renderedCss: false,
};

/**
 * Extension constructor.
 * @example
 * import { LT } from '@caspingus/lt/authoring';
 *
 * LT.init(authorApp); // Set up LT with the Author API application instance variable
 * LT.extensions.renderPDF.run();
 * @since 2.2.0
 */
function run() {
    state.renderedCss || (injectCSS(), (state.renderedCss = true));

    appInstance().on('widgetedit:widget:ready', () => {
        const elResourceButtons = document.querySelectorAll('.cke_button__lrnresource');

        elResourceButtons.forEach(btn => {
            logger.debug('Found resource button in editor');
            btn.addEventListener('click', () => {
                addRenderOption();
            });
        });
    });
}

function addRenderOption() {
    const elAdvOptionsGroup = document.querySelector('.lrn-adv-options-group');
    const randomId = generateRandomString();
    const elRenderRow = `<div class="lrn-row">
        <div class="lrn-col-xs-12">
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
 * Injects the necessary CSS to the header
 * @since 2.2.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity language text direction styles */
/* Used to style render PDF options added to the resource upload panel */
.lrn .lrn-author-ui .lrn-form-control.lt__renderPDFOption {
    width: auto;
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}

export const renderPDF = createModule('renderPDF', run);
