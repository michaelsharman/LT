import { appInstance } from '../../../../core/app.js';
import { itemElement } from '../../../../core/items.js';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds a UI border in between the left and right columns (for
 * items with 2 columns) providing the ability for the end user
 * to resize the layout by dragging the element left or right.
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/columnResize/resize.gif" alt="" width="900"></p>
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
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.columnResizer.run();
 * @since 0.5.0
 */
export function run() {
    state.renderedCss || injectCSS();

    appInstance().on('item:load', () => {
        setupResizer();
    });

    window.addEventListener('resize', () => {
        debounce(setupResizer, 250);
    });
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
    const elItem = itemElement();

    // We may be on the Start page.
    if (!elItem) {
        return;
    }

    const elColumns = elItem.querySelectorAll('[class^="col-"]');
    const hasResizer = Boolean(elItem.querySelector('.lt__resizer'));
    const isResponsiveMode = Boolean(document.querySelector('.lrn-layout-single-column'));

    // Only add the resizable UI if we have 2 columns
    if (elColumns.length === 2) {
        if (!isResponsiveMode && !hasResizer) {
            const elResizer = document.createElement('div');
            elResizer.setAttribute('tooltip', 'Click and hold to drag column width');
            // elResizer.setAttribute('tabindex', '0');
            const elTab = document.createElement('span');
            elTab.classList.add('lt__resizer-tab');
            elTab.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-vertical-icon lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>';

            elResizer.classList.add('lt__resizer');
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
    elItem.querySelector('.lt__resizer')?.remove();
    elColumns[0].removeAttribute('style');
    window.dispatchEvent(new Event('resize'));
}

/**
 * JavaScript logic for the column resize feature.
 * @since 0.5.0
 * @ignore
 */
function doResize(elItem) {
    const resizable = elResizer => {
        const prevSibling = elResizer.previousElementSibling;
        const container = elResizer.parentNode;
        let isActive = false;
        let prevSiblingWidth = 0;

        let x = 0;

        const handleInteractionStart = e => {
            if (e instanceof MouseEvent) {
                x = e.clientX;
            } else {
                x = e.targetTouches[0].clientX;
            }
            const rect = prevSibling.getBoundingClientRect();
            prevSiblingWidth = rect.width;

            isActive = true;
            elResizer.setAttribute('aria-pressed', 'true');

            document.addEventListener('mousemove', handleInteractionMove);
            document.addEventListener('mouseup', handleInteractionEnd);

            document.addEventListener('touchmove', handleInteractionMove);
            document.addEventListener('touchend', handleInteractionEnd);
        };

        const handleInteractionMove = e => {
            if (!isActive) {
                return;
            }

            let dx;
            if (e instanceof MouseEvent) {
                dx = e.clientX - x;
            } else {
                dx = e.targetTouches[0].clientX - x;
            }

            const containerWidth = container.getBoundingClientRect().width;
            const newWidth = ((prevSiblingWidth + dx) * 100) / containerWidth;

            if (newWidth >= 10 && newWidth <= 90) {
                prevSibling.style.width = newWidth + '%';
            }
        };

        const handleInteractionEnd = () => {
            isActive = false;
            elResizer.setAttribute('aria-pressed', 'false');

            document.removeEventListener('mousemove', handleInteractionMove);
            document.removeEventListener('mouseup', handleInteractionEnd);

            document.removeEventListener('touchmove', handleInteractionMove);
            document.removeEventListener('touchend', handleInteractionEnd);
        };

        const handleKeyDown = e => {
            if (e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault(); // Prevent scroll
                isActive = !isActive;
                elResizer.setAttribute('aria-pressed', String(isActive));
            }

            if (!isActive) {
                return;
            }

            const step = 2; // % step per arrow key press
            const containerWidth = container.getBoundingClientRect().width;
            const currentWidth = (prevSibling.getBoundingClientRect().width * 100) / containerWidth;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const newWidth = Math.max(10, currentWidth - step);
                prevSibling.style.width = newWidth + '%';
            }

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const newWidth = Math.min(90, currentWidth + step);
                prevSibling.style.width = newWidth + '%';
            }
        };

        elResizer.addEventListener('mousedown', handleInteractionStart);
        elResizer.addEventListener('touchstart', handleInteractionStart);
        elResizer.addEventListener('keydown', handleKeyDown);
    };

    const elResizer = elItem.querySelector('.lt__resizer');
    if (elResizer) {
        elResizer.setAttribute('tabindex', '0');
        elResizer.setAttribute('role', 'separator');
        elResizer.setAttribute('aria-orientation', 'horizontal');
        elResizer.setAttribute('aria-pressed', 'false');
        elResizer.setAttribute('aria-label', 'Resize panel');
        resizable(elResizer);
    }
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

/**
 * Injects the necessary CSS to the header
 * @since 0.5.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity column resizer styles */
.lt__resizer {
    background-color: #e8e8e8;
    width: 3px;
    padding: 0;
    position: relative;
    outline: none;
}
.lt__resizer .lt__resizer-tab {
    position: relative;
    width: 45px;
    height: 30px;
    border: 1px solid #e4e4e4;
    left: -21px;
    top: -2px;
    border-radius: 3px;
    cursor: col-resize;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    z-index: 2;
    padding-bottom: 4px;
    color: #444;
    -webkit-user-select: none;
    user-select: none;
    background: linear-gradient(0deg, rgba(245,245,245,1) 0%, rgba(250,250,250,1) 51%, rgba(245,245,245,1) 100%);

    svg {
        width: 18px;
        height: 18px;
        top: 2px;
        position: relative;
    }
}
.lt__resizer:focus {
    background-color: rgba(0, 123, 255, 0.1);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}

.lt__resizer:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.lt__resizer[aria-pressed="true"] {
    background-color: rgba(0, 123, 255, 0.2);

    .lt__resizer-tab {
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
    }
}
.row {
    display: flex;
}
.col-xs-6.lrn-column-left {
    display: flex;
    flex-direction: column;
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
    .lt__resizer {
        display: none;
    }
}
`;

    elStyle.setAttribute('data-style', 'LT Column Resizer');
    elStyle.textContent = css;
    document.head.append(elStyle);

    state.renderedCss = true;
}
