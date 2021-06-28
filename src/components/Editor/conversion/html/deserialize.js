import { jsx } from "slate-hyperscript";
import isHtml from "is-html";
import TYPES from "../../types";

const ELEMENT_TAGS = {
  A: el => ({ type: "link", url: el.getAttribute("href") }),
  BLOCKQUOTE: () => ({ type: TYPES.BLOCKQUOTE }),
  H1: () => ({ type: TYPES.H1 }),
  H2: () => ({ type: TYPES.H2 }),
  H3: () => ({ type: TYPES.H3 }),
  H4: () => ({ type: TYPES.H4 }),
  H5: () => ({ type: TYPES.H5 }),
  H6: () => ({ type: TYPES.H6 }),
  IMG: el => ({
    type: TYPES.IMG,
    url: el.getAttribute("src"),
    alt: el.getAttribute("alt")
  }),
  LI: () => ({ type: TYPES.LI }),
  OL: () => ({ type: TYPES.OL }),
  UL: () => ({ type: TYPES.UL }),
  P: () => ({ type: TYPES.P }),
  PRE: () => ({ type: TYPES.PRE })
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true })
};

const deserializeEach = el => {
  console.log("el", el, el.nodeType);
  if (el.nodeType === 3) {
    return el.textContent || "";
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = el.childNodes[0];
  }
  console.log("parent", parent);
  let children = [];
  if (parent.childNodes.length) {
    children = Array.from(parent.childNodes)
      .map(deserializeEach)
      .flat();
  }

  console.log("children", children);
  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx("element", attrs, children);
    // const isEmptyChildren = children?.length === 0;
    // let childrenUpdated = isEmptyChildren ? [""] : children;
    // return jsx("element", attrs, childrenUpdated);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map(child => jsx("text", attrs, child));
  }

  return children;
};

const deserialize = rawHtml => {
  let html = rawHtml;
  if (!isHtml(rawHtml)) {
    html = `<p>${rawHtml}</p>`;
  }
  const document = new DOMParser().parseFromString(html, "text/html");

  console.log("document", document.body);
  return deserializeEach(document.body);
};

export default deserialize;
