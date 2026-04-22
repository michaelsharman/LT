/**
 * Unit tests for src/utils/memoryMonitor.js.
 * performance.memory is non-standard and not provided by happy-dom, so each
 * test that needs it installs a stub and restores afterwards.
 */
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import MemoryMonitor from '../../src/utils/memoryMonitor.js';

const MB = 1048576;

function stubMemory(usedMB) {
    Object.defineProperty(performance, 'memory', {
        configurable: true,
        value: {
            usedJSHeapSize: usedMB * MB,
            totalJSHeapSize: 500 * MB,
            jsHeapSizeLimit: 4096 * MB,
        },
    });
}

function removeMemory() {
    if ('memory' in performance) {
        delete performance.memory;
    }
}

describe('MemoryMonitor - construction', () => {
    test('initial state is idle with empty measurements', () => {
        const m = new MemoryMonitor();
        expect(m.measurements).toEqual([]);
        expect(m.isMonitoring).toBe(false);
        expect(m.timerId).toBeNull();
        expect(m.intervalMs).toBe(5000);
        expect(m.baselineMB).toBeNull();
        expect(m.baselineTs).toBeNull();
    });
});

describe('MemoryMonitor - startMonitoring()', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        vi.spyOn(console, 'debug').mockImplementation(() => {});
        vi.spyOn(console, 'table').mockImplementation(() => {});
        vi.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
        removeMemory();
    });

    test('warns and bails when performance.memory is unavailable', () => {
        removeMemory();
        const m = new MemoryMonitor();
        m.startMonitoring(1000);

        expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('performance.memory'));
        expect(m.isMonitoring).toBe(false);
        expect(m.measurements).toEqual([]);
    });

    test('records baseline, starts sampling, and respects intervalMs', () => {
        stubMemory(100);
        const m = new MemoryMonitor();
        m.startMonitoring(1000);

        expect(m.isMonitoring).toBe(true);
        expect(m.intervalMs).toBe(1000);
        expect(m.baselineMB).toBe(100);
        expect(typeof m.baselineTs).toBe('number');
        expect(m.measurements).toHaveLength(1);

        vi.advanceTimersByTime(1000);
        expect(m.measurements).toHaveLength(2);

        vi.advanceTimersByTime(3000);
        expect(m.measurements).toHaveLength(5);

        m.stopMonitoring();
    });

    test('stopMonitoring() halts the sampling loop', () => {
        stubMemory(50);
        const m = new MemoryMonitor();
        m.startMonitoring(1000);

        vi.advanceTimersByTime(1000);
        const before = m.measurements.length;

        m.stopMonitoring();
        vi.advanceTimersByTime(5000);

        expect(m.isMonitoring).toBe(false);
        expect(m.timerId).toBeNull();
        expect(m.measurements).toHaveLength(before);
    });

    test('caps measurements at 100 entries', () => {
        stubMemory(10);
        const m = new MemoryMonitor();
        m.startMonitoring(10);

        // 1 initial + 200 more ticks = would be 201 without the cap.
        vi.advanceTimersByTime(10 * 200);

        expect(m.measurements.length).toBe(100);
        m.stopMonitoring();
    });
});

describe('MemoryMonitor - detectMemoryLeaks()', () => {
    test('returns false when fewer measurements than windowSize', () => {
        const m = new MemoryMonitor();
        m.measurements = [{ used: 1, timestamp: 0 }];
        expect(m.detectMemoryLeaks(10, 1000)).toBe(false);
    });

    test('returns false for flat usage (no growth)', () => {
        const m = new MemoryMonitor();
        m.intervalMs = 1000;
        m.measurements = Array.from({ length: 10 }, (_, i) => ({ used: 1000, timestamp: i }));

        expect(m.detectMemoryLeaks(10, 1000)).toBe(false);
    });

    test('returns true when growth rate exceeds threshold', () => {
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        vi.spyOn(console, 'table').mockImplementation(() => {});
        vi.spyOn(console, 'log').mockImplementation(() => {});

        const m = new MemoryMonitor();
        m.intervalMs = 1000;
        // 10 samples, used goes from 0 to 10MB across 10s => 1MB/s = 1,048,576 B/s
        m.measurements = Array.from({ length: 10 }, (_, i) => ({ used: i * MB, timestamp: i }));

        expect(m.detectMemoryLeaks(10, 1000)).toBe(true);
        expect(console.warn).toHaveBeenCalled();
    });
});

describe('MemoryMonitor - analyzeMemoryPattern()', () => {
    test('returns empty pattern and null stats when no measurements', () => {
        const m = new MemoryMonitor();
        const { pattern, stats } = m.analyzeMemoryPattern(20);
        expect(pattern).toEqual([]);
        expect(stats).toBeNull();
    });

    test('returns a compact pattern and shaped stats from measurements', () => {
        const m = new MemoryMonitor();
        m.measurements = Array.from({ length: 5 }, (_, i) => ({
            used: (100 + i) * MB,
            timestamp: i * 60000,
        }));

        const { pattern, stats } = m.analyzeMemoryPattern();

        expect(pattern).toHaveLength(5);
        expect(pattern[0]).toEqual({ usedMB: 100, ts: 0 });
        expect(stats).toEqual(
            expect.objectContaining({
                count: 5,
                minMB: 100,
                maxMB: 104,
                avgMB: 102,
                slopeMBperMin: expect.any(Number),
                r2: expect.any(Number),
                leakSuspect: expect.any(Boolean),
            })
        );
    });
});

describe('MemoryMonitor - internal branches', () => {
    test('monitorMemory() is a no-op when isMonitoring is false', () => {
        const m = new MemoryMonitor();
        expect(() => m.monitorMemory()).not.toThrow();
        expect(m.measurements).toHaveLength(0);
        expect(m.timerId).toBeNull();
    });

    test('analyzeMemoryPattern() with a single measurement yields zero slope and r2', () => {
        const m = new MemoryMonitor();
        m.measurements = [{ used: 50 * MB, timestamp: 0 }];

        const { pattern, stats } = m.analyzeMemoryPattern();

        expect(pattern).toHaveLength(1);
        expect(stats).toEqual(
            expect.objectContaining({
                count: 1,
                minMB: 50,
                maxMB: 50,
                avgMB: 50,
                slopeMBperMin: 0,
                r2: 0,
                leakSuspect: false,
            })
        );
    });

    test('printReport() logs "Approx delta since baseline" when a baseline is set', () => {
        vi.useFakeTimers();
        vi.spyOn(console, 'table').mockImplementation(() => {});
        vi.spyOn(console, 'debug').mockImplementation(() => {});
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

        stubMemory(100);
        const m = new MemoryMonitor();
        m.startMonitoring(1000);

        m.printReport(5);

        const deltaLogged = logSpy.mock.calls.some(
            args => typeof args[0] === 'string' && args[0].includes('Approx delta since baseline')
        );
        expect(deltaLogged).toBe(true);

        m.stopMonitoring();
        vi.useRealTimers();
        vi.restoreAllMocks();
        removeMemory();
    });
});
