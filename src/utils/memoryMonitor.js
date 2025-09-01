import logger from './logger.js';

export default class MemoryMonitor {
    constructor() {
        this.measurements = [];
        this.isMonitoring = false;
        this.timerId = null;
        this.intervalMs = 5000; // default sample interval

        this.baselineMB = null;
        this.baselineTs = null;
    }

    startMonitoring(intervalMs = 5000) {
        if (!('memory' in performance)) {
            console.warn('performance.memory not available');
            return;
        }
        this.intervalMs = intervalMs;

        this.baselineMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
        this.baselineTs = Date.now();

        this.isMonitoring = true;
        this.monitorMemory();
    }

    monitorMemory() {
        if (!this.isMonitoring) {
            return;
        }

        const memInfo = {
            used: performance.memory.usedJSHeapSize,
            total: performance.memory.totalJSHeapSize,
            limit: performance.memory.jsHeapSizeLimit,
            timestamp: Date.now(),
        };
        this.measurements.push(memInfo);

        // Keep only last 100 measurements
        if (this.measurements.length > 100) {
            this.measurements.shift();
        }

        // Check for memory leaks
        this.detectMemoryLeaks();

        // schedule next tick
        this.timerId = setTimeout(() => this.monitorMemory(), this.intervalMs);
    }

    stopMonitoring() {
        this.isMonitoring = false;
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    }

    detectMemoryLeaks(windowSize = 10, thresholdBytesPerSec = 1000) {
        if (this.measurements.length < windowSize) {
            return false;
        }

        const recent = this.measurements.slice(-windowSize);
        const growth = recent[recent.length - 1].used - recent[0].used;
        // bytes per ms, then convert to bytes/sec for the threshold
        const growthRateBytesPerSec = (growth / (windowSize * this.intervalMs)) * 1000;

        if (growthRateBytesPerSec > thresholdBytesPerSec) {
            logger.warn('⚠️ Potential memory leak detected:', {
                growthMB: (growth / 1048576).toFixed(2),
                rateBps: growthRateBytesPerSec.toFixed(2),
            });
            // optional: emit a quick report
            this.printReport(Math.min(20, this.measurements.length));
            return true;
        }
        return false;
    }

    /**
     * Build a compact pattern and stats from the latest window of measurements.
     * @param {number} windowSize number of points to include (default 20)
     * @returns {{ pattern: Array<{usedMB:number, ts:number}>, stats: {count:number,minMB:number,maxMB:number,avgMB:number,slopeMBperMin:number,r2:number,leakSuspect:boolean} | null }}
     */
    analyzeMemoryPattern(windowSize = 20) {
        const slice = this.measurements.slice(-windowSize);
        const pattern = slice.map(m => ({
            usedMB: Math.round(m.used / 1048576), // MB
            ts: m.timestamp,
        }));
        const stats = this.#summarize(pattern);
        return { pattern, stats };
    }

    /**
     * Convenience method: prints a table and stats to the console.
     * Returns the same object as analyzeMemoryPattern for further use.
     */
    printReport(windowSize = 20) {
        const { pattern, stats } = this.analyzeMemoryPattern(windowSize);
        console.table(
            pattern.map(p => ({
                time: new Date(p.ts).toLocaleTimeString(),
                usedMB: p.usedMB,
            }))
        );

        if (this.baselineMB != null && pattern.length) {
            const last = pattern.at(-1).usedMB;
            const delta = last - this.baselineMB;
            const when = this.baselineTs ? new Date(this.baselineTs).toLocaleTimeString() : 'baseline';
            logger.log(`Approx delta since baseline (${when}): ${delta.toFixed(1)} MB`);
        }

        logger.log('Memory stats:', stats);
        return { pattern, stats };
    }

    // --- helpers -------------------------------------------------------------

    #summarize(pattern) {
        if (!pattern.length) {
            return null;
        }

        const ys = pattern.map(p => p.usedMB);
        const minMB = Math.min(...ys);
        const maxMB = Math.max(...ys);
        const avgMB = +(ys.reduce((a, b) => a + b, 0) / ys.length).toFixed(2);

        const t0 = pattern[0].ts;
        const xs = pattern.map(p => (p.ts - t0) / 60000); // minutes since first sample
        const { slope, r2 } = this.#linreg(xs, ys); // slope in MB/min

        return {
            count: pattern.length,
            minMB,
            maxMB,
            avgMB,
            slopeMBperMin: +slope.toFixed(3),
            r2: +r2.toFixed(3),
            leakSuspect: slope > 0.5 && r2 > 0.6, // tweak for your needs
        };
    }

    #linreg(xs, ys) {
        const n = xs.length;
        if (n < 2) {
            return { slope: 0, intercept: ys[0] ?? 0, r2: 0 };
        }

        const sumX = xs.reduce((a, x) => a + x, 0);
        const sumY = ys.reduce((a, y) => a + y, 0);
        const sumXY = xs.reduce((a, x, i) => a + x * ys[i], 0);
        const sumXX = xs.reduce((a, x) => a + x * x, 0);

        const meanX = sumX / n;
        const meanY = sumY / n;

        const num = sumXY - n * meanX * meanY;
        const den = sumXX - n * meanX * meanX;
        const slope = den ? num / den : 0;
        const intercept = meanY - slope * meanX;

        const ssTot = ys.reduce((a, y) => a + (y - meanY) ** 2, 0);
        const ssRes = ys.reduce((a, y, i) => a + (y - (slope * xs[i] + intercept)) ** 2, 0);
        const r2 = ssTot ? 1 - ssRes / ssTot : 0;

        return { slope, intercept, r2 };
    }
}
