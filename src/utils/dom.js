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
