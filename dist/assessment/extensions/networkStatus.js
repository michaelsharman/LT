import { c as s } from "../../extensionsFactory-CJF5B414.js";
const o = {
  logPrefix: "LT Network Status: ",
  options: {
    iconWrapper: "top-right-wrapper",
    interval: 3e4,
    message: "Internet connection is currently down.",
    render: !0,
    uri: "https://questions.learnosity.com?latest-lts"
  }
};
function c(t = {}) {
  f(t), setInterval(l, o.options.interval);
}
async function l() {
  const t = await a(), e = document.querySelector(".lt__networkStatus-indicator"), { render: n, iconWrapper: r, message: i } = o.options;
  d(t), n && (t ? e && e.remove() : u(e, r, i));
}
function u(t, e, n) {
  if (t)
    return;
  const r = document.querySelector(`.${e}`);
  if (!r)
    return;
  const i = `
        <div class="lt__networkStatus-indicator pos-left" role="status" aria-live="polite" aria-atomic="true" aria-relevant="all">
            <span title="${n}" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#333333">
                    <path d="M790-56 414-434q-47 11-87.5 33T254-346l-84-86q32-32 69-56t79-42l-90-90q-41 21-76.5 46.5T84-516L0-602q32-32 66.5-57.5T140-708l-84-84 56-56 736 736-58 56Zm-310-64q-42 0-71-29.5T380-220q0-42 29-71t71-29q42 0 71 29t29 71q0 41-29 70.5T480-120Zm236-238-29-29-29-29-144-144q81 8 151.5 41T790-432l-74 74Zm160-158q-77-77-178.5-120.5T480-680q-21 0-40.5 1.5T400-674L298-776q44-12 89.5-18t92.5-6q142 0 265 53t215 145l-84 86Z"/>
                </svg>
            </span>
            <span class="sr-only">${n}</span>
        </div>
    `;
  r.insertAdjacentHTML("afterbegin", i);
}
async function a() {
  try {
    return await fetch(o.options.uri, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store"
    }), !0;
  } catch {
    return !1;
  }
}
function p() {
  return navigator?.connection ? `${navigator.connection.downlink} Mbps` : "Network Information API not supported";
}
function d(t) {
  const e = t ? "LTNetworkOnline" : "LTNetworkOffline", n = new CustomEvent(e);
  document.dispatchEvent(n);
}
function f(t) {
  t && typeof t == "object" && (o.options = { ...o.options, ...t });
}
function w() {
  return `
        /* Learnosity render network status */
        .lt__networkStatus-indicator {
            width: 24px;
            text-align: center;
            position: relative;
            top: 9px;
        }
    `;
}
const m = s("networkStatus", c, {
  checkConnection: a,
  checkSpeed: p,
  getStyles: w
});
export {
  m as networkStatus
};
