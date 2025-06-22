import { u as g, n as b, c as s, o as i, p as k, r as v, v as r, w, x as l } from "./app-C2_EjRb0.js";
import { c as h } from "./index-BlrzqTbR.js";
const o = {
  initialised: !1,
  network: "online",
  telemetry: {
    session: null,
    user: null,
    events: []
  }
};
function q() {
  E(), o.initialised || (t({
    type: "test:start",
    timestamp: e(),
    network: {
      speed: h()
    }
  }), _(), T(), N(), O(), o.initialised = !0);
}
function E() {
  o.telemetry.user = g(), o.telemetry.session = b();
}
function _() {
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
        num: k()
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
    const m = await x();
    t({
      type: m,
      timestamp: e()
    });
  }), s().on("test:panel:hide", () => {
    t({
      type: "dialog:hide",
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
  const m = [
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
  ], d = {};
  s().on("item:load", () => {
    v().forEach((a) => {
      const p = s().question(a), c = r(a).type;
      ["audio", "video"].includes(c) && (p.on("recording:started", () => {
        t({
          type: "recording:started",
          item: i(),
          question: r(a).metadata.widget_reference,
          timestamp: e()
        });
      }), p.on("recording:paused", () => {
        t({
          type: "recording:paused",
          item: i(),
          question: r(a).metadata.widget_reference,
          timestamp: e()
        });
      }), p.on("recording:resumed", () => {
        t({
          type: "recording:resumed",
          item: i(),
          question: r(a).metadata.widget_reference,
          timestamp: e()
        });
      }), p.on("recording:stopped", () => {
        t({
          type: "recording:stopped",
          item: i(),
          question: r(a).metadata.widget_reference,
          timestamp: e()
        });
      })), p.on("changed", () => {
        const u = d[a] || 0, { revision: f, value: y } = w(a);
        m.includes(c) ? e() - u >= 3e4 && (d[a] = e(), t({
          type: "question:changed",
          item: i(),
          question: r(a).metadata.widget_reference,
          data: {},
          timestamp: e()
        })) : (t({
          type: "question:changed",
          item: i(),
          question: r(a).metadata.widget_reference,
          data: { revision: f, value: y },
          timestamp: e()
        }), t({
          type: "question:masked",
          item: i(),
          question: r(a).metadata.widget_reference,
          timestamp: e()
        }), t({
          type: "question:validated",
          item: i(),
          question: r(a).metadata.widget_reference,
          timestamp: e()
        }));
      });
    });
  });
}
function N() {
  s().on("item:load", () => {
    [...l().feature_ids, ...l().simplefeature_ids].forEach((n) => {
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
    o.network === "offline" && (o.network = "online", t({
      type: "network:online",
      item: i(),
      timestamp: e()
    }));
  }), document.addEventListener("LTNetworkOffline", () => {
    o.network === "online" && (o.network = "offline", t({
      type: "network:offline",
      item: i(),
      timestamp: e()
    }));
  });
}
function t(m) {
  o.telemetry.events.push(m);
}
function x() {
  return new Promise((m) => {
    setTimeout(() => {
      const n = document.querySelectorAll(".lrn-assess-dialogs > .lrn-dialog-default");
      let d = "", a = "";
      const p = Array.from(n).filter((u) => u.style.display === "block").map((u) => ({
        id: u.id,
        class: u.className
      }));
      if (p.length === 0) {
        m("");
        return;
      }
      const c = p[0];
      switch (c?.id ? d = c.id.replace(/\d+/g, "") : c?.class.includes("review-screen") && (d = "review-screen"), d) {
        case "accessibility-panel":
          a = "dialog:accessibility";
          break;
        case "custom-dialog":
          a = "dialog:custom-dialog";
          break;
        case "module-load-error-dialog":
          a = "dialog:module-load-error";
          break;
        case "review-screen":
          a = "dialog:review-screen";
          break;
        case "test-asset-upload-error-dialog":
          a = "dialog:asset-upload-error";
          break;
        case "test-error-dialog":
          a = "dialog:error";
          break;
        case "test-pause-dialog":
          a = "dialog:pause";
          break;
        case "test-save-submit":
          a = "dialog:save-submit";
          break;
      }
      m(a);
    }, 500);
  });
}
function e() {
  return Date.now();
}
function L() {
  return o.telemetry;
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
