/**
 * A utility logger that generates styled
 * log outputs.
 * @module Logger
 */

/**
 * Formatted error logger to the console
 * @static
 * @since 0.1.0
 * @param {*} msg
 */
export function error(msg) {
    let style = 'display:inline-block;background-color:#e0005a;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px';
    console.error('%cError:%c ' + msg, style, '');
}

/**
 * Formatted info logger to the console
 * @static
 * @since 0.1.0
 * @param {*} msg
 */
export function info(msg) {
    let style = 'display:inline-block;background-color:#46C0FF;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px';
    console.info('%cInfo:%c ' + msg, style, '');
}

/**
 * Generic logger to the console
 * @static
 * @since 0.1.0
 * @param {*} msg
 */
export function log(msg) {
    console.log(msg);
}

/**
 * Formatted warning logger to the console
 * @static
 * @since 0.1.0
 * @param {*} msg
 */
export function warn(msg, type = 'log') {
    let style = 'display:inline-block;background-color:gold;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px';
    console.warn('%cWarning:%c ' + msg, style, '');
}
