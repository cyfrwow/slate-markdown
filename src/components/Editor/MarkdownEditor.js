import React from "react";
import Prism from "prismjs";
import isHotkey from "is-hotkey";
import { createEditor, Text } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";

import DefaultElement from "./elements/Default";
import ImageElement from "./elements/Image";
import BlockQuoteElement from "./elements/Blockquote";
import ListElement from "./elements/ListItem";
import H1Element from "./elements/H1";
import H2Element from "./elements/H2";
import H3Element from "./elements/H3";
import H4Element from "./elements/H4";
import H5Element from "./elements/H5";
import H6Element from "./elements/H6";
import HRElement from "./elements/HR";
import withImages from "./plugins/image";
import withHtml from "./plugins/pasteHtml";
import withShortcut from "./plugins/shortcut";
import { slateObj } from "./conversion/sample";
import StaticToolbar from "./toolbar/Static";
import { CustomEditor } from "./helpers";
import TYPES from "./types";
// import slateToMd from "./conversion/markdown/slateToMd";

// console.log("********************");
// const markDownFormat = slateToMd(slateObj);
// console.log("slate to markDown", markDownFormat);
// console.log("********************");
// eslint-disable-next-line
Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold); // prettier-ignore

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+e": "code",
};

const App = () => {
  const editor = React.useMemo(
    () =>
      withHtml(
        withShortcut(withImages(withHistory(withReact(createEditor()))))
      ),
    []
  );
  const [value, setValue] = React.useState(slateObj);

  //   React.useEffect(() => {
  //     let fetchData = async () => {
  //       const data = await deserialize(markDownFormat);
  //       setValue(data);
  //     };
  //     fetchData();
  //   }, []);

  const renderLeaf = React.useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const decorate = React.useCallback(([node, path]) => {
    const ranges = [];

    if (!Text.isText(node)) {
      return ranges;
    }

    const getLength = (token) => {
      if (typeof token === "string") {
        return token.length;
      } else if (typeof token.content === "string") {
        return token.content.length;
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0);
      }
    };

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
    let start = 0;

    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== "string") {
        // const range = { anchor: { path, offset: start }, focus: start };
        // Transforms.select(editor, range);
        // CustomEditor.toggleMark(editor, token.type);
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        });
      }

      start = end;
    }
    // console.log("range", ranges);
    return ranges;
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <StaticToolbar />
      <Editable
        decorate={decorate}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              CustomEditor.toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

const renderElement = (props) => {
  switch (props.element.type) {
    case TYPES.IMG:
      return <ImageElement {...props} />;
    case TYPES.BLOCKQUOTE:
      return <BlockQuoteElement {...props} />;
    case TYPES.LI:
      return <ListElement {...props} />;
    case TYPES.H1:
      return <H1Element {...props} />;
    case TYPES.H2:
      return <H2Element {...props} />;
    case TYPES.H3:
      return <H3Element {...props} />;
    case TYPES.H4:
      return <H4Element {...props} />;
    case TYPES.H5:
      return <H5Element {...props} />;
    case TYPES.H6:
      return <H6Element {...props} />;
    case TYPES.HR:
      return <HRElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  return <span {...attributes}>{children}</span>;
};

export default React.memo(App);
