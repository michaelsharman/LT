// Ignore last <br> inside list of certain tags
// More detail: see https://stackoverflow.com/a/62523690
const ignoreLastBrInsideTags = [
    "address",
    "article",
    "aside",
    "audio",
    "blockquote",
    "center",
    "datalist",
    "dd",
    "details",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "header",
    "legend",
    "li",
    "main",
    "nav",
    "ol",
    "optgroup",
    "option",
    "p",
    "pre",
    "section",
    "summary",
    "ul",
    /// these below tags below completely ignore last <br> inside, and dont go to next line inwhile above list are
    "button",
    "canvas",
    "img",
    "iframe",
    "input",
    "ruby",
    "meter",
    "progress",
    "select",
    "svg",
    "textarea",
    "video",
];

/**
 * Strip out last <br> inside list of certain tags. More detail: see https://stackoverflow.com/a/62523690
 * @param {string} s
 * @returns ${string}
 * @example stripoutLastBrInIgnoreTags('<p>hello<br></p>') // '<p>hello</p>'
 */
function stripoutLastBrInIgnoreTags(s) {
    const ignoreLastBrInsideTagsString = ignoreLastBrInsideTags.join("|");
    return s.replace(
        new RegExp(
            `(<(${ignoreLastBrInsideTagsString})>(.+?))(<br\/?>)(<\/(${ignoreLastBrInsideTagsString})>)`,
            "gi"
        ),
        (_match, p1, _p2, _p3, _p4, p5, _p6) => `${p1}${p5}`
    );
}

/**
 * Strip out empty tags. More detail: see https://stackoverflow.com/a/62523690
 * @param {string} s
 * @returns {string}
 * @example stripoutEmptyTags('<p></p>') // ''
 */
function stripoutEmptyTags(s) {
    const ignoreLastBrInsideTagsString = ignoreLastBrInsideTags.join("|");
    return s.replace(
        new RegExp(
            `(<(${ignoreLastBrInsideTagsString})>)(<\/(${ignoreLastBrInsideTagsString})>)`,
            "gi"
        ),
        () => ""
    );
}

/**
 * Convert HTML to plain text
 * @param {string} str
 * @returns {string}
 */
export function htmlToPlainText(htmlContent) {
    // Replace certain tags with their respective entities, catch <br> in <p>..<br></p> then replace <br> with ''. but accept <p><br></p>
    // More detail: see https://stackoverflow.com/a/62523690

    let value = stripoutLastBrInIgnoreTags(htmlContent);
    value = stripoutEmptyTags(value);

    const emptyMaps = {
        "<br>": "\n",
        "<br/>": "\n",
        "<p>": "",
        "</p>": "\n\n",
        "<div>": "\n",
        "</div>": "\n",
        "<li>": "",
        "</li>": "\n",
        "<ul>": "",
        "</ul>": "\n",
        "<ol>": "",
        "</ol>": "\n",
    };

    const innerHTML = value.replace(/<[^>]*>?/gm, (tag) => emptyMaps[tag] || tag);
    const div = document.createElement("div");
    div.innerHTML = innerHTML;

    return div.innerText || div.textContent || "";
}