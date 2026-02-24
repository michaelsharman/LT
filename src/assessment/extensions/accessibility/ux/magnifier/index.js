import { createExtension, LT } from '../../../../../utils/extensionsFactory.js';

/**
 * Allows the end-user to launch a magnifier to move around
 * the screen and zoom in on whatever content they move it
 * on top of.
 *
 * TODO:
 *  - make movable via keyboard
 *
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/docs/images/magnifier.png" alt="" width="800"></p>
 *
 * @param {object=} options Object of configuration options.
 *
 * @example
 * const options = {
 *     zoom: 4,
 *     shape: 'square',
 *     width: 350,
 *     height: 350,
 *     sampleOffsetX: 0,
 *     sampleOffsetY: 350,
 * }
 *
 * LT.init(itemsApp, {
 *     extensions: [
 *         { id: 'magnifier', args: options },
 *     ],
 * });
 *
 * @module Extensions/Assessment/magnifier
 */

const DEFAULTS = {
    zoom: 4,
    shape: 'square', // 'square' | 'circle'
    width: 350,
    height: 350,
    sampleOffsetX: 0, // px shift of the sampled document point, relative to lens center
    sampleOffsetY: 350, // positive moves the sampled point downward inside the lens; negative moves it upward
};

const state = {
    initialised: false,
    instance: null,
    options: { ...DEFAULTS },
};

/**
 * Initialises the screen magnifier.
 * @param {object=} config Optional config object to override defaults
 * @since 0.7.0
 * @ignore
 */
function run(config) {
    if (state.initialised) {
        LT.utils.logger.debug('Magnifier already initialised; ignoring run()');
        return;
    }
    state.initialised = true;
    state.options = { ...DEFAULTS, ...(config || {}) };
}

function ensureInstance() {
    if (!state.instance) {
        state.instance = new HTMLMagnifier(state.options);
    }
    return state.instance;
}

/**
 * Sets up listeners on custom buttons to toggle the magnifier.
 * @param {string} classname CSS class value of the element to launch the magnifier
 * @since 2.16.0
 * @returns {void}
 */
function setupButtons(classname = 'lrn__magnifier') {
    const elButtons = document.querySelectorAll(`.${classname}`);

    elButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            ensureInstance().toggle();
        });
    });

    // Keep legacy behavior: bind per-item image click handlers
    LT.eventBus.on('item:load', checkImageContent, 'magnifier');
}

/**
 * Hides the magnifier if it is currently visible.
 * If the magnifier is already hidden, it does nothing.
 * @since 3.0.0
 * @returns {void}
 */
function hide() {
    ensureInstance().hide();
}

/**
 * Shows the magnifier if it is currently hidden.
 * If the magnifier is already visible, it does nothing.
 * @since 3.0.0
 * @returns {void}
 */
function show() {
    ensureInstance().show();
}

/**
 * Toggle visibility of the magnifier.
 * @since 2.16.0
 * @returns {void}
 */
function toggle() {
    ensureInstance().toggle();
}

