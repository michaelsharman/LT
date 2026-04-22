/**
 * Unit tests for src/utils/dom.js.
 * Uses happy-dom's MutationObserver and document.
 */
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { waitForElement, setObserver } from '../../src/utils/dom.js';

describe('waitForElement()', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        vi.useFakeTimers();
        vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
        document.body.innerHTML = '';
    });

    test('invokes callback immediately when element already exists', () => {
        const div = document.createElement('div');
        div.id = 'target';
        document.body.appendChild(div);

        const cb = vi.fn();
        waitForElement('target', cb);

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb.mock.calls[0][0]).toBe(div);
    });

    test('retries and fires callback once the element appears', () => {
        const cb = vi.fn();
        waitForElement('late', cb, 5);

        expect(cb).not.toHaveBeenCalled();

        vi.advanceTimersByTime(10);
        expect(cb).not.toHaveBeenCalled();

        const div = document.createElement('div');
        div.id = 'late';
        document.body.appendChild(div);

        vi.advanceTimersByTime(10);
        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb.mock.calls[0][0]).toBe(div);
    });

    test('emits a console.warn after exhausting retries', () => {
        const cb = vi.fn();
        waitForElement('never', cb, 2);

        vi.advanceTimersByTime(10); // attempt 2
        vi.advanceTimersByTime(10); // attempt 3 -> 0 retries left

        expect(cb).not.toHaveBeenCalled();
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn.mock.calls[0][0]).toContain('never');
    });
});

describe('setObserver()', () => {
    let state;

    beforeEach(() => {
        document.body.innerHTML = '';
        state = { activeObservers: new Set(), logPrefix: '[test] ' };
        vi.spyOn(console, 'debug').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
        document.body.innerHTML = '';
    });

    test('invokes callback immediately when selector is already present', () => {
        const span = document.createElement('span');
        span.className = 'already-here';
        document.body.appendChild(span);

        const cb = vi.fn();
        setObserver('.already-here', cb, { state });

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb.mock.calls[0][0]).toBe(span);
    });

    test('skips when the same selector is already being observed', () => {
        state.activeObservers.add('.dup');
        const cb = vi.fn();

        setObserver('.dup', cb, { state });

        expect(cb).not.toHaveBeenCalled();
    });

    test('invokes callback when a matching element is added later', async () => {
        const cb = vi.fn();
        setObserver('.arrives-late', cb, { state });

        expect(cb).not.toHaveBeenCalled();
        expect(state.activeObservers.has('.arrives-late')).toBe(true);

        const el = document.createElement('div');
        el.className = 'arrives-late';
        document.body.appendChild(el);

        // MutationObserver delivers microtask-style in happy-dom; yield once.
        await Promise.resolve();
        await Promise.resolve();

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb.mock.calls[0][0]).toBe(el);
        expect(state.activeObservers.has('.arrives-late')).toBe(false);
    });

    test('invokes callback when the selector appears as a descendant of an added node', async () => {
        const cb = vi.fn();
        setObserver('.nested', cb, { state });

        const wrapper = document.createElement('div');
        const inner = document.createElement('span');
        inner.className = 'nested';
        wrapper.appendChild(inner);
        document.body.appendChild(wrapper);

        await Promise.resolve();
        await Promise.resolve();

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb.mock.calls[0][0]).toBe(inner);
    });

    test('dispatches a CustomEvent on document when dispatchEvent is true', async () => {
        const cb = vi.fn();
        const eventHandler = vi.fn();
        document.addEventListener('lt:custom', eventHandler);

        setObserver('.notify', cb, { state, dispatchEvent: true, name: 'lt:custom' });

        const el = document.createElement('div');
        el.className = 'notify';
        document.body.appendChild(el);

        await Promise.resolve();
        await Promise.resolve();

        expect(eventHandler).toHaveBeenCalledTimes(1);
        expect(eventHandler.mock.calls[0][0].type).toBe('lt:custom');
        document.removeEventListener('lt:custom', eventHandler);
    });
});
