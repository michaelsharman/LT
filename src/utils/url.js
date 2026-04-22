/**
 * A utility URL object.
 * @module Utils/Url
 */

/**
 * Checks whether a URL points to a PDF resource by inspecting
 * the parsed pathname only. Query strings and hash fragments
 * are ignored, and relative URLs are resolved against the
 * current document.
 * @since 3.0.0
 * @param {string} url
 * @returns {boolean}
 */
export function isPdfUrl(url) {
    try {
        const u = new URL(url, window.location.href);
        return u.pathname.toLowerCase().endsWith('.pdf');
    } catch {
        return false;
    }
}
