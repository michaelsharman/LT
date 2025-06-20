const i = `

    /* Learnosity theme nextGen styles */
    :root {
    --font-stack--base: 'LearnosityMath', 'Helvetica', 'Calibri', 'Arial', sans-serif;
    --font-size--base: 16px;
}
    body {
    font-family: var(--font-family);
}
    p {
    font-size: var(--font-size-base); /* 16px */
    line-height: 1.429em; /* ~22.9px */
    font-weight: 400;
}
    .lead {
    font-size: 1.3em; /* ~20.8px */
    line-height: 1.837em; /* ~29.4px */
    font-weight: 400;
}
    /* 4. Headings */
    h1 {
    font-size: 2.188em; /* ~35px */
    line-height: 2.406em; /* ~38.5px */
    font-weight: 700;
}
    h2 {
    font-size: 1.3em; /* ~21px */
    line-height: 1.444em; /* ~23px */
    font-weight: 700;
}
    h3 {
    font-size: 1em; /* 16px */
    line-height: 1.1em; /* ~17.6px */
    font-weight: 700;
}
    h4 {
    font-size: 0.875em; /* 14px */
    line-height: 0.963em; /* ~15.4px */
    font-weight: 700;
}
    h5 {
    font-size: 0.813em; /* ~13px */
    line-height: 0.894em; /* ~14.3px */
    font-weight: 400;
}
    h6 {
    font-size: 0.625em; /* 10px */
    line-height: 0.688em; /* ~11px */
    font-weight: 700;
}
    .lt__theme-nextGen {
    .lrn {
        font-family: var(--font-stack--base);
        font-size: var(--font-size--base);

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-family: var(--font-stack--base);
        }

        .lrn-annotations-c-modal--notepad {
            font-family: var(--font-stack--base);
        }

        input,
        select,
        textarea .lds_btn,
        .lds-btn {
            font-family: var(--font-stack--base);
        }
    }
}
    /* Needed for the rating question type which is rendered outside the main API DOM */
    .lrn {
    .lrn_ratingInfo .lrn_ratingInfo_inner .lrn_ratingInfo_row span,
    .lrn_ratingInfo .lrn_ratingInfo_inner .lrn_ratingInfo_row .lrn_ratingInfo_description {
        font-family: var(--font-stack--base);
    }

    .lrn_rating_tooltip {
        font-family: var(--font-stack--base);
    }
}

`, n = {
  elements: {},
  theme: "nextGen"
};
function r() {
  s(i), o(), a();
}
function a() {
  const t = n.elements.apiWrapper, e = document.createElement("main");
  e.className = `lt__theme lt__theme-${n.theme}`, t.parentNode.insertBefore(e, t), e.appendChild(t);
}
function o() {
  n.elements.apiWrapper = document.querySelector(".lrn-assess");
}
function s(t) {
  const e = document.createElement("style");
  e.setAttribute("data-lt-style", "true"), e.textContent = t, document.head.appendChild(e);
}
export {
  r as run
};
