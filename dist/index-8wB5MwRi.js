import { u as g, n as w, c as s, o as i, p as v, r as k, v as p, w as b, x as d } from "./app-C2_EjRb0.js";
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
  ], c = {};
  s().on("item:load", () => {
    k().forEach((a) => {
      const r = s().question(a), u = p(a).type;
      ["audio", "video"].includes(u) && (r.on("recording:started", () => {
        t({
          type: "recording:started",
          item: i(),
          question: p(a).metadata.widget_reference,
          timestamp: e()
        });
      }), r.on("recording:paused", () => {
        t({
          type: "recording:paused",
          item: i(),
          question: p(a).metadata.widget_reference,
          timestamp: e()
        });
      }), r.on("recording:resumed", () => {
        t({
          type: "recording:resumed",
          item: i(),
          question: p(a).metadata.widget_reference,
          timestamp: e()
        });
      }), r.on("recording:stopped", () => {
        t({
          type: "recording:stopped",
          item: i(),
          question: p(a).metadata.widget_reference,
          timestamp: e()
        });
      })), r.on("changed", () => {
        const l = c[a] || 0, { revision: f, value: y } = b(a);
        o.includes(u) ? e() - l >= 3e4 && (c[a] = e(), t({
          type: "question:changed",
          item: i(),
          question: p(a).metadata.widget_reference,
          data: {},
          timestamp: e()
        })) : (t({
          type: "question:changed",
          item: i(),
          question: p(a).metadata.widget_reference,
          data: { revision: f, value: y },
          timestamp: e()
        }), t({
          type: "question:masked",
          item: i(),
          question: p(a).metadata.widget_reference,
          timestamp: e()
        }), t({
          type: "question:validated",
          item: i(),
          question: p(a).metadata.widget_reference,
          timestamp: e()
        }));
      });
    });
  });
}
function N() {
  s().on("item:load", () => {
    [...d().feature_ids, ...d().simplefeature_ids].forEach((n) => {
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
function t(o) {
  m.telemetry.events.push(o);
}
function x() {
  return new Promise((o) => {
    setTimeout(() => {
      const n = document.querySelectorAll(".lrn-assess-dialogs > .lrn-dialog-default");
      let c = "";
      const a = Array.from(n).filter((u) => u.style.display === "block").map((u) => ({
        id: u.id,
        class: u.className
      }));
      if (a.length === 0) {
        o("");
        return;
      }
      const r = a[0];
      r?.id ? c = r.id.replace(/\d+/g, "") : r?.class.includes("review-screen") && (c = "review-screen"), o(c);
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
