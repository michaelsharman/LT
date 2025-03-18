/**
 * A utility logger that generates styled log outputs.
 * @module Utils/Logger
 */

/**
 * Debug only logs to the console when verbose (or debug) mode is enabled.
 * @static
 * @since 2.10.0
 * @param {*} msg
 */
function debug(...msg) {
    let style = 'display:inline-block;background-color:purple;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px';
    console.debug('%cDebug:', style, '', ...msg);
}

/**
 * Formatted error logger to the console
 * @static
 * @since 0.1.0
 * @param {*} msg
 */
function error(...msg) {
    let style = 'display:inline-block;background-color:#e0005a;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px';
    console.error('%cError:', style, '', ...msg);
}

/**
 * Formatted info logger to the console
 * @static
 * @since 0.1.0
 * @param {*} msg
 */
function info(...msg) {
    let style = 'display:inline-block;background-color:#46C0FF;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px';
    console.info('%cInfo:', style, '', ...msg);
}

/**
 * Generic logger to the console
 * @static
 * @since 0.1.0
 * @param {*} msg
 */
function log(...msg) {
    console.log(...msg);
}

/**
 * Formatted warning logger to the console
 * @static
 * @since 0.1.0
 * @param {*} msg
 */
function warn(...msg) {
    let style = 'display:inline-block;background-color:gold;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px';
    console.warn('%cWarning:', style, '', ...msg);
}

const logger = {
    debug,
    error,
    info,
    log,
    warn,
};

export default logger;
