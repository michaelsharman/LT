import { createExtension, LT } from '../../../../utils/extensionsFactory.js';

/**
 * Renders any PDF uploaded as a <a href="https://authorguide.learnosity.com/hc/en-us/articles/360000759117-Adding-Resources-to-Questions-and-Features" target="_blank">resource</a>
 * to any item in the activity. Uses the native webviewer that has a
 * toolbar to zoom, view thumbnails, and download etc.
 *
 * By enabling this extension, all PDFs will be rendered in the viewer.
 *
 * DEVELOPER NOTE: This extension may not render PDFs if the Chrome devtools are open. This is a known issue.
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/renderpdf.png" alt="" width="700"></p>
 *
 * @example
 * LT.init(itemsApp, {
 *     extensions: ['renderPDF'],
 * });
 *
 * @module Extensions/Assessment/renderPDF
 */

/**
 * Sets up an item load listener to the current item for any resources that
 * have been uploaded during authoring. We parse the DOM for resources because
 * they aren't available in the item or question JSON.
 *
 * If the resource is a PDF, render using the native viewer.
 * @since 2.2.0
 * @ignore
 */
function run() {
    LT.eventBus.on('item:load', doRenderPDF, 'renderPDF');

    // Also attempt once immediately (in case the item is already present)
    queueMicrotask(doRenderPDF);
}

/**
 * Uses the native viewer to render any resource PDFs in iframes.
 * @since 2.2.0
 * @ignore
 */
function doRenderPDF() {
    const currentItemRef = LT.itemReference();
    const elItem = document.querySelector(`.learnosity-item[data-reference="${currentItemRef}"]`);

    if (!elItem) {
        return;
    }

    const resources = elItem.querySelectorAll('.lrn_widget .resource');
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
        mountNativePdf(resource, url);
    });
}

/**
 * Mounts a native PDF viewer for the given resource element.
 * @param {Element} resourceEl - The resource element to mount the viewer for.
 * @param {string} url - The URL of the PDF to display.
 * @since 3.0.0
 * @ignore
 */
function mountNativePdf(resourceEl, url) {
    const wrapper = document.createElement('div');
    wrapper.className = 'lt__renderPDF_pdf';

    const iframe = document.createElement('iframe');
    iframe.className = 'pdf-viewer';
    iframe.allow = 'fullscreen';
    iframe.setAttribute('allowfullscreen', '');

    wrapper.appendChild(iframe);
    resourceEl.before(wrapper);

    const isElementVisible = el => {
        const r = el.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0) {
            return false;
        }
        return !!(el.ownerDocument && el.ownerDocument.defaultView);
    };

    const setSrc = () => {
        // Cache-buster works around DevTools "Disable cache" blanking in Chromium
        const sep = url.includes('?') ? '&' : '?';
        const cacheBust = `v=${Date.now()}`;
        const withBust = `${url}${sep}${cacheBust}#view=FitH`;

        // Double-RAF ensures layout is committed before navigating the plugin
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                iframe.src = withBust;
            });
        });
    };

    if (isElementVisible(wrapper)) {
        setSrc();
    } else {
        const io = new IntersectionObserver(
            entries => {
                const visible = entries.some(e => e.isIntersecting);
                if (visible) {
                    io.disconnect();
                    setSrc();
                }
            },
            { root: null, threshold: 0.01 }
        );
        io.observe(wrapper);
    }
}

/**
 * Returns the extension CSS
 * @since 3.0.0
 * @ignore
 */
function getStyles() {
    return `
        /* Learnosity render PDF styles */
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
    mountNativePdf,
});
