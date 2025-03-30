import logger from './logger';

/**
 * A utility DOM object.
 * @module Utils/Dom
 */

/**
 * Checks DOM element for existence. If not found we retry
 * n number of times with a delay.
 * @since 2.22.2
 * @param {string} id
 * @param {*} callback
 * @param {number} retries
 */
export function waitForElement(id, callback, retries = 5) {
    const element = document.getElementById(id);
    if (element) {
        callback(element);
    } else if (retries > 0) {
        setTimeout(() => waitForElement(id, callback, retries - 1), 10);
    } else {
        console.warn(`Element with ID "${id}" not found after ${retries} attempts.`);
    }
}

/**
 * Observe the DOM for the first appearance of an element matching the selector.
 * Prevents multiple observers from being created for the same selector.
 *
 * @param {string} selector - CSS selector to watch for.
 * @param {function} callback - Function to call when element is found.
 * @param {object} [options] - The root element to observe (options.root).
 * @param {object} [state] - Cache of any current active observers (state.activeObservers).
 * @returns {function} disconnect - Call to stop observing manually.
 * @since 2.24.0
 * @ignore
 */
export function setObserver(selector, callback, options, state) {
    const root = options.root || document.body;

    const observeConfig = {
        childList: true,
        subtree: true,
        ...options.observeConfig,
    };

    // Prevent duplicate observers for the same selector
    if (state.activeObservers.has(selector)) {
        logger.debug(`${state.logPrefix}Already observing`, selector);
        return () => {};
    }

    // Check immediately for element already in the DOM
    const existing = root.querySelector(selector);
    if (existing) {
        logger.debug(`${state.logPrefix}Element already in DOM`, selector);
        callback(existing);
        return () => {};
    }

    // Register selector to prevent duplicate observers
    state.activeObservers.add(selector);

    const observer = new MutationObserver((mutations, observerInstance) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }

            for (const node of mutation.addedNodes) {
                if (node.nodeType !== 1) {
                    continue;
                }
                logger.debug(`${state.logPrefix}Observing changes: `, root, node);

                if (node.matches && node.matches(selector)) {
                    observerInstance.disconnect();
                    logger.debug(`${state.logPrefix}Disconnecting ${selector}`);
                    state.activeObservers.delete(selector);
                    callback(node);
                    return;
                }

                if (node.querySelector) {
                    const match = node.querySelector(selector);
                    if (match) {
                        observerInstance.disconnect();
                        logger.debug(`${state.logPrefix}Disconnecting ${selector}`);
                        state.activeObservers.delete(selector);
                        callback(match);
                        return;
                    }
                }
            }
        }
    });

    logger.debug(`${state.logPrefix}Observing for ${selector}`);
    observer.observe(root, observeConfig);

    return function disconnect() {
        observer.disconnect();
        state.activeObservers.delete(selector);
    };
}
