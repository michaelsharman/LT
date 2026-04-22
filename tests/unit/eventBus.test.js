/**
 * Unit tests for the EventBus singleton exported from src/utils/eventBus.js.
 *
 * The module exports a singleton instance, so we use vi.resetModules() plus a
 * dynamic import in beforeEach to get a fresh instance per test.
 */
import { describe, test, beforeEach, afterEach, expect, vi } from 'vitest';

let eventBus;

beforeEach(async () => {
    vi.resetModules();
    // Silence logger output during tests.
    vi.spyOn(console, 'debug').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    ({ eventBus } = await import('../../src/utils/eventBus.js'));
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe('EventBus', () => {
    describe('on() and emit()', () => {
        test('invokes listener when event is emitted', () => {
            const callback = vi.fn();
            eventBus.on('test:event', callback);
            eventBus.emit('test:event', 'arg1', 'arg2');

            expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('invokes multiple listeners for same event', () => {
            const callback1 = vi.fn();
            const callback2 = vi.fn();

            eventBus.on('test:event', callback1);
            eventBus.on('test:event', callback2);
            eventBus.emit('test:event', 'data');

            expect(callback1).toHaveBeenCalledWith('data');
            expect(callback2).toHaveBeenCalledWith('data');
        });

        test('does not invoke listeners for different events', () => {
            const callback = vi.fn();
            eventBus.on('event:a', callback);
            eventBus.emit('event:b', 'data');

            expect(callback).not.toHaveBeenCalled();
        });

        test('swallows listener errors and continues invoking others', () => {
            const bad = vi.fn(() => {
                throw new Error('boom');
            });
            const good = vi.fn();

            eventBus.on('test:event', bad);
            eventBus.on('test:event', good);

            expect(() => eventBus.emit('test:event', 'x')).not.toThrow();
            expect(bad).toHaveBeenCalledTimes(1);
            expect(good).toHaveBeenCalledWith('x');
        });
    });

    describe('off()', () => {
        test('unsubscribes listener', () => {
            const callback = vi.fn();
            eventBus.on('test:event', callback);
            eventBus.off('test:event', callback);
            eventBus.emit('test:event');

            expect(callback).not.toHaveBeenCalled();
        });

        test('returns unsubscribe function from on()', () => {
            const callback = vi.fn();
            const unsubscribe = eventBus.on('test:event', callback);

            unsubscribe();
            eventBus.emit('test:event');

            expect(callback).not.toHaveBeenCalled();
        });

        test('off() for unknown event is a no-op', () => {
            expect(() => eventBus.off('unknown:event', () => {})).not.toThrow();
        });
    });

    describe('critical event buffering', () => {
        test('buffers critical event item:load', () => {
            eventBus.emit('item:load', { itemId: '123' });
            expect(eventBus.hasBuffered('item:load')).toBe(true);
        });

        test('buffers critical event test:start', () => {
            eventBus.emit('test:start');
            expect(eventBus.hasBuffered('test:start')).toBe(true);
        });

        test('does not buffer non-critical events', () => {
            eventBus.emit('custom:event', 'data');
            expect(eventBus.hasBuffered('custom:event')).toBe(false);
        });

        test('only buffers first occurrence of critical event', () => {
            eventBus.emit('item:load', { first: true });
            eventBus.emit('item:load', { second: true });

            const buffered = eventBus.bufferedEvents.get('item:load');
            expect(buffered.args[0]).toEqual({ first: true });
        });
    });

    describe('event replay', () => {
        test('replays buffered event to late subscriber', () => {
            const callback = vi.fn();

            eventBus.emit('item:load', { itemId: '123' });
            eventBus.on('item:load', callback);

            expect(callback).toHaveBeenCalledWith({ itemId: '123' });
            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('replays with multiple arguments', () => {
            const callback = vi.fn();

            eventBus.emit('test:start', 'arg1', 'arg2', 'arg3');
            eventBus.on('test:start', callback);

            expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
        });

        test('does not replay non-critical events', () => {
            const callback = vi.fn();

            eventBus.emit('custom:event', 'data');
            eventBus.on('custom:event', callback);

            expect(callback).not.toHaveBeenCalled();
        });

        test('replay catches subscriber errors without throwing', () => {
            const bad = vi.fn(() => {
                throw new Error('replay boom');
            });

            eventBus.emit('item:load', { itemId: '123' });
            expect(() => eventBus.on('item:load', bad, 'badSubscriber')).not.toThrow();
            expect(bad).toHaveBeenCalledWith({ itemId: '123' });
        });
    });

    describe('markReady()', () => {
        test('clears buffered events', () => {
            eventBus.emit('item:load', { itemId: '123' });
            eventBus.emit('test:start');

            expect(eventBus.hasBuffered('item:load')).toBe(true);
            expect(eventBus.hasBuffered('test:start')).toBe(true);

            eventBus.markReady();

            expect(eventBus.hasBuffered('item:load')).toBe(false);
            expect(eventBus.hasBuffered('test:start')).toBe(false);
        });

        test('sets extensionsReady flag', () => {
            expect(eventBus.extensionsReady).toBe(false);
            eventBus.markReady();
            expect(eventBus.extensionsReady).toBe(true);
        });

        test('does not replay events after markReady', () => {
            const callback = vi.fn();

            eventBus.emit('item:load', { itemId: '123' });
            eventBus.markReady();
            eventBus.on('item:load', callback);

            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe('listenerCount()', () => {
        test('returns 0 for event with no listeners', () => {
            expect(eventBus.listenerCount('unknown:event')).toBe(0);
        });

        test('returns correct count', () => {
            eventBus.on('test:event', () => {});
            eventBus.on('test:event', () => {});

            expect(eventBus.listenerCount('test:event')).toBe(2);
        });

        test('decreases when listener removed', () => {
            const callback = vi.fn();
            eventBus.on('test:event', callback);
            eventBus.on('test:event', () => {});

            expect(eventBus.listenerCount('test:event')).toBe(2);

            eventBus.off('test:event', callback);

            expect(eventBus.listenerCount('test:event')).toBe(1);
        });
    });
});
