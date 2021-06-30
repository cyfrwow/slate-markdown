import { Text } from "slate";
import escapeHtml from "escape-html";
import TYPES from "../../types";

const serializeEach = (node) => {
  if (Text.isText(node)) {
    const {
      pre,
      bold,
      italic,
      underline,
      code,
      strikethrough,
      deleted,
      inserted,
    } = node;
    const escape = escapeHtml(node.text);
    if (bold) return `**${escape}**`;
    if (italic) return `*${escape}*`;
    if (code) return `\`${escape}\``;
    if (strikethrough) return `~~${escape}~~`;
    if (deleted) return `~~${escape}~~`;
    if (inserted) return `__${escape}__`;
    if (underline) return `__${escape}__`;
    if (pre) return "```\n" + escape + "\n```";
    return escape;
  }

  const children = node.children.map((n) => serializeEach(n)).join("");
  switch (node.type) {
    default:
      return children;
    case TYPES.P:
      return `\n${children}\n`;
    case TYPES.BLOCKQUOTE:
      return `> ${children}`;
    case TYPES.UL:
      return children;
    case TYPES.OL:
      return children;
    case TYPES.OLI:
      return `1. ${children}\n`;
    case TYPES.LI:
      return `- ${children}\n`;
    case TYPES.H1:
      return `# ${children}\n`;
    case TYPES.H2:
      return `## ${children}\n`;
    case TYPES.H3:
      return `### ${children}\n`;
    case TYPES.H4:
      return `#### ${children}\n`;
    case TYPES.H5:
      return `##### ${children}\n`;
    case TYPES.H6:
      return `###### ${children}\n`;
    case TYPES.HR:
      return `---\n`;
    case TYPES.PRE:
      return "\n```\n" + children + "\n```";
    case TYPES.CODE:
      return "\n`" + children + "`";
    case TYPES.IMG:
      let title = node?.type;
      let src = node?.url;
      let alt = "alt default";
      return `![${title}](${src} "${alt}")`;
  }
};

const serialize = (data = []) => {
  return data
    .map((node) => {
      let a = serializeEach(node);
      return a;
    })
    .join("");
};

export default serialize;
