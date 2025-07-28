const e = {
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
  e.renderedCss || u(), p(t), setInterval(i, e.options.interval);
}
async function i() {
  const t = await r(), n = document.querySelector(".lt__networkStatus-indicator");
  if (l(t), e.options.render)
    if (t)
      n && n.remove();
    else {
      const o = document.querySelector(`.${e.options.iconWrapper}`), s = `<div class="lt__networkStatus-indicator pos-left" role="status" aria-live="polite" aria-atomic="true" aria-relevant="all">
                <span title="${e.options.message}" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#333333">
                        <path d="M790-56 414-434q-47 11-87.5 33T254-346l-84-86q32-32 69-56t79-42l-90-90q-41 21-76.5 46.5T84-516L0-602q32-32 66.5-57.5T140-708l-84-84 56-56 736 736-58 56Zm-310-64q-42 0-71-29.5T380-220q0-42 29-71t71-29q42 0 71 29t29 71q0 41-29 70.5T480-120Zm236-238-29-29-29-29-144-144q81 8 151.5 41T790-432l-74 74Zm160-158q-77-77-178.5-120.5T480-680q-21 0-40.5 1.5T400-674L298-776q44-12 89.5-18t92.5-6q142 0 265 53t215 145l-84 86Z"/>
                    </svg>
                </span>
                <span class="sr-only">${e.options.message}</span>
            </div>`;
      o && !n && o.insertAdjacentHTML("afterbegin", s);
    }
}
async function r() {
  try {
    return await fetch(e.options.uri, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store"
    }), !0;
  } catch {
    return !1;
  }
}
function c() {
  return navigator?.connection ? `${navigator.connection.downlink} Mbps` : "Network Information API not supported";
}
function l(t) {
  const n = t ? "LTNetworkOnline" : "LTNetworkOffline", o = new CustomEvent(n);
  document.dispatchEvent(o);
}
function p(t) {
  t && typeof t == "object" && (e.options = { ...e.options, ...t });
}
function u() {
  const t = document.createElement("style"), n = `
/* Learnosity render network status */
.lt__networkStatus-indicator {
    width: 24px;
    text-align: center;
    position: relative;
    top: 9px;
}
`;
  t.setAttribute("data-style", "LT Network Status"), t.textContent = n, document.head.append(t), e.renderedCss = !0;
}
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  checkConnection: r,
  checkSpeed: c,
  run: a
}, Symbol.toStringTag, { value: "Module" }));
export {
  r as a,
  c,
  d as n,
  a as r
};