function HTMLMagnifier(options) {
    const _this = this;

    // Defaults here (delegated from run)
    _this.options = { ...DEFAULTS, ...(options || {}) };

    const magnifierTemplate = `
<div id="lt__magnifier" class="magnifier" style="display:none;position:fixed;overflow:hidden;background-color:#fff;border:2px solid #555;border-radius:6px;z-index:10000;">
  <div class="magnifier-content" style="top:0;left:0;position:absolute;display:block;transform-origin:left top;user-select:none;"></div>
  <div class="magnifier-glass" style="position:absolute;inset:0;opacity:0;background-color:#fff;cursor:move;"></div>
</div>`.trim();

    let magnifier, magnifierContent;
    let isVisible = false;
    let rafId = 0;
    let needsRebuild = true; // only rebuild clone when needed
    const events = {};

    document.addEventListener('keydown', ev => {
        if (ev.key === 'Escape' && _this.isVisible()) {
            _this.hide();
        }
    });

    function setPosition(el, left, top) {
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
    }
    function setDimensions(el, w, h) {
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
    }

    function setupMagnifier() {
        const { shape, width, height, zoom } = _this.options;
        setDimensions(magnifier, width, height);
        magnifier.style.borderRadius = shape === 'circle' ? '50%' : '4px';
        magnifierContent.style.transform = `scale(${zoom})`;
    }

    function syncViewport() {
        const rect = magnifier.getBoundingClientRect();
        const w = magnifier.clientWidth;
        const h = magnifier.clientHeight;
        const cx = w / 2;
        const cy = h / 2;
        const z = _this.options.zoom;

        const sr = scrollRoot || document.scrollingElement || document.documentElement;
        const srRect = sr === document.scrollingElement || sr === document.documentElement ? { left: 0, top: 0 } : sr.getBoundingClientRect();

        const sx = sr.scrollLeft || 0;
        const sy = sr.scrollTop || 0;

        // Document-space coords of the lens center (within the scroll root’s content)
        const docX = sx + (rect.left - srRect.left) + cx;
        const docY = sy + (rect.top - srRect.top) + cy;

        // Apply sampling offsets (defaults to 0)
        const offX = Number(_this.options.sampleOffsetX) || 0;
        const offY = Number(_this.options.sampleOffsetY) || 0;

        // Map (docX, docY) to (cx + offX, cy + offY) inside the lens
        const contentLeft = Math.round(cx + offX - docX * z);
        const contentTop = Math.round(cy + offY - docY * z);

        setPosition(magnifierContent, contentLeft, contentTop);
        triggerEvent('viewPortChanged', magnifierContent);
    }

    function prepareContent() {
        magnifierContent.innerHTML = '';

        const bodyOriginal = document.body;
        const bodyCopy = bodyOriginal.cloneNode(true);

        // Copy key computed styles that affect horizontal/vertical offset
        const cs = getComputedStyle(bodyOriginal);
        // Background to keep a consistent backdrop
        magnifier.style.backgroundColor = cs.backgroundColor || '#fff';

        // Ensure the clone’s body has the same margin/padding/etc. as the real one
        bodyCopy.style.margin = cs.margin; // ← critical (kills the 8px UA margin)
        bodyCopy.style.padding = cs.padding || '0';
        bodyCopy.style.boxSizing = cs.boxSizing || 'border-box';

        // keep the rest as you had
        bodyCopy.style.cursor = 'auto';
        bodyCopy.style.paddingTop = '0px';
        bodyCopy.setAttribute('unselectable', 'on');

        // …your canvas copy, pruning scripts/media, etc…

        magnifierContent.appendChild(bodyCopy);
        scrollRoot = findScrollRoot();

        // Size the cloned document to full page
        const de = document.documentElement;
        const width = Math.max(de.scrollWidth, de.clientWidth);
        const height = Math.max(de.scrollHeight, de.clientHeight);
        setDimensions(magnifierContent, width, height);

        triggerEvent('contentUpdated', magnifierContent);
        needsRebuild = false;
    }

    function syncScroll(ctrl) {
        const selectors = [];
        if (ctrl?.getAttribute) {
            const id = ctrl.getAttribute('id');
            if (id) {
                selectors.push('#' + id);
            }
            const cls = String(ctrl.className || '').trim();
            if (cls) {
                selectors.push('.' + cls.split(/\s+/).join('.'));
            }

            for (let i = 0; i < selectors.length; i++) {
                const t = magnifierContent.querySelectorAll(selectors[i]);
                if (t.length === 1) {
                    t[0].scrollTop = ctrl.scrollTop;
                    t[0].scrollLeft = ctrl.scrollLeft;
                    return true;
                }
            }
        } else if (ctrl === document) {
            syncViewport();
        }
        return false;
    }

    function syncScrollBars(e) {
        if (!isVisible) {
            return;
        }
        if (e && e.target) {
            syncScroll(e.target);
        } else {
            const scrolled = [];
            document.querySelectorAll('div').forEach(el => {
                if (el.scrollTop > 0) {
                    scrolled.push(el);
                }
            });
            for (let i = 0; i < scrolled.length; i++) {
                if (!isDescendant(magnifier, scrolled[i])) {
                    syncScroll(scrolled[i]);
                }
            }
        }
        triggerEvent('syncScrollBars', magnifierContent);
    }

    function isDescendant(parent, child) {
        for (let n = child; n; n = n.parentNode) {
            if (n === parent) {
                return true;
            }
        }
        return false;
    }

    function syncContent() {
        if (!isVisible) {
            return;
        }
        // Only rebuild the clone when needed (first show, resize)
        if (needsRebuild) {
            prepareContent();
        }
        syncScrollBars();
    }

    function syncContentQueued() {
        if (!isVisible) {
            return;
        }
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        rafId = requestAnimationFrame(syncContent);
    }

    function triggerEvent(event, data) {
        const handlers = events[event];
        if (handlers) {
            for (let i = 0; i < handlers.length; i++) {
                handlers[i].call(_this, data);
            }
        }
    }

    function makeDraggable(ctrl, options = {}) {
        const exclude = new Set((options.exclude || ['INPUT', 'TEXTAREA', 'SELECT', 'A', 'BUTTON']).map(s => s.toUpperCase()));
        let startLeft = 0,
            startTop = 0,
            startX = 0,
            startY = 0,
            dragging = false;

        ctrl.style.cursor = 'move';

        function down(e) {
            const t = e.target;
            if (t && (exclude.has(t.tagName) || (t.parentNode && exclude.has(t.parentNode.tagName)))) {
                return;
            }
            const rect = ctrl.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            startX = e.clientX ?? e.touches?.[0]?.clientX;
            startY = e.clientY ?? e.touches?.[0]?.clientY;
            dragging = true;
            e.preventDefault();
        }
        function move(e) {
            if (!dragging) {
                return;
            }
            const x = e.clientX ?? e.touches?.[0]?.clientX;
            const y = e.clientY ?? e.touches?.[0]?.clientY;
            setPosition(ctrl, Math.round(startLeft + (x - startX)), Math.round(startTop + (y - startY)));
            options.ondrag?.(e);
        }
        function up() {
            dragging = false;
        }

        ctrl.addEventListener('mousedown', down);
        ctrl.addEventListener('touchstart', down, { passive: false });
        window.addEventListener('mousemove', move, { passive: true });
        window.addEventListener('touchmove', move, { passive: true });
        window.addEventListener('mouseup', up, { passive: true });
        window.addEventListener('touchend', up, { passive: true });
    }

    let scrollRoot = null; // active inner scroller if any

    function findScrollRoot() {
        // Prefer a common app container that actually scrolls
        const candidates = [document.querySelector('.lrn-assess'), document.querySelector('#app'), document.scrollingElement].filter(Boolean);

        for (const el of candidates) {
            const cs = getComputedStyle(el);
            const isScroller = /(auto|scroll)/.test(cs.overflow) || /(auto|scroll)/.test(cs.overflowX) || /(auto|scroll)/.test(cs.overflowY);
            if (isScroller && (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight)) {
                return el;
            }
        }
        return document.scrollingElement || document.documentElement;
    }

    window.addEventListener(
        'scroll',
        e => {
            if (e && e.target && e.target !== document && e.target !== window) {
                // If a real element is scrolling, adopt it as the root
                scrollRoot = e.target;
            }
            syncScrollBars(e);
            syncContentQueued();
        },
        { passive: true, capture: true }
    );

    function init() {
        const div = document.createElement('div');
        div.innerHTML = magnifierTemplate;
        magnifier = div.querySelector('.magnifier');
        magnifierContent = magnifier.querySelector('.magnifier-content');

        // ⬇️ Always append to body so transforms on wrappers don't affect us
        document.body.appendChild(magnifier);

        window.addEventListener(
            'resize',
            () => {
                needsRebuild = true;
                syncContentQueued();
            },
            { passive: true }
        );

        window.addEventListener(
            'scroll',
            e => {
                // No rebuild on scroll; just keep scroll positions in sync
                syncScrollBars(e);
                syncContentQueued(); // pan clone to match lens
            },
            { passive: true, capture: true }
        );

        makeDraggable(magnifier, { ondrag: () => syncViewport() });
    }

    _this.setZoom = value => {
        _this.options.zoom = Number(value) || _this.options.zoom;
        setupMagnifier();
        syncViewport();
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
        syncViewport();
    };
    _this.setWidth = v => {
        _this.options.width = v;
        setupMagnifier();
        syncViewport();
    };
    _this.setHeight = v => {
        _this.options.height = v;
        setupMagnifier();
        syncViewport();
    };

    _this.getZoom = () => _this.options.zoom;
    _this.getShape = () => _this.options.shape;
    _this.getWidth = () => _this.options.width;
    _this.getHeight = () => _this.options.height;

    _this.isVisible = () => isVisible;

    _this.on = (event, cb) => {
        events[event] = events[event] || [];
        events[event].push(cb);
    };

    _this.syncScrollBars = () => syncScrollBars();
    _this.syncContent = () => syncContentQueued();

    _this.hide = () => {
        magnifierContent.innerHTML = '';
        magnifier.style.display = 'none';
        isVisible = false;
    };

    _this.show = event => {
        const { width, height } = _this.options;
        const cx = event?.clientX ?? 200;
        const cy = event?.clientY ?? 200;
        const left = Math.max(0, Math.round(cx - width / 2));
        const top = Math.max(0, Math.round(cy - height / 2));

        setupMagnifier();
        if (needsRebuild) {
            prepareContent();
        }

        setPosition(magnifier, left, top);
        magnifier.style.display = '';
        isVisible = true;

        syncViewport();
        syncScrollBars();
    };

    _this.toggle = () => (_this.isVisible() ? _this.hide() : _this.show());

    init();
    return _this;
}

function checkImageContent() {
    const elItem = LT.itemElement();
    if (!elItem) {
        return;
    }

    const elImages = elItem.querySelectorAll('img');
    if (!elImages || !elImages.length) {
        return;
    }

    elImages.forEach(img => {
        img.addEventListener('click', e => {
            const mag = ensureInstance();
            if (!mag.isVisible()) {
                mag.show(e);
            }
        });
    });
}

export const magnifier = createExtension('magnifier', run, {
    setupButtons,
    hide,
    show,
    toggle,
});
