function l(...o) {
  console.debug("%cDebug:", "display:inline-block;background-color:purple;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px", "", ...o);
}
function r(...o) {
  console.error("%cError:", "display:inline-block;background-color:#e0005a;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px", "", ...o);
}
function c(...o) {
  console.info("%cInfo:", "display:inline-block;background-color:#46C0FF;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px", "", ...o);
}
function e(...o) {
  console.log(...o);
}
function d(...o) {
  console.warn("%cWarning:", "display:inline-block;background-color:gold;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px", "", ...o);
}
const i = {
  debug: l,
  error: r,
  info: c,
  log: e,
  warn: d
};
export {
  i as default
};
