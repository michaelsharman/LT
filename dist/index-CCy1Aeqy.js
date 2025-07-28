import { u as y, m as g, c as s, n as i, o as b, p as k, r as v, v as u } from "./app-DV5bcV_K.js";
import { c as w } from "./index-BGoSnTgK.js";
const m = {
  initialised: !1,
  network: "online",
  telemetry: {
    session: null,
    user: null,
    events: []
  }
};
function h() {
  q(), m.initialised || (t({
    type: "test:start",
    timestamp: e(),
    network: {
      speed: w()
    }
  }), E(), _(), T(), N(), m.initialised = !0);
}
function q() {
  m.telemetry.user = y(), m.telemetry.session = g();
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
  }), s().on("test:panel:show", async () => {
    const r = await O();
    t({
      type: r,
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
function _() {
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
      const n = s().question(a), d = n.getQuestion().type;
      ["audio", "video"].includes(d) && (n.on("recording:started", () => {
        t({
          type: "recording:started",
          item: i(),
          question: n(a).metadata.widget_reference,
          timestamp: e()
        });
      }), n.on("recording:paused", () => {
        t({
          type: "recording:paused",
          item: i(),
          question: n(a).metadata.widget_reference,
          timestamp: e()
        });
      }), n.on("recording:resumed", () => {
        t({
          type: "recording:resumed",
          item: i(),
          question: n(a).metadata.widget_reference,
          timestamp: e()
        });
      }), n.on("recording:stopped", () => {
        t({
          type: "recording:stopped",
          item: i(),
          question: n(a).metadata.widget_reference,
          timestamp: e()
        });
      })), n.on("changed", () => {
        const c = p[a] || 0, { revision: l, value: f } = v(a);
        r.includes(d) ? e() - c >= 3e4 && (p[a] = e(), t({
          type: "question:changed",
          item: i(),
          question: n(a).metadata.widget_reference,
          data: {},
          timestamp: e()
        })) : (t({
          type: "question:changed",
          item: i(),
          question: n(a).metadata.widget_reference,
          data: { revision: l, value: f },
          timestamp: e()
        }), t({
          type: "question:masked",
          item: i(),
          question: n(a).metadata.widget_reference,
          timestamp: e()
        }), t({
          type: "question:validated",
          item: i(),
          question: n(a).metadata.widget_reference,
          timestamp: e()
        }));
      });
    });
  });
}
function T() {
  s().on("item:load", () => {
    [...u().feature_ids, ...u().simplefeature_ids].forEach((o) => {
      s().feature(o) && (s().feature(o).on("begin", () => {
        t({
          type: "begin",
          item: i(),
          timestamp: e()
        });
      }), s().feature(o).on("complete", () => {
        t({
          type: "complete",
          item: i(),
          timestamp: e()
        });
      }), s().feature(o).on("playback:started", () => {
        t({
          type: "playback:started",
          item: i(),
          timestamp: e()
        });
      }), s().feature(o).on("playback:paused", () => {
        t({
          type: "playback:paused",
          item: i(),
          timestamp: e()
        });
      }), s().feature(o).on("playback:resumed", () => {
        t({
          type: "playback:resumed",
          item: i(),
          timestamp: e()
        });
      }), s().feature(o).on("playback:stopped", () => {
        t({
          type: "playback:stopped",
          item: i(),
          timestamp: e()
        });
      }), s().feature(o).on("playback:complete", () => {
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
function O() {
  return new Promise((r) => {
    setTimeout(() => {
      const o = document.querySelectorAll(".lrn-assess-dialogs > .lrn-dialog-default");
      let p = "", a = "";
      const n = Array.from(o).filter((c) => c.style.display === "block").map((c) => ({
        id: c.id,
        class: c.className
      }));
      if (n.length === 0) {
        r("");
        return;
      }
      const d = n[0];
      switch (d?.id ? p = d.id.replace(/\d+/g, "") : d?.class.includes("review-screen") && (p = "review-screen"), p) {
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
      r(a);
    }, 500);
  });
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
  run: h
}, Symbol.toStringTag, { value: "Module" }));
export {
  L as g,
  h as r,
  V as t
};
