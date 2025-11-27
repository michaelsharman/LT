import p from "./logger.js";
class T {
  constructor() {
    this.measurements = [], this.isMonitoring = !1, this.timerId = null, this.intervalMs = 5e3, this.baselineMB = null, this.baselineTs = null;
  }
  startMonitoring(e = 5e3) {
    if (!("memory" in performance)) {
      console.warn("performance.memory not available");
      return;
    }
    this.intervalMs = e, this.baselineMB = Math.round(performance.memory.usedJSHeapSize / 1048576), this.baselineTs = Date.now(), this.isMonitoring = !0, this.monitorMemory();
  }
  monitorMemory() {
    if (!this.isMonitoring)
      return;
    const e = {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit,
      timestamp: Date.now()
    };
    this.measurements.push(e), this.measurements.length > 100 && this.measurements.shift(), this.detectMemoryLeaks(), this.timerId = setTimeout(() => this.monitorMemory(), this.intervalMs);
  }
  stopMonitoring() {
    this.isMonitoring = !1, this.timerId && (clearTimeout(this.timerId), this.timerId = null);
  }
  detectMemoryLeaks(e = 10, t = 1e3) {
    if (this.measurements.length < e)
      return !1;
    const s = this.measurements.slice(-e), n = s[s.length - 1].used - s[0].used, r = n / (e * this.intervalMs) * 1e3;
    return r > t ? (p.warn("⚠️ Potential memory leak detected:", {
      growthMB: (n / 1048576).toFixed(2),
      rateBps: r.toFixed(2)
    }), this.printReport(Math.min(20, this.measurements.length)), !0) : !1;
  }
  /**
   * Build a compact pattern and stats from the latest window of measurements.
   * @param {number} windowSize number of points to include (default 20)
   * @returns {{ pattern: Array<{usedMB:number, ts:number}>, stats: {count:number,minMB:number,maxMB:number,avgMB:number,slopeMBperMin:number,r2:number,leakSuspect:boolean} | null }}
   */
  analyzeMemoryPattern(e = 20) {
    const s = this.measurements.slice(-e).map((r) => ({
      usedMB: Math.round(r.used / 1048576),
      // MB
      ts: r.timestamp
    })), n = this.#e(s);
    return { pattern: s, stats: n };
  }
  /**
   * Convenience method: prints a table and stats to the console.
   * Returns the same object as analyzeMemoryPattern for further use.
   */
  printReport(e = 20) {
    const { pattern: t, stats: s } = this.analyzeMemoryPattern(e);
    if (console.table(
      t.map((n) => ({
        time: new Date(n.ts).toLocaleTimeString(),
        usedMB: n.usedMB
      }))
    ), this.baselineMB != null && t.length) {
      const r = t.at(-1).usedMB - this.baselineMB, c = this.baselineTs ? new Date(this.baselineTs).toLocaleTimeString() : "baseline";
      p.log(`Approx delta since baseline (${c}): ${r.toFixed(1)} MB`);
    }
    return p.log("Memory stats:", s), { pattern: t, stats: s };
  }
  // --- helpers -------------------------------------------------------------
  #e(e) {
    if (!e.length)
      return null;
    const t = e.map((m) => m.usedMB), s = Math.min(...t), n = Math.max(...t), r = +(t.reduce((m, u) => m + u, 0) / t.length).toFixed(2), c = e[0].ts, h = e.map((m) => (m.ts - c) / 6e4), { slope: a, r2: l } = this.#t(h, t);
    return {
      count: e.length,
      minMB: s,
      maxMB: n,
      avgMB: r,
      slopeMBperMin: +a.toFixed(3),
      r2: +l.toFixed(3),
      leakSuspect: a > 0.5 && l > 0.6
      // tweak for your needs
    };
  }
  #t(e, t) {
    const s = e.length;
    if (s < 2)
      return { slope: 0, intercept: t[0] ?? 0, r2: 0 };
    const n = e.reduce((o, i) => o + i, 0), r = t.reduce((o, i) => o + i, 0), c = e.reduce((o, i, d) => o + i * t[d], 0), h = e.reduce((o, i) => o + i * i, 0), a = n / s, l = r / s, m = c - s * a * l, u = h - s * a * a, M = u ? m / u : 0, g = l - M * a, f = t.reduce((o, i) => o + (i - l) ** 2, 0), B = t.reduce((o, i, d) => o + (i - (M * e[d] + g)) ** 2, 0), y = f ? 1 - B / f : 0;
    return { slope: M, intercept: g, r2: y };
  }
}
export {
  T as default
};
