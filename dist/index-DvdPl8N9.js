import { w as O, x as _, y as q, c as i, z as d, A as x, m as C, j as P, B as h } from "./app-BC_Cj6Pt.js";
import { a as T } from "./index-BMA0ebqk.js";
import { c as V } from "./extensionsFactory-DRAOPv5d.js";
import B from "./logger.js";
const r = {
  // Browsers
  edge: /Edg(?:A|iOS)?\/([\d.]+)/,
  opr: /OPR\/([\d.]+)/,
  samsung: /SamsungBrowser\/([\d.]+)/,
  chrome: /Chrome\/([\d.]+)/,
  firefox: /Firefox\/([\d.]+)/,
  safariTail: /\bSafari\/[\d.]+$/,
  // UA ends with Safari token
  version: /Version\/([\d.]+)/,
  // Safari version is in Version/x.y.z
  // OS
  win: /Windows NT ([\d.]+)/,
  mac: /Mac OS X (\d+[_.]\d+(?:[_.]\d+)?)/,
  ios: /(?:iPhone|iPad|iPod).*OS (\d+[_.]\d+(?:[_.]\d+)?)/,
  android: /Android ([\d.]+)/,
  cros: /CrOS [\w_]+ ([\d.]+)/,
  linux: /\bLinux\b/,
  // Heuristics
  mobileHint: /\bMobi\b/,
  ipad: /\biPad\b/,
  tablet: /\bTablet\b/,
  bot: /\b(bot|crawler|spider|crawling)\b/i,
  // Engines
  webkit: /AppleWebKit\/([\d.]+)/
};
function N(e) {
  return r.edge.test(e) ? l({ name: "Edge", version: u(r.edge, e) }) : r.opr.test(e) ? l({ name: "Opera", version: u(r.opr, e) }) : r.samsung.test(e) ? l({ name: "Samsung Internet", version: u(r.samsung, e) }) : /Chrome\//.test(e) && !r.edge.test(e) && !r.opr.test(e) && !r.samsung.test(e) ? l({ name: "Chrome", version: u(r.chrome, e) }) : r.firefox.test(e) ? l({ name: "Firefox", version: u(r.firefox, e) }) : !/Chrome|Chromium|Edg|OPR|SamsungBrowser/.test(e) && r.safariTail.test(e) ? l({ name: "Safari", version: u(r.version, e) }) : {};
}
function F(e) {
  return /Macintosh/.test(e) && /Mobile\//.test(e) && /Safari/.test(e) ? { name: "iOS", version: void 0 } : r.win.test(e) ? { name: "Windows", version: u(r.win, e) || void 0 } : /iPhone|iPad|iPod/.test(e) ? { name: "iOS", version: k(u(r.ios, e)) } : r.android.test(e) ? { name: "Android", version: u(r.android, e) } : r.cros.test(e) ? { name: "Chrome OS", version: u(r.cros, e) } : r.mac.test(e) ? { name: "macOS", version: k(u(r.mac, e)) } : r.linux.test(e) ? { name: "Linux", version: void 0 } : {};
}
function L(e) {
  return r.bot.test(e) ? "bot" : r.ipad.test(e) || r.tablet.test(e) ? "tablet" : r.mobileHint.test(e) || /Android/.test(e) && !/Tablet|iPad/.test(e) ? "mobile" : "desktop";
}
function R(e) {
  return r.webkit.test(e) ? { name: "WebKit", version: u(r.webkit, e) } : /Gecko\/\d/.test(e) && /Firefox\/([\d.]+)/.test(e) ? { name: "Gecko", version: u(r.firefox, e) } : /Chrome\/|Edg\/|OPR\/|SamsungBrowser\//.test(e) ? { name: "Blink" } : {};
}
function U(e, s) {
  try {
    const a = s && (s.brands || s.getBrands?.());
    if (!a || !a.length)
      return e;
    const o = a.filter((m) => !/Not.?A.?Brand/i.test(m.brand)).sort((m, c) => parseInt(c.version, 10) - parseInt(m.version, 10))[0];
    if (o && o.brand)
      return l({ name: o.brand, version: e.version });
  } catch {
  }
  return e;
}
function I(e) {
  return e = e || "", {
    ua: e,
    browser: N(e),
    os: F(e),
    deviceType: L(e),
    engine: R(e),
    reducedUA: /\bChrome\/\d+\.0\.0\.0\b/.test(e) || /\bEdg\/\d+\.0\.0\.0\b/.test(e) || !1
  };
}
function M() {
  const e = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent : "", s = typeof navigator < "u" ? navigator.userAgentData : void 0, a = I(e);
  return s && (s.brands || s.getBrands) && (a.browser = U(a.browser, s)), a.meta = {
    source: s && (s.brands || s.getBrands) ? "ua-ch-low" : "ua",
    usedHighEntropy: !1,
    isReducedUA: E(e)
  }, delete a.reducedUA, a;
}
async function D() {
  const e = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent : "", s = typeof navigator < "u" ? navigator.userAgentData : void 0;
  if (s && typeof s.getHighEntropyValues == "function")
    try {
      const o = await s.getHighEntropyValues([
        "platform",
        // "Windows", "macOS", "Android", "Chrome OS", "Linux", "iOS"
        "platformVersion",
        // e.g., "15.0.0"
        "uaFullVersion",
        // e.g., "138.0.7204.50"
        "architecture",
        // e.g., "arm" | "x86"
        "bitness",
        // "64" | "32"
        "model",
        // device model (mobile)
        "fullVersionList"
        // array of { brand, version }
      ]), m = o.fullVersionList || s.brands || s.getBrands?.() || [], c = ["Chrome", "Google Chrome", "Microsoft Edge", "Edge", "Chromium", "Opera", "OPR", "Samsung Internet", "Firefox"], f = m.find((w) => c.some((S) => w.brand.toLowerCase().includes(S.toLowerCase()))) || m.find((w) => !/Not.?A.?Brand/i.test(w.brand)) || null, b = f?.brand || m[0] && m[0].brand || void 0, v = f?.version || o.uaFullVersion || void 0, g = o.platform || void 0, A = o.platformVersion || void 0;
      let y;
      return /Android/i.test(g) ? y = "mobile" : /Windows|macOS|Chrome OS|Linux|iOS/i.test(g) && (y = "desktop"), {
        ua: e,
        browser: l({ name: b, version: v }),
        os: { name: g, version: A },
        deviceType: y,
        engine: void 0,
        arch: o.architecture,
        bitness: o.bitness,
        model: o.model,
        meta: {
          source: "ua-ch-high",
          usedHighEntropy: !0,
          isReducedUA: E(e)
        }
      };
    } catch {
    }
  const a = M();
  return a.meta.source = a.meta && a.meta.source || "ua", a;
}
function u(e, s) {
  const a = s.match(e);
  return a ? a[1] : void 0;
}
function E(e) {
  return /\bChrome\/\d+\.0\.0\.0\b/.test(e) || /\bEdg\/\d+\.0\.0\.0\b/.test(e);
}
function k(e) {
  return e ? e.replace(/_/g, ".") : void 0;
}
function l(e) {
  if (e && e.version && typeof e.version == "string") {
    const s = e.version.split(".")[0];
    s && (e.versionMajor = s);
  }
  return e;
}
const p = {
  initialised: !1,
  events: {
    events: [],
    network: null,
    session: null,
    user: null
  }
};
function H() {
  if (O()) {
    B.warn("Event log is not currently supported in vertical layout.");
    return;
  }
  p.initialised || (W(), z(), G(), Q(), j(), p.initialised = !0);
}
async function W() {
  p.events.user = _(), p.events.session = q(), p.events.environment = await $(), p.events.network = {
    speed: T.checkSpeed()
  };
}
function z() {
  i().on("test:start", () => {
    n({
      type: "test:start",
      timestamp: t()
    });
  }), i().on("unfocused", () => {
    n({
      type: "unfocused",
      item: d(),
      timestamp: t()
    });
  }), i().on("focused", () => {
    n({
      type: "focused",
      item: d(),
      timestamp: t()
    });
  }), i().on("test:reading:start", () => {
    n({
      type: "test:reading:start",
      timestamp: t()
    });
  }), i().on("test:reading:end", () => {
    n({
      type: "test:reading:end",
      timestamp: t()
    });
  }), i().on("item:warningOnChange", () => {
    n({
      type: "item:warningOnChange",
      item: d(),
      timestamp: t()
    });
  }), i().on("item:load", () => {
    n({
      type: "item:load",
      item: d(),
      data: {
        num: x()
      },
      timestamp: t()
    });
  }), i().on("items:fetch:done", () => {
    n({
      type: "items:fetch:done",
      item: d(),
      timestamp: t()
    });
  }), i().on("section:changed", () => {
    n({
      type: "section:changed",
      timestamp: t()
    });
  }), i().on("test:panel:show", async () => {
    const e = await K();
    n({
      type: e,
      timestamp: t()
    });
  }), i().on("test:panel:hide", () => {
    n({
      type: "dialog:hide",
      timestamp: t()
    });
  }), i().on("test:pause", () => {
    n({
      type: "test:pause",
      timestamp: t()
    });
  }), i().on("test:resume", () => {
    n({
      type: "test:resume",
      timestamp: t()
    });
  }), i().on("test:save", () => {
    n({
      type: "test:save",
      timestamp: t()
    });
  }), i().on("test:save:success", () => {
    n({
      type: "test:save:success",
      timestamp: t()
    });
  }), i().on("test:save:error", () => {
    n({
      type: "test:save:error",
      timestamp: t()
    });
  }), i().on("test:submit", () => {
    n({
      type: "test:submit",
      timestamp: t()
    });
  }), i().on("test:submit:success", () => {
    n({
      type: "test:submit:success",
      timestamp: t()
    });
  }), i().on("test:submit:error", () => {
    n({
      type: "test:submit:error",
      timestamp: t()
    });
  }), i().on("test:finished:save", () => {
    n({
      type: "test:finished:save",
      timestamp: t()
    });
  }), i().on("test:finished:submit", () => {
    n({
      type: "test:finished:submit",
      timestamp: t()
    });
  }), i().on("test:finished:discard", () => {
    n({
      type: "test:finished:discard",
      timestamp: t()
    });
  }), i().on("time:end", () => {
    n({
      type: "time:end",
      timestamp: t()
    });
  });
}
function G() {
  const e = [
    "longtextV2",
    "longtext",
    "plaintext",
    "drawing",
    "shorttext",
    "audio",
    "video",
    "formulaessayV2",
    "chemistryessayV2",
    "imageupload",
    "fileupload"
  ], a = {};
  i().on("item:load", () => {
    C().forEach((o) => {
      const m = i().question(o), c = m.getQuestion(), f = c.type;
      ["audio", "video"].includes(f) && (m.on("recording:started", () => {
        n({
          type: "recording:started",
          item: d(),
          question: c.metadata.widget_reference,
          timestamp: t()
        });
      }), m.on("recording:paused", () => {
        n({
          type: "recording:paused",
          item: d(),
          question: c.metadata.widget_reference,
          timestamp: t()
        });
      }), m.on("recording:resumed", () => {
        n({
          type: "recording:resumed",
          item: d(),
          question: c.metadata.widget_reference,
          timestamp: t()
        });
      }), m.on("recording:stopped", () => {
        n({
          type: "recording:stopped",
          item: d(),
          question: c.metadata.widget_reference,
          timestamp: t()
        });
      })), m.on("changed", () => {
        const b = a[o] || 0, { revision: v, value: g } = P(o);
        e.includes(f) ? t() - b >= 3e4 && (a[o] = t(), n({
          type: "question:changed",
          item: d(),
          question: c.metadata.widget_reference,
          data: {},
          timestamp: t()
        })) : (n({
          type: "question:changed",
          item: d(),
          question: c.metadata.widget_reference,
          data: { revision: v, value: g },
          timestamp: t()
        }), n({
          type: "question:masked",
          item: d(),
          question: c.metadata.widget_reference,
          timestamp: t()
        }), n({
          type: "question:validated",
          item: d(),
          question: c.metadata.widget_reference,
          timestamp: t()
        }));
      });
    });
  });
}
function Q() {
  i().on("item:load", () => {
    [...h().feature_ids, ...h().simplefeature_ids].forEach((s) => {
      i().feature(s) && (i().feature(s).on("begin", () => {
        n({
          type: "begin",
          item: d(),
          timestamp: t()
        });
      }), i().feature(s).on("complete", () => {
        n({
          type: "complete",
          item: d(),
          timestamp: t()
        });
      }), i().feature(s).on("playback:started", () => {
        n({
          type: "playback:started",
          item: d(),
          timestamp: t()
        });
      }), i().feature(s).on("playback:paused", () => {
        n({
          type: "playback:paused",
          item: d(),
          timestamp: t()
        });
      }), i().feature(s).on("playback:resumed", () => {
        n({
          type: "playback:resumed",
          item: d(),
          timestamp: t()
        });
      }), i().feature(s).on("playback:stopped", () => {
        n({
          type: "playback:stopped",
          item: d(),
          timestamp: t()
        });
      }), i().feature(s).on("playback:complete", () => {
        n({
          type: "playback:complete",
          item: d(),
          timestamp: t()
        });
      }));
    });
  });
}
function j() {
  document.addEventListener("LTNetworkOnline", () => {
    p.network === "offline" && (p.network = "online", n({
      type: "network:online",
      item: d(),
      timestamp: t()
    }));
  }), document.addEventListener("LTNetworkOffline", () => {
    p.network === "online" && (p.network = "offline", n({
      type: "network:offline",
      item: d(),
      timestamp: t()
    }));
  });
}
function n(e) {
  p.events.events.push(e);
}
function K() {
  return new Promise((e) => {
    setTimeout(() => {
      const s = document.querySelectorAll(".lrn-assess-dialogs > .lrn-dialog-default");
      let a = "", o = "";
      const m = Array.from(s).filter((f) => f.style.display === "block").map((f) => ({
        id: f.id,
        class: f.className
      }));
      if (m.length === 0) {
        e("");
        return;
      }
      const c = m[0];
      switch (c?.id ? a = c.id.replace(/\d+/g, "") : c?.class.includes("review-screen") && (a = "review-screen"), a) {
        case "accessibility-panel":
          o = "dialog:accessibility";
          break;
        case "custom-dialog":
          o = "dialog:custom-dialog";
          break;
        case "module-load-error-dialog":
          o = "dialog:module-load-error";
          break;
        case "review-screen":
          o = "dialog:review-screen";
          break;
        case "test-asset-upload-error-dialog":
          o = "dialog:asset-upload-error";
          break;
        case "test-error-dialog":
          o = "dialog:error";
          break;
        case "test-pause-dialog":
          o = "dialog:pause";
          break;
        case "test-save-submit":
          o = "dialog:save-submit";
          break;
      }
      e(o);
    }, 500);
  });
}
function t() {
  return Date.now();
}
async function $() {
  return D();
}
function J() {
  return p.events;
}
const X = V("events", H, {
  getEvents: J
}), ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  events: X
}, Symbol.toStringTag, { value: "Module" }));
export {
  X as a,
  ne as e
};
