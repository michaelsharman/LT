import { diagnostics } from '../core/diagnostics.js';

/**
 * A utility object relating to Author API styling.
 * @module Utils/Styling
 * @ignore
 */

/**
 * Checks for Author API version to determine if we need to
 * add a new CSS string to certain classnames.
 * @since 2.23.0
 * @ignore
 * @param {string} prefix The current state.classNamePrefix value.
 */
export function checkAppVersion(prefix) {
    if (prefix === null && diagnostics()?.versions?.concrete) {
        const appVersion = parseFloat(diagnostics().versions.concrete.replace(/^v/, '').split('.').slice(0, 2).join(''));

        prefix = appVersion >= 2227 ? 'author-' : '';
    }

    return prefix;
}
