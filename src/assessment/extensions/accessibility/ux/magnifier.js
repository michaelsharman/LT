import * as app from '../../../core/app.js';
import * as items from '../../../core/items.js';
import logger from '../../../../utils/logger.js';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Allows the end-user to launch a magnifier to move around
 * the screen and zoom in on whatever content they move it
 * on top of.
 *
 * TODO:
 *  - make movable via keyboard
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/magnifier.png" alt="" width="800"></p>
 * @module Extensions/Assessment/magnifier
 */

const LOG_LEVEL = 'ERROR';

const state = {
    _initialised: false,
    magnifier: null,
};

/**
 * Initialises the screen magnifier.
 * @example
 * import { LT } from '@caspingus/lt/assessment';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.magnifier.run();
 *
 * Options argument to override defaults which are:
 * {
 *     zoom: 4,
 *     shape: 'square',
 *     width: 310,
 *     height: 310,
 * }
 * @param {object} options Optional config object to override defaults
 * @since 0.7.0
 */
export function run(options) {
    if (!state._initialised) {
        if (!options) {
            options = {
                zoom: 4,
                shape: 'square',
                width: 350,
                height: 350,
            };
        }

        state.magnifier = new HTMLMagnifier(options);
        state._initialised = true;
    } else {
        logger.debug('Magnifier already initialised, ignoring run();', LOG_LEVEL);
    }
}

/**
 * Sets up listeners on custom buttons to toggle the magnifier.
 * @param {string} classname CSS class value of the element to launch the magnifier
 * @since 2.16.0
 */
export function setupButtons(classname = 'lrn__magnifier') {
    const elButtons = document.querySelectorAll(`.${classname}`);
    elButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            state.magnifier.toggle();
        });
    });

    app.appInstance().on('item:load', checkImageContent());
}

/**
 * Toggle visibility of the magnifier.
 * @since 2.16.0
 */
export function toggle() {
    state.magnifier.toggle();
}

