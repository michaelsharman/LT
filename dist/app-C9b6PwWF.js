const t = {};
function p(s) {
  t.app = s;
}
function n() {
  return t.app;
}
function a() {
  return n().annotationsApp() !== void 0 ? n().annotationsApp() : null;
}
function e() {
  return n().assessApp();
}
function o() {
  return n().eventsApp();
}
function i() {
  return n().questionsApp();
}
export {
  a,
  e as b,
  n as c,
  o as e,
  p as i,
  i as q
};
