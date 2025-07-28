import { l as s } from "./logger-BpyELtLr.js";
const l = "@caspingus/lt", d = "3.0.0-beta.2", c = "module", p = "A utility library of helpers and extensions useful when working with Learnosity APIs.", u = ["learnosity", "assessment", "edtech"], g = "MIT", h = "michael@learnosity.com", f = "https://michaelsharman.github.io/LT/", m = { type: "git", url: "git+https://github.com/michaelsharman/LT.git" }, b = { url: "https://github.com/michaelsharman/LT/issues" }, v = { ".": null, "./assessment": "./dist/assessment/index.js", "./assessment/core": "./dist/assessment/core.js", "./assessment/extensions/*": "./dist/assessment/extensions/*", "./authoring": "./dist/authoring/index.js", "./authoring/core": "./dist/authoring/core.js", "./authoring/extensions/*": "./dist/authoring/extensions/*" }, y = ["**/*.css"], j = { dev: "vite build --watch -l info", build: "vite build", lint: "npx eslint --format table", docs: "jsdoc -c jsdoc.json -R README.md --verbose", test: "node --experimental-vm-modules node_modules/.bin/jest --verbose --detectOpenHandles --logHeapUsage --runInBand", "start:server": "nodemon ./tests/api-server/src/server.js", "start:server:background": "nodemon ./tests/api-server/src/server.js &" }, w = { "@caspingus/ssml-editor": "^0.1.1", "@uppy/compressor": "^2.2.1", "@uppy/core": "^4.4.3", "@uppy/dashboard": "^4.3.2", "@uppy/drag-drop": "^4.1.1", "@uppy/image-editor": "^3.3.1", "active-table": "^1.1.6", entities: "^6.0.0", howler: "^2.2.4", "lodash-es": "^4.17.21", mousetrap: "^1.6.5", papaparse: "^5.5.2", "pdfjs-dist": "^5.2.133", "platform-detect": "^3.0.1", postcss: "^8.5.4", "postcss-import": "^16.1.0", seedrandom: "^3.0.5", xlsx: "https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz" }, x = { "@babel/core": "^7.26.10", "@babel/preset-env": "^7.26.9", "@eslint/js": "^9.24.0", "@stylistic/eslint-plugin-js": "^4.2.0", "@types/jest": "^30.0.0", "babel-jest": "^30.0.0", "babel-loader": "^10.0.0", "css-loader": "^7.1.2", docdash: "^2.0.2", ejs: "^3.1.10", eslint: "^9.24.0", "eslint-formatter-table": "^7.32.1", express: "^5.1.0", globals: "^16.0.0", jest: "^30.0.0", "learnosity-sdk-nodejs": "github:Learnosity/learnosity-sdk-nodejs", nodemon: "^3.1.9", npm: "^11.2.0", puppeteer: "^24.8.0", "style-loader": "^4.0.0", "svg-inline-loader": "^0.8.2", vite: "^7.0.0" }, _ = {
  name: l,
  version: d,
  private: !1,
  type: c,
  description: p,
  keywords: u,
  license: g,
  author: h,
  homepage: f,
  repository: m,
  bugs: b,
  exports: v,
  sideEffects: y,
  scripts: j,
  dependencies: w,
  devDependencies: x
}, o = {
  events: {
    broadcast: !1,
    listenFor: "all"
  }
};
function L() {
  const e = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {},
    LT: {
      version: _.version
    },
    versions: e
  };
}
function A(e) {
  /^[a-zA-Z:*]*$/.test(e) ? o.events.listenFor = e : s.warn("Invalid event type");
}
function r(e) {
  if (o.events.broadcast) {
    const t = o.events.listenFor, i = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? s.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(i) && s.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(i) && s.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(i) && s.info(e) : e.startsWith(i) && s.info(e);
  }
}
function O(e = !0) {
  o.events.broadcast = !!e, e ? s.info(`👂 listening for '${o.events.listenFor}'`) : s.info("🚫👂 not listening");
}
const T = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: L,
  filterEvent: A,
  handleEvent: r,
  listen: O
}, Symbol.toStringTag, { value: "Module" })), a = {};
function W(e) {
  a.app = e, E();
}
function n() {
  return a.app;
}
function S() {
  return n().editorApp() !== void 0 ? n().editorApp() : null;
}
function E() {
  a.app.on("all", r), ["widgetedit:editor:ready", "widgetedit:widget:ready", "widgetedit:preview:changed", "widgetedit:widget:changed"].forEach((t) => a.app.on(t, () => r(t)));
}
const k = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appInstance: n,
  init: W,
  questionEditorApp: S
}, Symbol.toStringTag, { value: "Module" }));
function z() {
  n().on("navigate", (e) => {
    window.location.hash = "#" + e.data.locationEncoded;
  }), n().navigate(window.location.hash.replace(/^#/, "")), window.onhashchange = () => {
    n().navigate(window.location.hash.replace(/^#/, ""));
  };
}
const M = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routingHash: z
}, Symbol.toStringTag, { value: "Module" }));
function P() {
  return n().getWidget()?.type;
}
const F = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  type: P
}, Symbol.toStringTag, { value: "Module" })), I = {
  utils: {
    logger: s
  }
}, B = { ...k, ...T, ...M, ...F, ...I };
export {
  B as L,
  n as a,
  L as d,
  P as t
};
