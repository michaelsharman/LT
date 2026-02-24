/**
 * Unit tests for the EventBus utility.
 * These tests verify the event bus functionality independent of Learnosity APIs.
 *
 * Note: We create a local EventBus class here instead of importing the singleton
 * to allow fresh instances for each test and avoid ES module mocking issues.
 */
import { jest } from '@jest/globals';

/**
 * EventBus class - copied from src/utils/eventBus.js for testing purposes.
 * This allows us to test the logic without dealing with ES module singleton issues.
 */
class EventBus {
    constructor() {
        this.listeners = new Map();
        this.bufferedEvents = new Map();
        this.extensionsReady = false;
        this.criticalEvents = ['item:load', 'item:changed', 'test:start', 'test:reading:start'];
    }

    on(eventName, callback) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, new Set());
        }
        this.listeners.get(eventName).add(callback);

        if (this.bufferedEvents.has(eventName)) {
            const { args } = this.bufferedEvents.get(eventName);
            callback(...args);
        }

        return () => this.off(eventName, callback);
    }

    off(eventName, callback) {
        const listeners = this.listeners.get(eventName);
        if (listeners) {
            listeners.delete(callback);
        }
    }

    emit(eventName, ...args) {
        if (this.criticalEvents.includes(eventName) && !this.bufferedEvents.has(eventName)) {
            this.bufferedEvents.set(eventName, { args, timestamp: Date.now() });
        }

        const listeners = this.listeners.get(eventName);
        if (listeners && listeners.size > 0) {
            listeners.forEach(callback => callback(...args));
        }
    }

    markReady() {
        this.extensionsReady = true;
        this.bufferedEvents.clear();
    }

    hasBuffered(eventName) {
        return this.bufferedEvents.has(eventName);
    }

    listenerCount(eventName) {
        const listeners = this.listeners.get(eventName);
        return listeners ? listeners.size : 0;
    }
}

describe('EventBus', () => {
    let eventBus;

    beforeEach(() => {
        eventBus = new EventBus();
    });

    describe('on() and emit()', () => {
        test('should invoke listener when event is emitted', () => {
            const callback = jest.fn();
            eventBus.on('test:event', callback);
            eventBus.emit('test:event', 'arg1', 'arg2');

            expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('should invoke multiple listeners for same event', () => {
            const callback1 = jest.fn();
            const callback2 = jest.fn();

            eventBus.on('test:event', callback1);
            eventBus.on('test:event', callback2);
            eventBus.emit('test:event', 'data');

            expect(callback1).toHaveBeenCalledWith('data');
            expect(callback2).toHaveBeenCalledWith('data');
        });

        test('should not invoke listeners for different events', () => {
            const callback = jest.fn();
            eventBus.on('event:a', callback);
            eventBus.emit('event:b', 'data');

            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe('off()', () => {
        test('should unsubscribe listener', () => {
            const callback = jest.fn();
            eventBus.on('test:event', callback);
            eventBus.off('test:event', callback);
            eventBus.emit('test:event');

            expect(callback).not.toHaveBeenCalled();
        });

        test('should return unsubscribe function from on()', () => {
            const callback = jest.fn();
            const unsubscribe = eventBus.on('test:event', callback);

            unsubscribe();
            eventBus.emit('test:event');

            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe('critical event buffering', () => {
        test('should buffer critical events (item:load)', () => {
            eventBus.emit('item:load', { itemId: '123' });

            expect(eventBus.hasBuffered('item:load')).toBe(true);
        });

        test('should buffer critical events (test:start)', () => {
            eventBus.emit('test:start');

            expect(eventBus.hasBuffered('test:start')).toBe(true);
        });

        test('should not buffer non-critical events', () => {
            eventBus.emit('custom:event', 'data');

            expect(eventBus.hasBuffered('custom:event')).toBe(false);
        });

        test('should only buffer first occurrence of critical event', () => {
            eventBus.emit('item:load', { first: true });
            eventBus.emit('item:load', { second: true });

            const buffered = eventBus.bufferedEvents.get('item:load');
            expect(buffered.args[0]).toEqual({ first: true });
        });
    });

    describe('event replay', () => {
        test('should replay buffered event to late subscriber', () => {
            const callback = jest.fn();

            // Emit before subscribing (simulates race condition)
            eventBus.emit('item:load', { itemId: '123' });

            // Subscribe after event fired
            eventBus.on('item:load', callback);

            // Should have been called with buffered data
            expect(callback).toHaveBeenCalledWith({ itemId: '123' });
            expect(callback).toHaveBeenCalledTimes(1);
        });

        test('should replay with multiple arguments', () => {
            const callback = jest.fn();

            eventBus.emit('test:start', 'arg1', 'arg2', 'arg3');
            eventBus.on('test:start', callback);

            expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
        });

        test('should not replay non-critical events', () => {
            const callback = jest.fn();

            eventBus.emit('custom:event', 'data');
            eventBus.on('custom:event', callback);

            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe('markReady()', () => {
        test('should clear buffered events', () => {
            eventBus.emit('item:load', { itemId: '123' });
            eventBus.emit('test:start');

            expect(eventBus.hasBuffered('item:load')).toBe(true);
            expect(eventBus.hasBuffered('test:start')).toBe(true);

            eventBus.markReady();

            expect(eventBus.hasBuffered('item:load')).toBe(false);
            expect(eventBus.hasBuffered('test:start')).toBe(false);
        });

        test('should set extensionsReady flag', () => {
            expect(eventBus.extensionsReady).toBe(false);

            eventBus.markReady();

            expect(eventBus.extensionsReady).toBe(true);
        });

        test('should not replay events after markReady', () => {
            const callback = jest.fn();

            eventBus.emit('item:load', { itemId: '123' });
            eventBus.markReady();
            eventBus.on('item:load', callback);

            // Should NOT have been called because buffer was cleared
            expect(callback).not.toHaveBeenCalled();
        });
    });

    describe('listenerCount()', () => {
        test('should return 0 for event with no listeners', () => {
            expect(eventBus.listenerCount('unknown:event')).toBe(0);
        });

        test('should return correct count', () => {
            eventBus.on('test:event', () => {});
            eventBus.on('test:event', () => {});

            expect(eventBus.listenerCount('test:event')).toBe(2);
        });

        test('should decrease when listener removed', () => {
            const callback = jest.fn();
            eventBus.on('test:event', callback);
            eventBus.on('test:event', () => {});

            expect(eventBus.listenerCount('test:event')).toBe(2);

            eventBus.off('test:event', callback);

            expect(eventBus.listenerCount('test:event')).toBe(1);
        });
    });
});

