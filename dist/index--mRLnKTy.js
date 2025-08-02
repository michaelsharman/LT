import { A as g, B as b, C as k, c as s, y as a, D as v, m as w, j as h, E as u } from "./app-DzUv0oqG.js";
import { c as q } from "./index-DGXhMJf8.js";
import E from "./logger.js";
const r = {
  initialised: !1,
  network: "online",
  telemetry: {
    session: null,
    user: null,
    events: []
  }
};
function _() {
  if (g()) {
    E.warn("Telemetry extension is not supported in vertical layout.");
    return;
  }
  T(), r.initialised || (t({
    type: "test:start",
    timestamp: e(),
    network: {
      speed: q()
    }
  }), N(), O(), L(), x(), r.initialised = !0);
}
function T() {
  r.telemetry.user = b(), r.telemetry.session = k();
}
function N() {
  s().on("unfocused", () => {
    t({
      type: "unfocused",
      item: a(),
      timestamp: e()
    });
  }), s().on("focused", () => {
    t({
      type: "focused",
      item: a(),
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
      item: a(),
      timestamp: e()
    });
  }), s().on("item:load", () => {
    t({
      type: "item:load",
      item: a(),
      data: {
        num: v()
      },
      timestamp: e()
    });
  }), s().on("items:fetch:done", () => {
    t({
      type: "items:fetch:done",
      item: a(),
      timestamp: e()
    });
  }), s().on("section:changed", () => {
    t({
      type: "section:changed",
      timestamp: e()
    });
  }), s().on("test:panel:show", async () => {
    const m = await V();
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
function O() {
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
  ], c = {};
  s().on("item:load", () => {
    w().forEach((i) => {
      const p = s().question(i), n = p.getQuestion(), d = n.type;
      ["audio", "video"].includes(d) && (p.on("recording:started", () => {
        t({
          type: "recording:started",
          item: a(),
          question: n.metadata.widget_reference,
          timestamp: e()
        });
      }), p.on("recording:paused", () => {
        t({
          type: "recording:paused",
          item: a(),
          question: n.metadata.widget_reference,
          timestamp: e()
        });
      }), p.on("recording:resumed", () => {
        t({
          type: "recording:resumed",
          item: a(),
          question: n.metadata.widget_reference,
          timestamp: e()
        });
      }), p.on("recording:stopped", () => {
        t({
          type: "recording:stopped",
          item: a(),
          question: n.metadata.widget_reference,
          timestamp: e()
        });
      })), p.on("changed", () => {
        const l = c[i] || 0, { revision: f, value: y } = h(i);
        m.includes(d) ? e() - l >= 3e4 && (c[i] = e(), t({
          type: "question:changed",
          item: a(),
          question: n.metadata.widget_reference,
          data: {},
          timestamp: e()
        })) : (t({
          type: "question:changed",
          item: a(),
          question: n.metadata.widget_reference,
          data: { revision: f, value: y },
          timestamp: e()
        }), t({
          type: "question:masked",
          item: a(),
          question: n.metadata.widget_reference,
          timestamp: e()
        }), t({
          type: "question:validated",
          item: a(),
          question: n.metadata.widget_reference,
          timestamp: e()
        }));
      });
    });
  });
}
function L() {
  s().on("item:load", () => {
    [...u().feature_ids, ...u().simplefeature_ids].forEach((o) => {
      s().feature(o) && (s().feature(o).on("begin", () => {
        t({
          type: "begin",
          item: a(),
          timestamp: e()
        });
      }), s().feature(o).on("complete", () => {
        t({
          type: "complete",
          item: a(),
          timestamp: e()
        });
      }), s().feature(o).on("playback:started", () => {
        t({
          type: "playback:started",
          item: a(),
          timestamp: e()
        });
      }), s().feature(o).on("playback:paused", () => {
        t({
          type: "playback:paused",
          item: a(),
          timestamp: e()
        });
      }), s().feature(o).on("playback:resumed", () => {
        t({
          type: "playback:resumed",
          item: a(),
          timestamp: e()
        });
      }), s().feature(o).on("playback:stopped", () => {
        t({
          type: "playback:stopped",
          item: a(),
          timestamp: e()
        });
      }), s().feature(o).on("playback:complete", () => {
        t({
          type: "playback:complete",
          item: a(),
          timestamp: e()
        });
      }));
    });
  });
}
function x() {
  document.addEventListener("LTNetworkOnline", () => {
    r.network === "offline" && (r.network = "online", t({
      type: "network:online",
      item: a(),
      timestamp: e()
    }));
  }), document.addEventListener("LTNetworkOffline", () => {
    r.network === "online" && (r.network = "offline", t({
      type: "network:offline",
      item: a(),
      timestamp: e()
    }));
  });
}
function t(m) {
  r.telemetry.events.push(m);
}
function V() {
  return new Promise((m) => {
    setTimeout(() => {
      const o = document.querySelectorAll(".lrn-assess-dialogs > .lrn-dialog-default");
      let c = "", i = "";
      const p = Array.from(o).filter((d) => d.style.display === "block").map((d) => ({
        id: d.id,
        class: d.className
      }));
      if (p.length === 0) {
        m("");
        return;
      }
      const n = p[0];
      switch (n?.id ? c = n.id.replace(/\d+/g, "") : n?.class.includes("review-screen") && (c = "review-screen"), c) {
        case "accessibility-panel":
          i = "dialog:accessibility";
          break;
        case "custom-dialog":
          i = "dialog:custom-dialog";
          break;
        case "module-load-error-dialog":
          i = "dialog:module-load-error";
          break;
        case "review-screen":
          i = "dialog:review-screen";
          break;
        case "test-asset-upload-error-dialog":
          i = "dialog:asset-upload-error";
          break;
        case "test-error-dialog":
          i = "dialog:error";
          break;
        case "test-pause-dialog":
          i = "dialog:pause";
          break;
        case "test-save-submit":
          i = "dialog:save-submit";
          break;
      }
      m(i);
    }, 500);
  });
}
function e() {
  return Date.now();
}
function A() {
  return r.telemetry;
}
const I = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getTelemetry: A,
  run: _
}, Symbol.toStringTag, { value: "Module" }));
export {
  A as g,
  _ as r,
  I as t
};
