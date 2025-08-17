import i from "./logger.js";
const n = {
  events: {
    broadcast: !1,
    listenFor: "all"
  },
  extensions: {
    running: []
  },
  initialised: !1
};
function d() {
  const e = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {},
    LT: {
      extensions: n.events.extensions,
      version: "3.0.0-beta.8"
    },
    versions: e
  };
}
function f(e) {
  /^[a-zA-Z:*]*$/.test(e) ? n.events.listenFor = e : i.warn("Invalid event type");
}
function r(e) {
  if (n.events.broadcast) {
    const t = n.events.listenFor, s = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? i.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(s) && i.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(s) && i.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(s) && i.info(e) : e.startsWith(s) && i.info(e);
  }
}
function c(e = !0) {
  n.events.broadcast = !!e, e ? i.info(`👂 listening for '${n.events.listenFor}'`) : i.info("🚫👂 not listening");
}
function l() {
  n.initialised || (window.addEventListener("extension:run", (e) => {
    const { name: t, timestamp: s } = e.detail;
    n.extensions.running.push({ name: t, timestamp: s });
  }), n.initialised = !0);
}
const v = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: d,
  extensionsListener: l,
  filterEvent: f,
  handleEvent: r,
  listen: c
}, Symbol.toStringTag, { value: "Module" })), o = {};
function p(e) {
  o.app = e, g();
}
function a() {
  return o.app;
}
function u() {
  return a().editorApp() !== void 0 ? a().editorApp() : null;
}
function g() {
  o.app.on("all", r), ["widgetedit:editor:ready", "widgetedit:widget:ready", "widgetedit:preview:changed", "widgetedit:widget:changed"].forEach((t) => o.app.on(t, () => r(t))), l();
}
const w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appInstance: a,
  init: p,
  questionEditorApp: u
}, Symbol.toStringTag, { value: "Module" }));
export {
  a,
  w as b,
  d as c,
  v as d
};
