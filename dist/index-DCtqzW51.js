import { u as g, n as v, c as s, o as i, p as b, r as k, v as o, w, x as c } from "./app-C2_EjRb0.js";
import { c as h } from "./index-BlrzqTbR.js";
const m = {
  initialised: !1,
  network: "online",
  telemetry: {
    session: null,
    user: null,
    events: []
  }
};
function q() {
  _(), m.initialised || (t({
    type: "test:start",
    timestamp: e(),
    network: {
      speed: h()
    }
  }), E(), T(), N(), O(), m.initialised = !0);
}
function _() {
  m.telemetry.user = g(), m.telemetry.session = v();
}
function E() {
  s().on("unfocused", () => {
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
  }), s().on("test:panel.show", async () => {
    const r = await x();
    t({
      type: r,
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
  const r = [
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
  ], p = {};
  s().on("item:load", () => {
    k().forEach((a) => {
      const u = s().question(a), d = o(a).type;
      ["audio", "video"].includes(d) && (u.on("recording:started", () => {
        t({
          type: "recording:started",
          item: i(),
          question: o(a).metadata.widget_reference,
          timestamp: e()
        });
      }), u.on("recording:paused", () => {
        t({
          type: "recording:paused",
          item: i(),
          question: o(a).metadata.widget_reference,
          timestamp: e()
        });
      }), u.on("recording:resumed", () => {
        t({
          type: "recording:resumed",
          item: i(),
          question: o(a).metadata.widget_reference,
          timestamp: e()
        });
      }), u.on("recording:stopped", () => {
        t({
          type: "recording:stopped",
          item: i(),
          question: o(a).metadata.widget_reference,
          timestamp: e()
        });
      })), u.on("changed", () => {
        const l = p[a] || 0, { revision: f, value: y } = w(a);
        r.includes(d) ? e() - l >= 3e4 && (p[a] = e(), t({
          type: "question:changed",
          item: i(),
          question: o(a).metadata.widget_reference,
          data: {},
          timestamp: e()
        })) : (t({
          type: "question:changed",
          item: i(),
          question: o(a).metadata.widget_reference,
          data: { revision: f, value: y },
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
function N() {
  s().on("item:load", () => {
    [...c().feature_ids, ...c().simplefeature_ids].forEach((n) => {
      s().feature(n) && (s().feature(n).on("begin", () => {
        t({
          type: "begin",
          item: i(),
          timestamp: e()
        });
      }), s().feature(n).on("complete", () => {
        t({
          type: "complete",
          item: i(),
          timestamp: e()
        });
      }), s().feature(n).on("playback:started", () => {
        t({
          type: "playback:started",
          item: i(),
          timestamp: e()
        });
      }), s().feature(n).on("playback:paused", () => {
        t({
          type: "playback:paused",
          item: i(),
          timestamp: e()
        });
      }), s().feature(n).on("playback:resumed", () => {
        t({
          type: "playback:resumed",
          item: i(),
          timestamp: e()
        });
      }), s().feature(n).on("playback:stopped", () => {
        t({
          type: "playback:stopped",
          item: i(),
          timestamp: e()
        });
      }), s().feature(n).on("playback:complete", () => {
        t({
          type: "playback:complete",
          item: i(),
          timestamp: e()
        });
      }));
    });
  });
}
function O() {
  document.addEventListener("LTNetworkOnline", () => {
    m.network === "offline" && (m.network = "online", t({
      type: "network:online",
      item: i(),
      timestamp: e()
    }));
  }), document.addEventListener("LTNetworkOffline", () => {
    m.network === "online" && (m.network = "offline", t({
      type: "network:offline",
      item: i(),
      timestamp: e()
    }));
  });
}
function t(r) {
  m.telemetry.events.push(r);
}
function x() {
  setTimeout(() => {
    const r = document.querySelectorAll(".lrn-assess-dialogs > .lrn-dialog-default"), n = Array.from(r).filter((p) => p.style.display === "block").map((p) => ({
      id: p.id,
      class: p.className
    }));
    return n.id && n.id.replace(/\d+/g, ""), visibleDialogInfo;
  }, 500);
}
function e() {
  return Date.now();
}
function L() {
  return m.telemetry;
}
const V = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getTelemetry: L,
  run: q
}, Symbol.toStringTag, { value: "Module" }));
export {
  L as g,
  q as r,
  V as t
};
