/**
 * A utility validation object.
 * @module Utils/Validation
 */

/**
 * Checks value for existence. The following are
 * falsy:
 * - null
 * - undefined
 * - ''
 * - []
 * - {}
 * @since 2.11.0
 * @param {any} value
 * @returns {boolean}
 */
export function hasValue(value) {
    if (value === null || value === undefined) {
        return false;
    }

    const type = typeof value;
    switch (type) {
        case 'string':
            return value.trim() !== '';
        case 'object':
            if (Array.isArray(value)) {
                return value.length > 0;
            } else {
                return Object.keys(value).length > 0;
            }
        default:
            return true;
    }
}

/**
 * Checks whether an object is empty
 * @since 2.23.1
 * @param {Object} obj
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}
