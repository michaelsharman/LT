import * as app from '../../../core/app';
import * as item from '../../../core/items';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds a UI border in between the left and right columns (for
 * items with 2 columns) providing the ability for the end user
 * to resize the layout by dragging the element left or right.
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/resize.gif" alt="" width="900"></p>
 * @module Extensions/Assessment/columnResizer
 */

const state = {
    renderedCss: false,
    resize: {
        triggered: false,
    },
};

/**
 * Sets up an item load listener to add a UI element allowing
 * users to drag to resize the column divider.
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.columnResizer.run();
 * @since 0.5.0
 */
export function run() {
    if (!state.renderedCss) injectCSS();
    app.appInstance().on('item:load', () => {
        setupResizer();
    });
    window.addEventListener('resize', debounce(setupResizer, 250));
}

/**
 * Adds the UI element to resize the 2-columns.
 *
 * Does nothing on a single column item.
 *
 * Doesn't render if in responsive mode.
 * @since 0.5.0
 * @ignore
 */
function setupResizer() {
    let elItem = item.itemElement();
    let elColumns = elItem.querySelectorAll('[class^="col-"]');
    let hasResizer = Boolean(elItem.querySelector('.lrn-resizer'));
    let isResponsiveMode = Boolean(document.querySelector('.lrn-layout-single-column'));

    // Only add the resizable UI if we have 2 columns
    if (elColumns.length === 2) {
        if (!isResponsiveMode && !hasResizer) {
            let elResizer = document.createElement('div');
            elResizer.setAttribute('tooltip', 'Click and hold to drag column width');
            // elResizer.setAttribute('tabindex', '0');
            let elTab = document.createElement('span');
            elTab.innerHTML = '↤ ↦';

            elResizer.classList.add('lrn-resizer');
            elColumns[0].classList.add('lrn-column-left');
            elColumns[1].classList.add('lrn-column-right');

            elResizer.append(elTab);
            elColumns[0].after(elResizer);
        } else if (isResponsiveMode && hasResizer) {
            clearResizer(elItem, elColumns);
        }

        doResize(elItem);
    }
}

/**
 * Removes resizer UI element and width attribute
 * from the left column.
 * @since 0.5.0
 * @ignore
 */
function clearResizer(elItem, elColumns) {
    let elResizer = elItem.querySelector('.lrn-resizer');
    if (elResizer) {
        elResizer.remove();
    }
    elColumns[0].removeAttribute('style');
    window.dispatchEvent(new Event('resize'));
}

/**
 * JavaScript logic for the column resize feature.
 * @since 0.5.0
 * @ignore
 */
function doResize(elItem) {
    const resizable = function (elResizer) {
        const prevSibling = elResizer.previousElementSibling;

        let x = 0;
        let prevSiblingWidth = 0;

        const handleInteractionStart = e => {
            if (e instanceof MouseEvent) {
                x = e.clientX;
            } else {
                x = e.targetTouches[0].clientX;
            }
            const rect = prevSibling.getBoundingClientRect();
            prevSiblingWidth = rect.width;

            // Mouse events
            document.addEventListener('mousemove', handleInteractionMove);
            document.addEventListener('mouseup', handleInteractionEnd);

            // Touch events
            document.addEventListener('touchmove', handleInteractionMove);
            document.addEventListener('touchend', handleInteractionEnd);
        };

        const handleInteractionMove = e => {
            let dx;
            if (e instanceof MouseEvent) {
                dx = e.clientX - x;
            } else {
                dx = e.targetTouches[0].clientX - x;
            }
            const w = ((prevSiblingWidth + dx) * 100) / elResizer.parentNode.getBoundingClientRect().width;
            if (w >= 10 && w <= 90) prevSibling.style.width = w + '%';
        };

        const handleInteractionEnd = () => {
            // Mouse events
            document.removeEventListener('mousemove', handleInteractionMove);
            document.removeEventListener('mouseup', handleInteractionEnd);

            // Touch events
            document.removeEventListener('touchmove', handleInteractionMove);
            document.removeEventListener('touchend', handleInteractionEnd);
        };

        elResizer.addEventListener('mousedown', handleInteractionStart);
        elResizer.addEventListener('touchstart', handleInteractionStart);
    };

    let elResizer = elItem.querySelector('.lrn-resizer');
    if (elResizer) resizable(elResizer);
}

/**
 * Injects the necessary CSS to the header
 * @since 0.5.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity column resizer styles */
.lrn-resizer {
    background-color: #e8e8e8;
    cursor: grab;
    width: 3px;
    padding: 0;
    position: relative;
}
.lrn-resizer span {
    position: relative;
    width: 45px;
    height: 30px;
    border: 1px solid #e4e4e4;
    left: -22px;
    border-radius: 3px;
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    z-index: 2;
    padding-bottom: 3px;
    color: #444;

    -webkit-user-select: none;
    user-select: none;

    background: rgb(233,233,233);
    background: linear-gradient(0deg, rgba(233,233,233,1) 0%, rgba(250,250,250,1) 51%, rgba(238,238,238,1) 100%);
}
.row {
    display: flex;
}
.col-xs-6.lrn-column-left {
    display: flex;
    min-width: 5em;
    overflow: hidden;
}
.col-xs-6.lrn-column-right {
    display: flex;

    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 5em;
    overflow: hidden;
}
.lrn-column-left .lrn_widget,
.lrn-column-right .lrn_widget {
    padding: 1.5em;
}
@media (max-width: 650px) {
    .lrn-resizer {
        display: none;
    }
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}

/**
 * Generic debounce function.
 * @param {*} func
 * @param {number} wait
 * @since 0.5.0
 * @ignore
 */
function debounce(func, wait) {
    if (!state.resize.triggered) {
        state.resize.triggered = true;
        func.apply(this);
    }
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            state.resize.triggered = false;
            func.apply(this, args);
        }, wait);
    };
}
