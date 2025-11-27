import { e as O, f as x } from "../../player-BmddCyd3.js";
import { networkStatus as q } from "./networkStatus.js";
import { c as C, L as t } from "../../extensionsFactory-BHOEyOSK.js";
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
function T(e) {
  return r.edge.test(e) ? l({ name: "Edge", version: c(r.edge, e) }) : r.opr.test(e) ? l({ name: "Opera", version: c(r.opr, e) }) : r.samsung.test(e) ? l({ name: "Samsung Internet", version: c(r.samsung, e) }) : /Chrome\//.test(e) && !r.edge.test(e) && !r.opr.test(e) && !r.samsung.test(e) ? l({ name: "Chrome", version: c(r.chrome, e) }) : r.firefox.test(e) ? l({ name: "Firefox", version: c(r.firefox, e) }) : !/Chrome|Chromium|Edg|OPR|SamsungBrowser/.test(e) && r.safariTail.test(e) ? l({ name: "Safari", version: c(r.version, e) }) : {};
}
function L(e) {
  return /Macintosh/.test(e) && /Mobile\//.test(e) && /Safari/.test(e) ? { name: "iOS", version: void 0 } : r.win.test(e) ? { name: "Windows", version: c(r.win, e) || void 0 } : /iPhone|iPad|iPod/.test(e) ? { name: "iOS", version: A(c(r.ios, e)) } : r.android.test(e) ? { name: "Android", version: c(r.android, e) } : r.cros.test(e) ? { name: "Chrome OS", version: c(r.cros, e) } : r.mac.test(e) ? { name: "macOS", version: A(c(r.mac, e)) } : r.linux.test(e) ? { name: "Linux", version: void 0 } : {};
}
function P(e) {
  return r.bot.test(e) ? "bot" : r.ipad.test(e) || r.tablet.test(e) ? "tablet" : r.mobileHint.test(e) || /Android/.test(e) && !/Tablet|iPad/.test(e) ? "mobile" : "desktop";
}
function V(e) {
  return r.webkit.test(e) ? { name: "WebKit", version: c(r.webkit, e) } : /Gecko\/\d/.test(e) && /Firefox\/([\d.]+)/.test(e) ? { name: "Gecko", version: c(r.firefox, e) } : /Chrome\/|Edg\/|OPR\/|SamsungBrowser\//.test(e) ? { name: "Blink" } : {};
}
function B(e, i) {
  try {
    const a = i && (i.brands || i.getBrands?.());
    if (!a || !a.length)
      return e;
    const o = a.filter((m) => !/Not.?A.?Brand/i.test(m.brand)).sort((m, d) => parseInt(d.version, 10) - parseInt(m.version, 10))[0];
    if (o && o.brand)
      return l({ name: o.brand, version: e.version });
  } catch {
  }
  return e;
}
function N(e) {
  return e = e || "", {
    ua: e,
    browser: T(e),
    os: L(e),
    deviceType: P(e),
    engine: V(e),
    reducedUA: /\bChrome\/\d+\.0\.0\.0\b/.test(e) || /\bEdg\/\d+\.0\.0\.0\b/.test(e) || !1
  };
}
function F() {
  const e = typeof navigator < "u" && navigator.userAgent ? navigator.userAgent : "", i = typeof navigator < "u" ? navigator.userAgentData : void 0, a = N(e);
  return i && (i.brands || i.getBrands) && (a.browser = B(a.browser, i)), a.meta = {
    source: i && (i.brands || i.getBrands) ? "ua-ch-low" : "ua",
    usedHighEntropy: !1,
    isReducedUA: w(e)
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
      ]), m = o.fullVersionList || i.brands || i.getBrands?.() || [], d = ["Chrome", "Google Chrome", "Microsoft Edge", "Edge", "Chromium", "Opera", "OPR", "Samsung Internet", "Firefox"], u = m.find((y) => d.some((S) => y.brand.toLowerCase().includes(S.toLowerCase()))) || m.find((y) => !/Not.?A.?Brand/i.test(y.brand)) || null, g = u?.brand || m[0] && m[0].brand || void 0, f = u?.version || o.uaFullVersion || void 0, b = o.platform || void 0, h = o.platformVersion || void 0;
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
          isReducedUA: w(e)
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
function w(e) {
  return /\bChrome\/\d+\.0\.0\.0\b/.test(e) || /\bEdg\/\d+\.0\.0\.0\b/.test(e);
}
function A(e) {
  return e ? e.replace(/_/g, ".") : void 0;
}
function l(e) {
  if (e && e.version && typeof e.version == "string") {
    const i = e.version.split(".")[0];
    i && (e.versionMajor = i);
  }
  return e;
}
const p = {
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
  p.initialised || (_(), t.itemsApp().on("item:load", () => {
    R(), k(), E();
  }), D(), M(), z(), p.initialised = !0);
}
function _() {
  O() ? s({
    type: "test:ready",
    timestamp: n()
  }) : (s({
    type: "test:start",
    timestamp: n()
  }), x() && s({
    type: "test:reading:start",
    timestamp: n()
  }), R(), k(), E());
}
async function M() {
  p.events.user = t.userId(), p.events.session = t.sessionId(), p.events.environment = await W(), p.events.network.speed = q.checkSpeed();
}
function D() {
  t.itemsApp().on("test:start", () => {
    p.events.events.find((i) => i.type === "test:start") || s({
      type: "test:start",
      timestamp: n()
    });
  }), t.itemsApp().on("unfocused", () => {
    s({
      type: "unfocused",
      item: t.itemReference(),
      timestamp: n()
    });
  }), t.itemsApp().on("focused", () => {
    s({
      type: "focused",
      item: t.itemReference(),
      timestamp: n()
    });
  }), t.itemsApp().on("test:reading:start", () => {
    p.events.events.find((i) => i.type === "test:reading:start") || s({
      type: "test:reading:start",
      timestamp: n()
    });
  }), t.itemsApp().on("test:reading:end", () => {
    s({
      type: "test:reading:end",
      timestamp: n()
    });
  }), t.itemsApp().on("item:warningOnChange", () => {
    s({
      type: "item:warningOnChange",
      item: t.itemReference(),
      timestamp: n()
    });
  }), t.itemsApp().on("items:fetch:done", () => {
    s({
      type: "items:fetch:done",
      item: t.itemReference(),
      timestamp: n()
    });
  }), t.itemsApp().on("section:changed", () => {
    s({
      type: "section:changed",
      timestamp: n()
    });
  }), t.itemsApp().on("test:panel:show", async () => {
    const e = await H();
    ["dialog:pause"].includes(e) || s({
      type: e,
      timestamp: n()
    });
  }), t.itemsApp().on("test:pause", () => {
    s({
      type: "test:pause",
      timestamp: n()
    });
  }), t.itemsApp().on("test:resume", () => {
    s({
      type: "test:resume",
      timestamp: n()
    });
  }), t.itemsApp().on("test:save", () => {
    s({
      type: "test:save",
      timestamp: n()
    });
  }), t.itemsApp().on("test:save:success", () => {
    s({
      type: "test:save:success",
      timestamp: n()
    });
  }), t.itemsApp().on("test:save:error", () => {
    s({
      type: "test:save:error",
      timestamp: n()
    });
  }), t.itemsApp().on("test:submit", () => {
    s({
      type: "test:submit",
      timestamp: n()
    });
  }), t.itemsApp().on("test:submit:success", () => {
    s({
      type: "test:submit:success",
      timestamp: n()
    });
  }), t.itemsApp().on("test:submit:error", () => {
    s({
      type: "test:submit:error",
      timestamp: n()
    });
  }), t.itemsApp().on("test:finished:save", () => {
    s({
      type: "test:finished:save",
      timestamp: n()
    });
  }), t.itemsApp().on("test:finished:submit", () => {
    s({
      type: "test:finished:submit",
      timestamp: n()
    });
  }), t.itemsApp().on("test:finished:discard", () => {
    s({
      type: "test:finished:discard",
      timestamp: n()
    });
  }), t.itemsApp().on("time:end", () => {
    s({
      type: "time:end",
      timestamp: n()
    });
  });
}
function k() {
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
  t.questionResponseIds().forEach((m) => {
    const d = t.itemsApp().question(m), u = d.getQuestion(), g = u.type, f = u.metadata.widget_reference;
    ["audio", "video"].includes(g) && (d.on("recording:started", () => {
      s({
        type: "recording:started",
        item: t.itemReference(),
        question: f,
        timestamp: n()
      });
    }), d.on("recording:paused", () => {
      s({
        type: "recording:paused",
        item: t.itemReference(),
        question: f,
        timestamp: n()
      });
    }), d.on("recording:resumed", () => {
      s({
        type: "recording:resumed",
        item: t.itemReference(),
        question: f,
        timestamp: n()
      });
    }), d.on("recording:stopped", () => {
      s({
        type: "recording:stopped",
        item: t.itemReference(),
        question: f,
        timestamp: n()
      });
    })), d.on("changed", () => {
      const b = o[m] || 0, { revision: h, value: v } = t.questionResponse(m);
      if (e.includes(g) || i.includes(g)) {
        if (n() - b >= 3e4) {
          o[m] = n();
          const y = i.includes(g) ? { revision: h, value: v } : {};
          s({
            type: "question:changed",
            item: t.itemReference(),
            question: f,
            responseId: m,
            data: y,
            timestamp: n()
          });
        }
      } else
        s({
          type: "question:changed",
          item: t.itemReference(),
          question: f,
          responseId: m,
          data: { revision: h, value: v },
          timestamp: n()
        });
    }), d.on("masked", () => {
      s({
        type: "question:masked",
        item: t.itemReference(),
        question: f,
        timestamp: n()
      });
    }), d.on("validated", () => {
      s({
        type: "question:validated",
        item: t.itemReference(),
        question: f,
        timestamp: n()
      });
    });
  });
}
function E() {
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
    p.events.network.status === "offline" && (p.events.network.status = "online", s({
      type: "network:online",
      item: t.itemReference(),
      timestamp: n()
    }));
  }), document.addEventListener("LTNetworkOffline", () => {
    p.events.network.status === "online" && (p.events.network.status = "offline", s({
      type: "network:offline",
      item: t.itemReference(),
      timestamp: n()
    }));
  });
}
function s(e) {
  p.events.events.push(e);
}
function R() {
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
      const m = Array.from(i).filter((u) => u.style.display === "block").map((u) => ({
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
async function W() {
  return I();
}
function G() {
  return p.events;
}
const X = C("events", U, {
  getEvents: G
});
export {
  X as events
};
