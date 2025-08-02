const n = {
  logPrefix: "LT Network Status: ",
  options: {
    iconWrapper: "top-right-wrapper",
    interval: 3e4,
    message: "Internet connection is currently down.",
    render: !0,
    uri: "https://questions.learnosity.com?latest-lts"
  },
  renderedCss: !1
};
function a(t) {
  n.renderedCss || f(), d(t), setInterval(c, n.options.interval);
}
async function c() {
  const t = await i(), e = document.querySelector(".lt__networkStatus-indicator"), { render: o, iconWrapper: r, message: s } = n.options;
  p(t), o && (t ? e && e.remove() : l(e, r, s));
}
function l(t, e, o) {
  if (t)
    return;
  const r = document.querySelector(`.${e}`);
  if (!r)
    return;
  const s = `
        <div class="lt__networkStatus-indicator pos-left" role="status" aria-live="polite" aria-atomic="true" aria-relevant="all">
            <span title="${o}" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#333333">
                    <path d="M790-56 414-434q-47 11-87.5 33T254-346l-84-86q32-32 69-56t79-42l-90-90q-41 21-76.5 46.5T84-516L0-602q32-32 66.5-57.5T140-708l-84-84 56-56 736 736-58 56Zm-310-64q-42 0-71-29.5T380-220q0-42 29-71t71-29q42 0 71 29t29 71q0 41-29 70.5T480-120Zm236-238-29-29-29-29-144-144q81 8 151.5 41T790-432l-74 74Zm160-158q-77-77-178.5-120.5T480-680q-21 0-40.5 1.5T400-674L298-776q44-12 89.5-18t92.5-6q142 0 265 53t215 145l-84 86Z"/>
                </svg>
            </span>
            <span class="sr-only">${o}</span>
        </div>
    `;
  r.insertAdjacentHTML("afterbegin", s);
}
async function i() {
  try {
    return await fetch(n.options.uri, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store"
    }), !0;
  } catch {
    return !1;
  }
}
function u() {
  return navigator?.connection ? `${navigator.connection.downlink} Mbps` : "Network Information API not supported";
}
function p(t) {
  const e = t ? "LTNetworkOnline" : "LTNetworkOffline", o = new CustomEvent(e);
  document.dispatchEvent(o);
}
function d(t) {
  t && typeof t == "object" && (n.options = { ...n.options, ...t });
}
function f() {
  const t = document.createElement("style"), e = `
/* Learnosity render network status */
.lt__networkStatus-indicator {
    width: 24px;
    text-align: center;
    position: relative;
    top: 9px;
}
`;
  t.setAttribute("data-style", "LT Network Status"), t.textContent = e, document.head.append(t), n.renderedCss = !0;
}
const w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  checkConnection: i,
  checkSpeed: u,
  run: a
}, Symbol.toStringTag, { value: "Module" }));
export {
  i as a,
  u as c,
  w as n,
  a as r
};
