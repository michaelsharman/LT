import logger from './logger.js';

/**
 * Critical events that should be buffered if they fire before extensions load.
 * These events typically fire during Learnosity API initialization.
 */
const CRITICAL_EVENTS = ['item:load', 'item:changed', 'test:start', 'test:reading:start'];

/**
 * Local event bus for LT that routes all Learnosity API events.
 * Extensions listen to this instead of directly to itemsApp.
 *
 * Benefits:
 * - Buffers critical events that fire before extensions are ready
 * - Automatically replays buffered events when extensions subscribe
 * - Decouples extensions from Learnosity's event system
 *
 * @class EventBus
 * @since 3.0.0
 */
class EventBus {
    constructor() {
        /** @type {Map<string, Set<Function>>} */
        this.listeners = new Map();

        /** @type {Map<string, {args: any[], timestamp: number}>} */
        this.bufferedEvents = new Map();

        /** @type {boolean} */
        this.extensionsReady = false;
    }

    /**
     * Subscribe to an event. If this is a critical event that was buffered,
     * immediately invoke the listener with the buffered data.
     *
     * @param {string} eventName - The event name to listen for
     * @param {Function} callback - The callback to invoke when event fires
     * @param {string} [subscriberName] - Optional name of the subscriber (for debugging)
     * @returns {Function} Unsubscribe function
     */
    on(eventName, callback, subscriberName) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, new Set());
        }
        this.listeners.get(eventName).add(callback);

        // If this event was buffered and extensions aren't marked ready yet,
        // immediately invoke the callback with buffered data
        if (this.bufferedEvents.has(eventName)) {
            const { args } = this.bufferedEvents.get(eventName);
            const subscriber = subscriberName ? ` (${subscriberName})` : '';
            logger.debug(`[EventBus] Replaying buffered "${eventName}" to new listener${subscriber}`);
            try {
                callback(...args);
            } catch (error) {
                logger.error(`[EventBus] Error replaying "${eventName}"${subscriber}`, error);
            }
        }

        // Return unsubscribe function
        return () => this.off(eventName, callback);
    }

    /**
     * Unsubscribe from an event.
     *
     * @param {string} eventName - The event name
     * @param {Function} callback - The callback to remove
     */
    off(eventName, callback) {
        const listeners = this.listeners.get(eventName);
        if (listeners) {
            listeners.delete(callback);
        }
    }

    /**
     * Emit an event to all registered listeners.
     * If this is a critical event and extensions aren't ready, buffer it.
     *
     * @param {string} eventName - The event name to emit
     * @param {...any} args - Arguments to pass to listeners
     */
    emit(eventName, ...args) {
        // Buffer critical events if they haven't been buffered yet
        if (CRITICAL_EVENTS.includes(eventName) && !this.bufferedEvents.has(eventName)) {
            this.bufferedEvents.set(eventName, {
                args,
                timestamp: Date.now(),
            });
            logger.debug(`[EventBus] Buffered first occurrence of "${eventName}"`);
        }

        // Invoke all registered listeners
        const listeners = this.listeners.get(eventName);
        if (listeners && listeners.size > 0) {
            listeners.forEach(callback => {
                try {
                    callback(...args);
                } catch (error) {
                    logger.error(`[EventBus] Error in listener for "${eventName}"`, error);
                }
            });
        }
    }

    /**
     * Mark extensions as ready and clear the buffer.
     * Called after all extensions have been initialized.
     */
    markReady() {
        this.extensionsReady = true;
        this.bufferedEvents.clear();
        logger.debug('[EventBus] Extensions ready, buffer cleared');
    }

    /**
     * Check if an event has been buffered.
     *
     * @param {string} eventName - The event name to check
     * @returns {boolean}
     */
    hasBuffered(eventName) {
        return this.bufferedEvents.has(eventName);
    }

    /**
     * Get the number of listeners for an event.
     *
     * @param {string} eventName - The event name
     * @returns {number}
     */
    listenerCount(eventName) {
        const listeners = this.listeners.get(eventName);
        return listeners ? listeners.size : 0;
    }
}

/**
 * Singleton instance of the event bus.
 * @type {EventBus}
 */
export const eventBus = new EventBus();

