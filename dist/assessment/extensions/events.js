import { networkStatus as E } from "./networkStatus.js";
import { c as R, L as t } from "../../extensionsFactory-CJF5B414.js";
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
function S(e) {
  return r.edge.test(e) ? f({ name: "Edge", version: p(r.edge, e) }) : r.opr.test(e) ? f({ name: "Opera", version: p(r.opr, e) }) : r.samsung.test(e) ? f({ name: "Samsung Internet", version: p(r.samsung, e) }) : /Chrome\//.test(e) && !r.edge.test(e) && !r.opr.test(e) && !r.samsung.test(e) ? f({ name: "Chrome", version: p(r.chrome, e) }) : r.firefox.test(e) ? f({ name: "Firefox", version: p(r.firefox, e) }) : !/Chrome|Chromium|Edg|OPR|SamsungBrowser/.test(e) && r.safariTail.test(e) ? f({ name: "Safari", version: p(r.version, e) }) : {};
}
function O(e) {
  return /Macintosh/.test(e) && /Mobile\//.test(e) && /Safari/.test(e) ? { name: "iOS", version: void 0 } : r.win.test(e) ? { name: "Windows", version: p(r.win, e) || void 0 } : /iPhone|iPad|iPod/.test(e) ? { name: "iOS", version: w(p(r.ios, e)) } : r.android.test(e) ? { name: "Android", version: p(r.android, e) } : r.cros.test(e) ? { name: "Chrome OS", version: p(r.cros, e) } : r.mac.test(e) ? { name: "macOS", version: w(p(r.mac, e)) } : r.linux.test(e) ? { name: "Linux", version: void 0 } : {};
}
function q(e) {
  return r.bot.test(e) ? "bot" : r.ipad.test(e) || r.tablet.test(e) ? "tablet" : r.mobileHint.test(e) || /Android/.test(e) && !/Tablet|iPad/.test(e) ? "mobile" : "desktop";
}
function C(e) {
  return r.webkit.test(e) ? { name: "WebKit", version: p(r.webkit, e) } : /Gecko\/\d/.test(e) && /Firefox\/([\d.]+)/.test(e) ? { name: "Gecko", version: p(r.firefox, e) } : /Chrome\/|Edg\/|OPR\/|SamsungBrowser\//.test(e) ? { name: "Blink" } : {};
}
function x(e, s) {
  try {
    const a = s && (s.brands || s.getBrands?.());
    if (!a || !a.length)
      return e;
    const o = a.filter((m) => !/Not.?A.?Brand/i.test(m.brand)).sort((m, d) => parseInt(d.version, 10) - parseInt(m.version, 10))[0];
    if (o && o.brand)
      return f({ name: o.brand, version: e.version });
  } catch {
  }
  return e;
}
function _(e) {
  return e = e || "", {
    ua: e,
    browser: S(e),
    os: O(e),
    deviceType: q(e),
    engine: C(e),
    reducedUA: /\bChrome\/\d+\.0\.0\.0\b/.test(e) || /\bEdg\/\d+\.0\.0\.0\b/.test(e) || !1
  };
}
function T() {
  const e = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent : "", s = typeof navigator < "u" ? navigator.userAgentData : void 0, a = _(e);
  return s && (s.brands || s.getBrands) && (a.browser = x(a.browser, s)), a.meta = {
    source: s && (s.brands || s.getBrands) ? "ua-ch-low" : "ua",
    usedHighEntropy: !1,
    isReducedUA: A(e)
  }, delete a.reducedUA, a;
}
async function P() {
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
      ]), m = o.fullVersionList || s.brands || s.getBrands?.() || [], d = ["Chrome", "Google Chrome", "Microsoft Edge", "Edge", "Chromium", "Opera", "OPR", "Samsung Internet", "Firefox"], u = m.find((y) => d.some((k) => y.brand.toLowerCase().includes(k.toLowerCase()))) || m.find((y) => !/Not.?A.?Brand/i.test(y.brand)) || null, g = u?.brand || m[0] && m[0].brand || void 0, v = u?.version || o.uaFullVersion || void 0, l = o.platform || void 0, h = o.platformVersion || void 0;
      let b;
      return /Android/i.test(l) ? b = "mobile" : /Windows|macOS|Chrome OS|Linux|iOS/i.test(l) && (b = "desktop"), {
        ua: e,
        browser: f({ name: g, version: v }),
        os: { name: l, version: h },
        deviceType: b,
        engine: void 0,
        arch: o.architecture,
        bitness: o.bitness,
        model: o.model,
        meta: {
          source: "ua-ch-high",
          usedHighEntropy: !0,
          isReducedUA: A(e)
        }
      };
    } catch {
    }
  const a = T();
  return a.meta.source = a.meta && a.meta.source || "ua", a;
}
function p(e, s) {
  const a = s.match(e);
  return a ? a[1] : void 0;
}
function A(e) {
  return /\bChrome\/\d+\.0\.0\.0\b/.test(e) || /\bEdg\/\d+\.0\.0\.0\b/.test(e);
}
function w(e) {
  return e ? e.replace(/_/g, ".") : void 0;
}
function f(e) {
  if (e && e.version && typeof e.version == "string") {
    const s = e.version.split(".")[0];
    s && (e.versionMajor = s);
  }
  return e;
}
const c = {
  initialised: !1,
  events: {
    events: [],
    network: null,
    session: null,
    user: null
  }
};
function V() {
  if (t.isVerticalLayout()) {
    t.utils.logger.warn("Event log is not currently supported in vertical layout.");
    return;
  }
  c.initialised || (L(), B(), N(), F(), U(), c.initialised = !0);
}
async function L() {
  c.events.user = t.userId(), c.events.session = t.sessionId(), c.events.environment = await M(), c.events.network = {
    speed: E.checkSpeed()
  };
}
function B() {
  t.itemsApp().on("test:start", () => {
    i({
      type: "test:start",
      timestamp: n()
    });
  }), t.itemsApp().on("unfocused", () => {
    i({
      type: "unfocused",
      item: t.itemReference(),
      timestamp: n()
    });
  }), t.itemsApp().on("focused", () => {
    i({
      type: "focused",
      item: t.itemReference(),
      timestamp: n()
    });
  }), t.itemsApp().on("test:reading:start", () => {
    i({
      type: "test:reading:start",
      timestamp: n()
    });
  }), t.itemsApp().on("test:reading:end", () => {
    i({
      type: "test:reading:end",
      timestamp: n()
    });
  }), t.itemsApp().on("item:warningOnChange", () => {
    i({
      type: "item:warningOnChange",
      item: t.itemReference(),
      timestamp: n()
    });
  }), t.itemsApp().on("item:load", () => {
    i({
      type: "item:load",
      item: t.itemReference(),
      data: {
        num: t.itemPosition()
      },
      timestamp: n()
    });
  }), t.itemsApp().on("items:fetch:done", () => {
    i({
      type: "items:fetch:done",
      item: t.itemReference(),
      timestamp: n()
    });
  }), t.itemsApp().on("section:changed", () => {
    i({
      type: "section:changed",
      timestamp: n()
    });
  }), t.itemsApp().on("test:panel:show", async () => {
    const e = await I();
    i({
      type: e,
      timestamp: n()
    });
  }), t.itemsApp().on("test:panel:hide", () => {
    i({
      type: "dialog:hide",
      timestamp: n()
    });
  }), t.itemsApp().on("test:pause", () => {
    i({
      type: "test:pause",
      timestamp: n()
    });
  }), t.itemsApp().on("test:resume", () => {
    i({
      type: "test:resume",
      timestamp: n()
    });
  }), t.itemsApp().on("test:save", () => {
    i({
      type: "test:save",
      timestamp: n()
    });
  }), t.itemsApp().on("test:save:success", () => {
    i({
      type: "test:save:success",
      timestamp: n()
    });
  }), t.itemsApp().on("test:save:error", () => {
    i({
      type: "test:save:error",
      timestamp: n()
    });
  }), t.itemsApp().on("test:submit", () => {
    i({
      type: "test:submit",
      timestamp: n()
    });
  }), t.itemsApp().on("test:submit:success", () => {
    i({
      type: "test:submit:success",
      timestamp: n()
    });
  }), t.itemsApp().on("test:submit:error", () => {
    i({
      type: "test:submit:error",
      timestamp: n()
    });
  }), t.itemsApp().on("test:finished:save", () => {
    i({
      type: "test:finished:save",
      timestamp: n()
    });
  }), t.itemsApp().on("test:finished:submit", () => {
    i({
      type: "test:finished:submit",
      timestamp: n()
    });
  }), t.itemsApp().on("test:finished:discard", () => {
    i({
      type: "test:finished:discard",
      timestamp: n()
    });
  }), t.itemsApp().on("time:end", () => {
    i({
      type: "time:end",
      timestamp: n()
    });
  });
}
function N() {
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
  t.itemsApp().on("item:load", () => {
    t.questionResponseIds().forEach((o) => {
      const m = t.itemsApp().question(o), d = m.getQuestion(), u = d.type;
      ["audio", "video"].includes(u) && (m.on("recording:started", () => {
        i({
          type: "recording:started",
          item: t.itemReference(),
          question: d.metadata.widget_reference,
          timestamp: n()
        });
      }), m.on("recording:paused", () => {
        i({
          type: "recording:paused",
          item: t.itemReference(),
          question: d.metadata.widget_reference,
          timestamp: n()
        });
      }), m.on("recording:resumed", () => {
        i({
          type: "recording:resumed",
          item: t.itemReference(),
          question: d.metadata.widget_reference,
          timestamp: n()
        });
      }), m.on("recording:stopped", () => {
        i({
          type: "recording:stopped",
          item: t.itemReference(),
          question: d.metadata.widget_reference,
          timestamp: n()
        });
      })), m.on("changed", () => {
        const g = a[o] || 0, { revision: v, value: l } = t.questionResponse(o);
        e.includes(u) ? n() - g >= 3e4 && (a[o] = n(), i({
          type: "question:changed",
          item: t.itemReference(),
          question: d.metadata.widget_reference,
          data: {},
          timestamp: n()
        })) : (i({
          type: "question:changed",
          item: t.itemReference(),
          question: d.metadata.widget_reference,
          data: { revision: v, value: l },
          timestamp: n()
        }), i({
          type: "question:masked",
          item: t.itemReference(),
          question: d.metadata.widget_reference,
          timestamp: n()
        }), i({
          type: "question:validated",
          item: t.itemReference(),
          question: d.metadata.widget_reference,
          timestamp: n()
        }));
      });
    });
  });
}
function F() {
  t.itemsApp().on("item:load", () => {
    [...t.item().feature_ids, ...t.item().simplefeature_ids].forEach((s) => {
      t.itemsApp().feature(s) && (t.itemsApp().feature(s).on("begin", () => {
        i({
          type: "begin",
          item: t.itemReference(),
          timestamp: n()
        });
      }), t.itemsApp().feature(s).on("complete", () => {
        i({
          type: "complete",
          item: t.itemReference(),
          timestamp: n()
        });
      }), t.itemsApp().feature(s).on("playback:started", () => {
        i({
          type: "playback:started",
          item: t.itemReference(),
          timestamp: n()
        });
      }), t.itemsApp().feature(s).on("playback:paused", () => {
        i({
          type: "playback:paused",
          item: t.itemReference(),
          timestamp: n()
        });
      }), t.itemsApp().feature(s).on("playback:resumed", () => {
        i({
          type: "playback:resumed",
          item: t.itemReference(),
          timestamp: n()
        });
      }), t.itemsApp().feature(s).on("playback:stopped", () => {
        i({
          type: "playback:stopped",
          item: t.itemReference(),
          timestamp: n()
        });
      }), t.itemsApp().feature(s).on("playback:complete", () => {
        i({
          type: "playback:complete",
          item: t.itemReference(),
          timestamp: n()
        });
      }));
    });
  });
}
function U() {
  document.addEventListener("LTNetworkOnline", () => {
    c.network === "offline" && (c.network = "online", i({
      type: "network:online",
      item: t.itemReference(),
      timestamp: n()
    }));
  }), document.addEventListener("LTNetworkOffline", () => {
    c.network === "online" && (c.network = "offline", i({
      type: "network:offline",
      item: t.itemReference(),
      timestamp: n()
    }));
  });
}
function i(e) {
  c.events.events.push(e);
}
function I() {
  return new Promise((e) => {
    setTimeout(() => {
      const s = document.querySelectorAll(".lrn-assess-dialogs > .lrn-dialog-default");
      let a = "", o = "";
      const m = Array.from(s).filter((u) => u.style.display === "block").map((u) => ({
        id: u.id,
        class: u.className
      }));
      if (m.length === 0) {
        e("");
        return;
      }
      const d = m[0];
      switch (d?.id ? a = d.id.replace(/\d+/g, "") : d?.class.includes("review-screen") && (a = "review-screen"), a) {
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
function n() {
  return Date.now();
}
async function M() {
  return P();
}
function D() {
  return c.events;
}
const G = R("events", V, {
  getEvents: D
});
export {
  G as events
};