function HTMLMagnifier(options) {
    const _this = this;

    _this.options = Object.assign(
        {
            zoom: 2,
            shape: 'square',
            width: 200,
            height: 200,
        },
        options
    );

    const magnifierTemplate = `<div class="magnifier" style="display: none;position: fixed;overflow: hidden;background-color: white;border: 1px solid #555;border-radius: 4px;z-index:10000;">
                                <div class="magnifier-content" style="top: 0px;left: 0px;margin-left: 0px;margin-top: 0px;overflow: visible;position: absolute;display: block;transform-origin: left top;-moz-transform-origin: left top;-ms-transform-origin: left top;-webkit-transform-origin: left top;-o-transform-origin: left top;user-select: none;-moz-user-select: none;-webkit-user-select: none;padding-top: 0px"></div>
                                <div class="magnifier-glass" style="position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;opacity: 0.0;-ms-filter: alpha(opacity=0);background-color: white;cursor: move;"></div>
                            </div>`;

    let magnifier, magnifierContent;
    let observerObj;
    let syncTimeout;
    let isVisible = false;
    let magnifierBody;
    const events = {};

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            if (_this.isVisible()) {
                _this.hide();
            }
        }
    });

    function setPosition(element, left, top) {
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
    }

    function setDimensions(element, width, height) {
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
    }

    function setupMagnifier() {
        switch (_this.options.shape) {
            case 'square':
                setDimensions(magnifier, _this.options.width, _this.options.height);
                break;
            case 'circle':
                setDimensions(magnifier, _this.options.width, _this.options.height);
                magnifier.style.borderRadius = '50%';
                break;
        }
        magnifierContent.style.WebkitTransform =
            magnifierContent.style.MozTransform =
            magnifierContent.style.OTransform =
            magnifierContent.style.MsTransform =
            magnifierContent.style.transform =
                `scale(${_this.options.zoom})`;
    }

    function isDescendant(parent, child) {
        let node = child;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    function syncContent() {
        if (isVisible) {
            prepareContent();
            syncViewport();
            syncScrollBars();
        }
    }

    function syncContentQueued() {
        if (isVisible) {
            window.clearTimeout(syncTimeout);
            syncTimeout = window.setTimeout(syncContent, 100);
        }
    }

    function domChanged() {
        if (isVisible) {
            syncContentQueued();
        }
    }

    function unBindDOMObserver() {
        if (observerObj) {
            observerObj.disconnect();
            observerObj = null;
        }
        if (document.removeEventListener) {
            document.removeEventListener('DOMNodeInserted', domChanged, false);
            document.removeEventListener('DOMNodeRemoved', domChanged, false);
        }
    }

    function triggerEvent(event, data) {
        const handlers = events[event];
        if (handlers) {
            for (let i = 0; i < handlers.length; i++) {
                handlers[i].call(_this, data);
            }
        }
    }

    function syncViewport() {
        const x1 = magnifier.offsetLeft;
        const y1 = magnifier.offsetTop;
        const x2 = document.body.scrollLeft;
        const y2 = document.body.scrollTop;
        const left = -x1 * _this.options.zoom - x2 * _this.options.zoom;
        const top = -y1 * _this.options.zoom - y2 * _this.options.zoom;
        setPosition(magnifierContent, left, top);
        triggerEvent('viewPortChanged', magnifierBody);
    }

    function removeSelectors(container, selector) {
        const elements = container.querySelectorAll(selector);
        if (elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].parentNode.removeChild(elements[i]);
            }
        }
    }

    function prepareContent() {
        magnifierContent.innerHTML = '';
        const bodyOriginal = document.body;
        const bodyCopy = bodyOriginal.cloneNode(true);
        const color = bodyOriginal.style.backgroundColor;
        if (color) {
            magnifier.css('background-color', color);
        }
        bodyCopy.style.cursor = 'auto';
        bodyCopy.style.paddingTop = '0px';
        bodyCopy.setAttribute('unselectable', 'on');
        const canvasOriginal = bodyOriginal.querySelectorAll('canvas');
        const canvasCopy = bodyCopy.querySelectorAll('canvas');
        if (canvasOriginal.length > 0) {
            if (canvasOriginal.length === canvasCopy.length) {
                for (let i = 0; i < canvasOriginal.length; i++) {
                    const ctx = canvasCopy[i].getContext('2d');
                    ctx.drawImage(canvasOriginal[i], 0, 0);
                }
            }
        }
        removeSelectors(bodyCopy, 'script');
        removeSelectors(bodyCopy, 'audio');
        removeSelectors(bodyCopy, 'video');
        removeSelectors(bodyCopy, '.magnifier');
        triggerEvent('prepareContent', bodyCopy);
        magnifierContent.appendChild(bodyCopy);
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;
        setDimensions(magnifierContent, width, height);
        magnifierBody = magnifierContent.querySelector('body');
        triggerEvent('contentUpdated', magnifierBody);
    }

    function initScrollBars() {
        triggerEvent('initScrollBars', magnifierBody);
    }

    function syncScroll(ctrl) {
        const selectors = [];
        if (ctrl.getAttribute) {
            if (ctrl.getAttribute('id')) {
                selectors.push('#' + ctrl.getAttribute('id'));
            }
            if (ctrl.className) {
                selectors.push('.' + ctrl.className.split(' ').join('.'));
            }
            for (let i = 0; i < selectors.length; i++) {
                const t = magnifierBody.querySelectorAll(selectors[i]);
                if (t.length == 1) {
                    t[0].scrollTop = ctrl.scrollTop;
                    t[0].scrollLeft = ctrl.scrollLeft;
                    return true;
                }
            }
        } else if (ctrl == document) {
            syncViewport();
        }
        return false;
    }

    function syncScrollBars(e) {
        if (isVisible) {
            if (e && e.target) {
                syncScroll(e.target);
            } else {
                const scrolled = [];
                const elements = document.querySelectorAll('div');
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i].scrollTop > 0) {
                        scrolled.push(elements[i]);
                    }
                }
                for (let i = 0; i < scrolled.length; i++) {
                    if (!isDescendant(magnifier, scrolled[i])) {
                        syncScroll(scrolled[i]);
                    }
                }
            }
            triggerEvent('syncScrollBars', magnifierBody);
        }
    }

    function makeDraggable(ctrl, options) {
        const _this = this;

        let dragObject = null;
        let dragHandler = null;

        options = options || {};
        options.exclude = ['INPUT', 'TEXTAREA', 'SELECT', 'A', 'BUTTON'];

        if (options.handler) {
            dragHandler = ctrl.querySelector(options.handler);
        } else {
            dragHandler = ctrl;
        }

        function setPosition(element, left, top) {
            element.style.left = `${left}px`;
            element.style.top = `${top}px`;
        }

        let pos_y, pos_x, ofs_x, ofs_y;

        ctrl.style.cursor = 'move';

        function downHandler(e) {
            const target = e.target || e.srcElement;
            const parent = target.parentNode;

            if (target && options.exclude.indexOf(target.tagName.toUpperCase()) == -1) {
                if (!parent || options.exclude.indexOf(parent.tagName.toUpperCase()) == -1) {
                    // img in a
                    dragObject = ctrl;

                    const pageX = e.pageX || e.touches[0].pageX;
                    const pageY = e.pageY || e.touches[0].pageY;

                    ofs_x = dragObject.getBoundingClientRect().left - dragObject.offsetLeft;
                    ofs_y = dragObject.getBoundingClientRect().top - dragObject.offsetTop;

                    pos_x = pageX - (dragObject.getBoundingClientRect().left + document.body.scrollLeft);
                    pos_y = pageY - (dragObject.getBoundingClientRect().top + document.body.scrollTop);

                    e.preventDefault();
                }
            }
        }

        function moveHandler(e) {
            if (dragObject !== null) {
                const pageX = e.pageX || e.touches[0].pageX;
                const pageY = e.pageY || e.touches[0].pageY;
                const left = pageX - pos_x - ofs_x - document.body.scrollLeft;
                const top = pageY - pos_y - ofs_y - document.body.scrollTop;

                setPosition(dragObject, left, top);
                if (options.ondrag) {
                    options.ondrag.call(e);
                }
            }
        }

        function upHandler() {
            if (dragObject !== null) {
                dragObject = null;
            }
        }

        const events = [
            { target: dragHandler, types: ['mousedown', 'touchstart'], handler: downHandler },
            { target: window, types: ['mousemove', 'touchmove'], handler: moveHandler },
            { target: window, types: ['mouseup', 'touchend'], handler: upHandler },
        ];

        events.forEach(({ target, types, handler }) => {
            types.forEach(type => target.addEventListener(type, handler));
        });

        return _this;
    }

    function init() {
        const div = document.createElement('div');
        div.innerHTML = magnifierTemplate;
        magnifier = div.querySelector('.magnifier');
        document.body.appendChild(magnifier);
        magnifierContent = magnifier.querySelector('.magnifier-content');
        if (window.addEventListener) {
            window.addEventListener('resize', syncContent, false);
            window.addEventListener('scroll', syncScrollBars, true);
        }
        makeDraggable(magnifier, {
            ondrag: syncViewport,
        });
    }

    _this.setZoom = value => {
        _this.options.zoom = value;
        setupMagnifier();
    };

    _this.setShape = (shape, width, height) => {
        _this.options.shape = shape;
        if (width) {
            _this.options.width = width;
        }
        if (height) {
            _this.options.height = height;
        }
        setupMagnifier();
    };

    _this.setWidth = value => {
        _this.options.width = value;
        setupMagnifier();
    };

    _this.setHeight = value => {
        _this.options.height = value;
        setupMagnifier();
    };

    _this.getZoom = () => {
        return _this.options.zoom;
    };

    _this.getShape = () => {
        return _this.options.shape;
    };

    _this.getWidth = () => {
        return _this.options.width;
    };

    _this.getHeight = () => {
        return _this.options.height;
    };

    _this.isVisible = () => {
        return isVisible;
    };

    _this.on = (event, callback) => {
        events[event] = events[event] || [];
        events[event].push(callback);
    };

    _this.syncScrollBars = () => {
        syncScrollBars();
    };

    _this.syncContent = () => {
        syncContentQueued();
    };

    _this.hide = () => {
        unBindDOMObserver();
        magnifierContent.innerHTML = '';
        magnifier.style.display = 'none';
        isVisible = false;
    };

    _this.show = event => {
        let left, top;
        if (event) {
            left = event.pageX - 175;
            top = event.pageY - 175;
        } else {
            left = 200;
            top = 200;
        }
        setupMagnifier();
        prepareContent();
        setPosition(magnifier, left, top);
        magnifier.style.display = '';
        syncViewport();
        syncScrollBars();
        initScrollBars();
        // bindDOMObserver();
        isVisible = true;
    };

    _this.toggle = () => {
        if (_this.isVisible()) {
            _this.hide();
        } else {
            _this.show();
        }
    };

    init();

    return _this;
}

function checkImageContent() {
    const elItem = items.itemElement();
    const elImages = elItem.querySelectorAll('img');

    if (elImages) {
        elImages.forEach(img => {
            img.addEventListener('click', e => {
                if (!state.magnifier.isVisible()) {
                    state.magnifier.show(e);
                }
            });
        });
    }
}
