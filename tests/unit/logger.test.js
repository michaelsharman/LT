/**
 * Unit tests for src/utils/logger.js.
 * Each level writes via the matching console method with a styled prefix,
 * except `log` which is pass-through.
 */
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import logger from '../../src/utils/logger.js';

describe('logger', () => {
    const spies = {};

    beforeEach(() => {
        spies.debug = vi.spyOn(console, 'debug').mockImplementation(() => {});
        spies.error = vi.spyOn(console, 'error').mockImplementation(() => {});
        spies.info = vi.spyOn(console, 'info').mockImplementation(() => {});
        spies.log = vi.spyOn(console, 'log').mockImplementation(() => {});
        spies.warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('exposes debug, error, info, log, and warn', () => {
        expect(typeof logger.debug).toBe('function');
        expect(typeof logger.error).toBe('function');
        expect(typeof logger.info).toBe('function');
        expect(typeof logger.log).toBe('function');
        expect(typeof logger.warn).toBe('function');
    });

    test('debug() writes to console.debug with "Debug:" prefix', () => {
        logger.debug('hello', 42);
        expect(spies.debug).toHaveBeenCalledTimes(1);
        const [first, , , ...rest] = spies.debug.mock.calls[0];
        expect(first).toBe('%cDebug:');
        expect(rest).toEqual(['hello', 42]);
    });

    test('error() writes to console.error with "Error:" prefix', () => {
        logger.error('oops');
        expect(spies.error).toHaveBeenCalledTimes(1);
        expect(spies.error.mock.calls[0][0]).toBe('%cError:');
        expect(spies.error.mock.calls[0].at(-1)).toBe('oops');
    });

    test('info() writes to console.info with "Info:" prefix', () => {
        logger.info('note');
        expect(spies.info).toHaveBeenCalledTimes(1);
        expect(spies.info.mock.calls[0][0]).toBe('%cInfo:');
        expect(spies.info.mock.calls[0].at(-1)).toBe('note');
    });

    test('warn() writes to console.warn with "Warning:" prefix', () => {
        logger.warn('careful');
        expect(spies.warn).toHaveBeenCalledTimes(1);
        expect(spies.warn.mock.calls[0][0]).toBe('%cWarning:');
        expect(spies.warn.mock.calls[0].at(-1)).toBe('careful');
    });

    test('log() is a plain pass-through to console.log', () => {
        logger.log('a', 'b', 'c');
        expect(spies.log).toHaveBeenCalledTimes(1);
        expect(spies.log.mock.calls[0]).toEqual(['a', 'b', 'c']);
    });

    test('levels do not cross-invoke each other', () => {
        logger.warn('w');
        expect(spies.debug).not.toHaveBeenCalled();
        expect(spies.error).not.toHaveBeenCalled();
        expect(spies.info).not.toHaveBeenCalled();
        expect(spies.log).not.toHaveBeenCalled();
    });

    test('prefix arguments include a style string and an empty separator', () => {
        logger.info('x');
        const call = spies.info.mock.calls[0];
        // Shape: ['%cInfo:', <styleString>, '', ...messages]
        expect(typeof call[1]).toBe('string');
        expect(call[1]).toContain('background-color');
        expect(call[2]).toBe('');
    });
});
