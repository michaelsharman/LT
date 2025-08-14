import i from "./logger.js";
const n = {
  events: {
    broadcast: !1,
    listenFor: "all",
    extensions: []
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
function a(e) {
  if (n.events.broadcast) {
    const t = n.events.listenFor, s = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? i.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(s) && i.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(s) && i.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(s) && i.info(e) : e.startsWith(s) && i.info(e);
  }
}
function c(e = !0) {
  n.events.broadcast = !!e, e ? i.info(`👂 listening for '${n.events.listenFor}'`) : i.info("🚫👂 not listening");
}
function l() {
  n.initialised || (window.addEventListener("module:run", (e) => {
    const { name: t, timestamp: s } = e.detail;
    n.events.extensions.push({ name: t, timestamp: s });
  }), n.initialised = !0);
}
const v = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: d,
  extensionsListener: l,
  filterEvent: f,
  handleEvent: a,
  listen: c
}, Symbol.toStringTag, { value: "Module" })), o = {};
function p(e) {
  o.app = e, g();
}
function r() {
  return o.app;
}
function u() {
  return r().editorApp() !== void 0 ? r().editorApp() : null;
}
function g() {
  o.app.on("all", a), ["widgetedit:editor:ready", "widgetedit:widget:ready", "widgetedit:preview:changed", "widgetedit:widget:changed"].forEach((t) => o.app.on(t, () => a(t))), l();
}
const w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appInstance: r,
  init: p,
  questionEditorApp: u
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as a,
  v as b,
  w as c,
  d
};
