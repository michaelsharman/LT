import * as app from '../../../core/app.js';
import * as items from '../../../core/items.js';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Renders any PDF uploaded as a <a href="https://authorguide.learnosity.com/hc/en-us/articles/360000759117-Adding-Resources-to-Questions-and-Features" target="_blank">resource</a>
 * to any item in the activity. Uses the pdf.js webviewer that has a
 * toolbar to zoom, view thumbnails, and download etc.
 *
 * By enabling this extension, all PDFs will be rendered in the viewer.
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/renderpdf.png" alt="" width="700"></p>
 * @module Extensions/Assessment/renderPDF
 */

const state = {
    renderedCss: false,
};

/**
 * Sets up an item load listener to the current item for any resources that
 * have been uploaded during authoring. We parse the DOM for resources because
 * they aren't available in the item or question JSON.
 *
 * If the resource is a PDF, render using the pdf.js viewer.
 * @example
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.renderPDF.run();
 * @since 2.2.0
 */
export function run() {
    state.renderedCss || injectCSS();

    app.appInstance().on('item:load', renderPDF);
}

/**
 * Uses pdf.js webviewer to render any resource PDFs in iframes.
 * @since 2.2.0
 * @ignore
 */
function renderPDF() {
    const currentItemRef = items.itemReference();
    const elItem = document.querySelector(`.learnosity-item[data-reference="${currentItemRef}"]`);
    const resources = elItem.querySelectorAll('.lrn_widget .resource');

    if (resources.length) {
        resources.forEach(resource => {
            const url = resource.querySelector('a').getAttribute('href');

            // Only operate on PDFs
            if (url.substring(url.length - 3) === 'pdf') {
                // Hide the <a>. We might want to leave it there for an option to download
                resource.classList.add('sr-only');
                createHash(url).then(hash => {
                    render(hash);
                });

                function render(pdfId) {
                    if (!document.getElementById(pdfId)) {
                        const elCanvasContainer = document.createElement('div');
                        const elPDFFrame = document.createElement('iframe');

                        elCanvasContainer.setAttribute('id', pdfId);
                        elCanvasContainer.setAttribute('class', 'lt__renderPDF_pdf');
                        resource.before(elCanvasContainer);

                        elPDFFrame.setAttribute('class', 'pdf-viewer');
                        elPDFFrame.setAttribute('src', `${url}#sidebarViewOnLoad=0&_pagemode=none&_toolbar=0&view=FitH`);
                        elCanvasContainer.appendChild(elPDFFrame);
                    }
                }
            }
        });
    }
}

/**
 * Hashes an input string.
 * @param {string} input
 * @returns {string}
 * @since 2.2.0
 * @ignore
 */
async function createHash(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Injects the necessary CSS to the header
 * @since 2.2.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity render PDF styles */
.lt__renderPDF_pdf .pdf-viewer {
    border: none;
    width: 100%;
    height: 650px;
}
`;

    elStyle.setAttribute('data-style', 'LT Render PDF');
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
