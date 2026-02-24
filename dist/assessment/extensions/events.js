import { f as S, g as O } from "../../player-CSUkfi78.js";
import { networkStatus as x } from "./networkStatus.js";
import { c as q, L as t } from "../../extensionsFactory-BHOEyOSK.js";
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
function C(e) {
  return r.edge.test(e) ? l({ name: "Edge", version: c(r.edge, e) }) : r.opr.test(e) ? l({ name: "Opera", version: c(r.opr, e) }) : r.samsung.test(e) ? l({ name: "Samsung Internet", version: c(r.samsung, e) }) : /Chrome\//.test(e) && !r.edge.test(e) && !r.opr.test(e) && !r.samsung.test(e) ? l({ name: "Chrome", version: c(r.chrome, e) }) : r.firefox.test(e) ? l({ name: "Firefox", version: c(r.firefox, e) }) : !/Chrome|Chromium|Edg|OPR|SamsungBrowser/.test(e) && r.safariTail.test(e) ? l({ name: "Safari", version: c(r.version, e) }) : {};
}
function T(e) {
  return /Macintosh/.test(e) && /Mobile\//.test(e) && /Safari/.test(e) ? { name: "iOS", version: void 0 } : r.win.test(e) ? { name: "Windows", version: c(r.win, e) || void 0 } : /iPhone|iPad|iPod/.test(e) ? { name: "iOS", version: w(c(r.ios, e)) } : r.android.test(e) ? { name: "Android", version: c(r.android, e) } : r.cros.test(e) ? { name: "Chrome OS", version: c(r.cros, e) } : r.mac.test(e) ? { name: "macOS", version: w(c(r.mac, e)) } : r.linux.test(e) ? { name: "Linux", version: void 0 } : {};
}
function L(e) {
  return r.bot.test(e) ? "bot" : r.ipad.test(e) || r.tablet.test(e) ? "tablet" : r.mobileHint.test(e) || /Android/.test(e) && !/Tablet|iPad/.test(e) ? "mobile" : "desktop";
}
function P(e) {
  return r.webkit.test(e) ? { name: "WebKit", version: c(r.webkit, e) } : /Gecko\/\d/.test(e) && /Firefox\/([\d.]+)/.test(e) ? { name: "Gecko", version: c(r.firefox, e) } : /Chrome\/|Edg\/|OPR\/|SamsungBrowser\//.test(e) ? { name: "Blink" } : {};
}
function V(e, i) {
  try {
    const a = i && (i.brands || i.getBrands?.());
    if (!a || !a.length)
      return e;
    const o = a.filter((d) => !/Not.?A.?Brand/i.test(d.brand)).sort((d, m) => parseInt(m.version, 10) - parseInt(d.version, 10))[0];
    if (o && o.brand)
      return l({ name: o.brand, version: e.version });
  } catch {
  }
  return e;
}
function N(e) {
  return e = e || "", {
    ua: e,
    browser: C(e),
    os: T(e),
    deviceType: L(e),
    engine: P(e),
    reducedUA: /\bChrome\/\d+\.0\.0\.0\b/.test(e) || /\bEdg\/\d+\.0\.0\.0\b/.test(e) || !1
  };
}
function F() {
  const e = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent : "", i = typeof navigator < "u" ? navigator.userAgentData : void 0, a = N(e);
  return i && (i.brands || i.getBrands) && (a.browser = V(a.browser, i)), a.meta = {
    source: i && (i.brands || i.getBrands) ? "ua-ch-low" : "ua",
    usedHighEntropy: !1,
    isReducedUA: k(e)
  }, delete a.reducedUA, a;
}
async function I() {
  const e = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent : "", i = typeof navigator < "u" ? navigator.userAgentData : void 0;
  if (i && typeof i.getHighEntropyValues == "function")
    try {
      const o = await i.getHighEntropyValues([
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
      ]), d = o.fullVersionList || i.brands || i.getBrands?.() || [], m = ["Chrome", "Google Chrome", "Microsoft Edge", "Edge", "Chromium", "Opera", "OPR", "Samsung Internet", "Firefox"], p = d.find((y) => m.some((R) => y.brand.toLowerCase().includes(R.toLowerCase()))) || d.find((y) => !/Not.?A.?Brand/i.test(y.brand)) || null, g = p?.brand || d[0] && d[0].brand || void 0, f = p?.version || o.uaFullVersion || void 0, b = o.platform || void 0, h = o.platformVersion || void 0;
      let v;
      return /Android/i.test(b) ? v = "mobile" : /Windows|macOS|Chrome OS|Linux|iOS/i.test(b) && (v = "desktop"), {
        ua: e,
        browser: l({ name: g, version: f }),
        os: { name: b, version: h },
        deviceType: v,
        engine: void 0,
        arch: o.architecture,
        bitness: o.bitness,
        model: o.model,
        meta: {
          source: "ua-ch-high",
          usedHighEntropy: !0,
          isReducedUA: k(e)
        }
      };
    } catch {
    }
  const a = F();
  return a.meta.source = a.meta && a.meta.source || "ua", a;
}
function c(e, i) {
  const a = i.match(e);
  return a ? a[1] : void 0;
}
function k(e) {
  return /\bChrome\/\d+\.0\.0\.0\b/.test(e) || /\bEdg\/\d+\.0\.0\.0\b/.test(e);
}
function w(e) {
  return e ? e.replace(/_/g, ".") : void 0;
}
function l(e) {
  if (e && e.version && typeof e.version == "string") {
    const i = e.version.split(".")[0];
    i && (e.versionMajor = i);
  }
  return e;
}
const u = {
  initialised: !1,
  events: {
    events: [],
    network: {
      speed: null,
      status: "online"
    },
    session: null,
    user: null
  }
};
function U() {
  if (t.isVerticalLayout()) {
    t.utils.logger.warn("Event log is not currently supported in vertical layout.");
    return;
  }
  u.initialised || (_(), t.eventBus.on("item:load", () => {
    B(), E(), A();
  }, "events"), D(), M(), z(), u.initialised = !0);
}
function _() {
  S() ? s({
    type: "test:ready",
    timestamp: n()
  }) : (s({
    type: "test:start",
    timestamp: n()
  }), O() && s({
    type: "test:reading:start",
    timestamp: n()
  }), B(), E(), A());
}
async function M() {
  u.events.user = t.userId(), u.events.session = t.sessionId(), u.events.environment = await W(), u.events.network.speed = x.checkSpeed();
}
function D() {
  t.eventBus.on("test:start", () => {
    s({
      type: "test:start",
      timestamp: n()
    });
  }), t.eventBus.on("unfocused", () => {
    s({
      type: "unfocused",
      item: t.itemReference(),
      timestamp: n()
    });
  }), t.eventBus.on("focused", () => {
    s({
      type: "focused",
      item: t.itemReference(),
      timestamp: n()
    });
  }), t.eventBus.on("test:reading:start", () => {
    s({
      type: "test:reading:start",
      timestamp: n()
    });
  }), t.eventBus.on("test:reading:end", () => {
    s({
      type: "test:reading:end",
      timestamp: n()
    });
  }), t.eventBus.on("item:warningOnChange", () => {
    s({
      type: "item:warningOnChange",
      item: t.itemReference(),
      timestamp: n()
    });
  }), t.eventBus.on("items:fetch:done", () => {
    s({
      type: "items:fetch:done",
      item: t.itemReference(),
      timestamp: n()
    });
  }), t.eventBus.on("section:changed", () => {
    s({
      type: "section:changed",
      timestamp: n()
    });
  }), t.eventBus.on("test:panel:show", async () => {
    const e = await H();
    ["dialog:pause"].includes(e) || s({
      type: e,
      timestamp: n()
    });
  }), t.eventBus.on("test:pause", () => {
    s({
      type: "test:pause",
      timestamp: n()
    });
  }), t.eventBus.on("test:resume", () => {
    s({
      type: "test:resume",
      timestamp: n()
    });
  }), t.eventBus.on("test:save", () => {
    s({
      type: "test:save",
      timestamp: n()
    });
  }), t.eventBus.on("test:save:success", () => {
    s({
      type: "test:save:success",
      timestamp: n()
    });
  }), t.eventBus.on("test:save:error", () => {
    s({
      type: "test:save:error",
      timestamp: n()
    });
  }), t.eventBus.on("test:submit", () => {
    s({
      type: "test:submit",
      timestamp: n()
    });
  }), t.eventBus.on("test:submit:success", () => {
    s({
      type: "test:submit:success",
      timestamp: n()
    });
  }), t.eventBus.on("test:submit:error", () => {
    s({
      type: "test:submit:error",
      timestamp: n()
    });
  }), t.eventBus.on("test:finished:save", () => {
    s({
      type: "test:finished:save",
      timestamp: n()
    });
  }), t.eventBus.on("test:finished:submit", () => {
    s({
      type: "test:finished:submit",
      timestamp: n()
    });
  }), t.eventBus.on("test:finished:discard", () => {
    s({
      type: "test:finished:discard",
      timestamp: n()
    });
  }), t.eventBus.on("time:end", () => {
    s({
      type: "time:end",
      timestamp: n()
    });
  });
}
function E() {
  const e = [
    "audio",
    "chemistryessayV2",
    "drawing",
    "fileupload",
    "formulaessayV2",
    "imageupload",
    "longtext",
    "longtextV2",
    "plaintext",
    "video"
  ], i = [
    "association",
    "bowtie",
    "classification",
    "clozeassociation",
    "clozedropdown",
    "clozetext",
    "graphplotting",
    "gridded",
    "hotspot",
    "imageclozeassociation",
    "imageclozedropdown",
    "imageclozetext",
    "numberline",
    "numberlineplot",
    "orderlist",
    "shorttext",
    "simplechart",
    "simpleshading",
    "tokenhighlight"
  ], o = {};
  t.questionResponseIds().forEach((d) => {
    const m = t.itemsApp().question(d), p = m.getQuestion(), g = p.type, f = p.metadata.widget_reference;
    ["audio", "video"].includes(g) && (m.on("recording:started", () => {
      s({
        type: "recording:started",
        item: t.itemReference(),
        question: f,
        timestamp: n()
      });
    }), m.on("recording:paused", () => {
      s({
        type: "recording:paused",
        item: t.itemReference(),
        question: f,
        timestamp: n()
      });
    }), m.on("recording:resumed", () => {
      s({
        type: "recording:resumed",
        item: t.itemReference(),
        question: f,
        timestamp: n()
      });
    }), m.on("recording:stopped", () => {
      s({
        type: "recording:stopped",
        item: t.itemReference(),
        question: f,
        timestamp: n()
      });
    })), m.on("changed", () => {
      const b = o[d] || 0, { revision: h, value: v } = t.questionResponse(d);
      if (e.includes(g) || i.includes(g)) {
        if (n() - b >= 3e4) {
          o[d] = n();
          const y = i.includes(g) ? { revision: h, value: v } : {};
          s({
            type: "question:changed",
            item: t.itemReference(),
            question: f,
            responseId: d,
            data: y,
            timestamp: n()
          });
        }
      } else
        s({
          type: "question:changed",
          item: t.itemReference(),
          question: f,
          responseId: d,
          data: { revision: h, value: v },
          timestamp: n()
        });
    }), m.on("masked", () => {
      s({
        type: "question:masked",
        item: t.itemReference(),
        question: f,
        timestamp: n()
      });
    }), m.on("validated", () => {
      s({
        type: "question:validated",
        item: t.itemReference(),
        question: f,
        timestamp: n()
      });
    });
  });
}
function A() {
  [...t.item().feature_ids, ...t.item().simplefeature_ids].forEach((i) => {
    t.itemsApp().feature(i) && (t.itemsApp().feature(i).on("begin", () => {
      s({
        type: "begin",
        item: t.itemReference(),
        timestamp: n()
      });
    }), t.itemsApp().feature(i).on("complete", () => {
      s({
        type: "complete",
        item: t.itemReference(),
        timestamp: n()
      });
    }), t.itemsApp().feature(i).on("playback:started", () => {
      s({
        type: "playback:started",
        item: t.itemReference(),
        timestamp: n()
      });
    }), t.itemsApp().feature(i).on("playback:paused", () => {
      s({
        type: "playback:paused",
        item: t.itemReference(),
        timestamp: n()
      });
    }), t.itemsApp().feature(i).on("playback:resumed", () => {
      s({
        type: "playback:resumed",
        item: t.itemReference(),
        timestamp: n()
      });
    }), t.itemsApp().feature(i).on("playback:stopped", () => {
      s({
        type: "playback:stopped",
        item: t.itemReference(),
        timestamp: n()
      });
    }), t.itemsApp().feature(i).on("playback:complete", () => {
      s({
        type: "playback:complete",
        item: t.itemReference(),
        timestamp: n()
      });
    }));
  });
}
function z() {
  document.addEventListener("LTNetworkOnline", () => {
    u.events.network.status === "offline" && (u.events.network.status = "online", s({
      type: "network:online",
      item: t.itemReference(),
      timestamp: n()
    }));
  }), document.addEventListener("LTNetworkOffline", () => {
    u.events.network.status === "online" && (u.events.network.status = "offline", s({
      type: "network:offline",
      item: t.itemReference(),
      timestamp: n()
    }));
  });
}
function s(e) {
  u.events.events.push(e);
}
function B() {
  s({
    type: "item:load",
    item: t.itemReference(),
    data: {
      num: t.itemPosition()
    },
    timestamp: n()
  });
}
function H() {
  return new Promise((e) => {
    setTimeout(() => {
      const i = document.querySelectorAll(".lrn-assess-dialogs > .lrn-dialog-default");
      let a = "", o = "";
      const d = Array.from(i).filter((p) => p.style.display === "block").map((p) => ({
        id: p.id,
        class: p.className
      }));
      if (d.length === 0) {
        e("");
        return;
      }
      const m = d[0];
      switch (m?.id ? a = m.id.replace(/\d+/g, "") : m?.class.includes("review-screen") && (a = "review-screen"), a) {
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
async function W() {
  return I();
}
function G() {
  return u.events;
}
const X = q("events", U, {
  getEvents: G
});
export {
  X as events
};
