import { c as s, u as g, n as k, o as i, p as b, r as v, v as o, w, x as c } from "./app-c1Nmxn4r.js";
import { c as h } from "./index-Co9T1f1i.js";
const n = {
  initialised: !1,
  network: "online",
  telemetry: {
    session: null,
    user: null,
    events: []
  }
};
function q() {
  _(), t({
    type: "session:start",
    timestamp: e(),
    network: {
      speed: h()
    }
  }), s().on("item:load", () => {
    n.initialised || (E(), T(), O(), N(), n.initialised = !0);
  });
}
function _() {
  n.telemetry.user = g(), n.telemetry.session = k();
}
function E() {
  s().on("test:start", () => {
    t({
      type: "test:start",
      timestamp: e()
    });
  }), s().on("unfocused", () => {
    t({
      type: "unfocused",
      item: i(),
      timestamp: e()
    });
  }), s().on("focused", () => {
    t({
      type: "focused",
      item: i(),
      timestamp: e()
    });
  }), s().on("test:reading:start", () => {
    t({
      type: "test:reading:start",
      timestamp: e()
    });
  }), s().on("test:reading:end", () => {
    t({
      type: "test:reading:end",
      timestamp: e()
    });
  }), s().on("item:warningOnChange", () => {
    t({
      type: "item:warningOnChange",
      item: i(),
      timestamp: e()
    });
  }), s().on("item:load", () => {
    t({
      type: "item:load",
      item: i(),
      data: {
        num: b()
      },
      timestamp: e()
    });
  }), s().on("items:fetch:done", () => {
    t({
      type: "items:fetch:done",
      item: i(),
      timestamp: e()
    });
  }), s().on("section:changed", () => {
    t({
      type: "section:changed",
      timestamp: e()
    });
  }), s().on("test:pause", () => {
    t({
      type: "test:pause",
      timestamp: e()
    });
  }), s().on("test:resume", () => {
    t({
      type: "test:resume",
      timestamp: e()
    });
  }), s().on("test:save", () => {
    t({
      type: "test:save",
      timestamp: e()
    });
  }), s().on("test:save:success", () => {
    t({
      type: "test:save:success",
      timestamp: e()
    });
  }), s().on("test:save:error", () => {
    t({
      type: "test:save:error",
      timestamp: e()
    });
  }), s().on("test:submit", () => {
    t({
      type: "test:submit",
      timestamp: e()
    });
  }), s().on("test:submit:success", () => {
    t({
      type: "test:submit:success",
      timestamp: e()
    });
  }), s().on("test:submit:error", () => {
    t({
      type: "test:submit:error",
      timestamp: e()
    });
  }), s().on("test:finished:save", () => {
    t({
      type: "test:finished:save",
      timestamp: e()
    });
  }), s().on("test:finished:submit", () => {
    t({
      type: "test:finished:submit",
      timestamp: e()
    });
  }), s().on("test:finished:discard", () => {
    t({
      type: "test:finished:discard",
      timestamp: e()
    });
  }), s().on("time:end", () => {
    t({
      type: "time:end",
      timestamp: e()
    });
  });
}
function T() {
  const p = [
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
  ], u = {};
  s().on("item:load", () => {
    v().forEach((a) => {
      const r = s().question(a), d = o(a).type;
      ["audio", "video"].includes(d) && (r.on("recording:started", () => {
        t({
          type: "recording:started",
          item: i(),
          question: o(a).metadata.widget_reference,
          timestamp: e()
        });
      }), r.on("recording:paused", () => {
        t({
          type: "recording:paused",
          item: i(),
          question: o(a).metadata.widget_reference,
          timestamp: e()
        });
      }), r.on("recording:resumed", () => {
        t({
          type: "recording:resumed",
          item: i(),
          question: o(a).metadata.widget_reference,
          timestamp: e()
        });
      }), r.on("recording:stopped", () => {
        t({
          type: "recording:stopped",
          item: i(),
          question: o(a).metadata.widget_reference,
          timestamp: e()
        });
      })), r.on("changed", () => {
        const f = u[a] || 0, { revision: l, value: y } = w(a);
        p.includes(d) ? e() - f >= 3e4 && (u[a] = e(), t({
          type: "question:changed",
          item: i(),
          question: o(a).metadata.widget_reference,
          data: {},
          timestamp: e()
        })) : (t({
          type: "question:changed",
          item: i(),
          question: o(a).metadata.widget_reference,
          data: { revision: l, value: y },
          timestamp: e()
        }), t({
          type: "question:masked",
          item: i(),
          question: o(a).metadata.widget_reference,
          timestamp: e()
        }), t({
          type: "question:validated",
          item: i(),
          question: o(a).metadata.widget_reference,
          timestamp: e()
        }));
      });
    });
  });
}
function O() {
  s().on("item:load", () => {
    [...c().feature_ids, ...c().simplefeature_ids].forEach((m) => {
      s().feature(m) && (s().feature(m).on("begin", () => {
        t({
          type: "begin",
          item: i(),
          timestamp: e()
        });
      }), s().feature(m).on("complete", () => {
        t({
          type: "complete",
          item: i(),
          timestamp: e()
        });
      }), s().feature(m).on("playback:started", () => {
        t({
          type: "playback:started",
          item: i(),
          timestamp: e()
        });
      }), s().feature(m).on("playback:paused", () => {
        t({
          type: "playback:paused",
          item: i(),
          timestamp: e()
        });
      }), s().feature(m).on("playback:resumed", () => {
        t({
          type: "playback:resumed",
          item: i(),
          timestamp: e()
        });
      }), s().feature(m).on("playback:stopped", () => {
        t({
          type: "playback:stopped",
          item: i(),
          timestamp: e()
        });
      }), s().feature(m).on("playback:complete", () => {
        t({
          type: "playback:complete",
          item: i(),
          timestamp: e()
        });
      }));
    });
  });
}
function N() {
  document.addEventListener("LTNetworkOnline", () => {
    n.network === "offline" && (n.network = "online", t({
      type: "network:online",
      item: i(),
      timestamp: e()
    }));
  }), document.addEventListener("LTNetworkOffline", () => {
    n.network === "online" && (n.network = "offline", t({
      type: "network:offline",
      item: i(),
      timestamp: e()
    }));
  });
}
function t(p) {
  n.telemetry.events.push(p);
}
function e() {
  return Date.now();
}
function x() {
  return n.telemetry;
}
const V = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getTelemetry: x,
  run: q
}, Symbol.toStringTag, { value: "Module" }));
export {
  x as g,
  q as r,
  V as t
};
