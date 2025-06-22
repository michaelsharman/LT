import { u as g, n as w, c as s, o as i, p as v, r as h, v as p, w as k, x as d } from "./app-C2_EjRb0.js";
import { c as b } from "./index-BlrzqTbR.js";
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
      speed: b()
    }
  }), E(), T(), N(), O(), m.initialised = !0);
}
function _() {
  m.telemetry.user = g(), m.telemetry.session = w();
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
        num: v()
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
  }), s().on("test:panel:show", async () => {
    console.log("test:panel:show called");
    const o = await x();
    console.log("test:panel:show event", o), t({
      type: o,
      timestamp: e()
    });
  }), s().on("test:panel:show", () => {
    console.log("test:panel:show no async");
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
  const o = [
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
    h().forEach((n) => {
      const r = s().question(n), c = p(n).type;
      ["audio", "video"].includes(c) && (r.on("recording:started", () => {
        t({
          type: "recording:started",
          item: i(),
          question: p(n).metadata.widget_reference,
          timestamp: e()
        });
      }), r.on("recording:paused", () => {
        t({
          type: "recording:paused",
          item: i(),
          question: p(n).metadata.widget_reference,
          timestamp: e()
        });
      }), r.on("recording:resumed", () => {
        t({
          type: "recording:resumed",
          item: i(),
          question: p(n).metadata.widget_reference,
          timestamp: e()
        });
      }), r.on("recording:stopped", () => {
        t({
          type: "recording:stopped",
          item: i(),
          question: p(n).metadata.widget_reference,
          timestamp: e()
        });
      })), r.on("changed", () => {
        const l = u[n] || 0, { revision: f, value: y } = k(n);
        o.includes(c) ? e() - l >= 3e4 && (u[n] = e(), t({
          type: "question:changed",
          item: i(),
          question: p(n).metadata.widget_reference,
          data: {},
          timestamp: e()
        })) : (t({
          type: "question:changed",
          item: i(),
          question: p(n).metadata.widget_reference,
          data: { revision: f, value: y },
          timestamp: e()
        }), t({
          type: "question:masked",
          item: i(),
          question: p(n).metadata.widget_reference,
          timestamp: e()
        }), t({
          type: "question:validated",
          item: i(),
          question: p(n).metadata.widget_reference,
          timestamp: e()
        }));
      });
    });
  });
}
function N() {
  s().on("item:load", () => {
    [...d().feature_ids, ...d().simplefeature_ids].forEach((a) => {
      s().feature(a) && (s().feature(a).on("begin", () => {
        t({
          type: "begin",
          item: i(),
          timestamp: e()
        });
      }), s().feature(a).on("complete", () => {
        t({
          type: "complete",
          item: i(),
          timestamp: e()
        });
      }), s().feature(a).on("playback:started", () => {
        t({
          type: "playback:started",
          item: i(),
          timestamp: e()
        });
      }), s().feature(a).on("playback:paused", () => {
        t({
          type: "playback:paused",
          item: i(),
          timestamp: e()
        });
      }), s().feature(a).on("playback:resumed", () => {
        t({
          type: "playback:resumed",
          item: i(),
          timestamp: e()
        });
      }), s().feature(a).on("playback:stopped", () => {
        t({
          type: "playback:stopped",
          item: i(),
          timestamp: e()
        });
      }), s().feature(a).on("playback:complete", () => {
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
function t(o) {
  m.telemetry.events.push(o);
}
function x() {
  return new Promise((o) => {
    setTimeout(() => {
      const a = document.querySelectorAll(".lrn-assess-dialogs > .lrn-dialog-default");
      let u = "";
      const n = Array.from(a).filter((c) => c.style.display === "block").map((c) => ({
        id: c.id,
        class: c.className
      }));
      if (n.length === 0) {
        o("");
        return;
      }
      const r = n[0];
      r?.id ? u = r.id.replace(/\d+/g, "") : r?.class.includes("review-screen") && (u = "review-screen"), o(u);
    }, 500);
  });
}
function e() {
  return Date.now();
}
function L() {
  return m.telemetry;
}
const A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getTelemetry: L,
  run: q
}, Symbol.toStringTag, { value: "Module" }));
export {
  L as g,
  q as r,
  A as t
};
