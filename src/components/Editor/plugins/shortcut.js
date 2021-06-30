import { Editor, Transforms, Range, Point } from "slate";

const SHORTCUTS = {
  "*": "list-item",
  "-": "list-item",
  "+": "list-item",
  "`": "code",
  "<>": "link",
  "```": "pre",
  "\\": "pre",
  "1.": "ordered-list-item",
  ">": "block-quote",
  "---": "horizontal-rule",
  "#": "heading-one",
  "##": "heading-two",
  "###": "heading-three",
  "####": "heading-four",
  "#####": "heading-five",
  "######": "heading-six",
};

const withShortcuts = (editor) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text)
      if (text === " " && selection && Range.isCollapsed(selection)) {
        const { anchor } = selection;

        const block = Editor.above(editor, {
          match: (n) => Editor.isBlock(editor, n),
        });

        const path = block ? block[1] : [];
        const start = Editor.start(editor, path);
        const range = { anchor, focus: start };
        const beforeText = Editor.string(editor, range);
        const type = SHORTCUTS[beforeText];

        console.log("type", type);

        if (type) {
          Transforms.select(editor, range);
          Transforms.delete(editor);
          Transforms.setNodes(
            editor,
            { type },
            { match: (n) => Editor.isBlock(editor, n) }
          );

          //   if (type === "link") {
          //     console.log("sdasdas");
          //     // const list = { type: "ul_list", children: [] };
          //     Transforms.insertNodes(editor, {
          //       type: "link",
          //       children: [],
          //     });
          //   }

          if (type === "list-item") {
            const list = { type: "ul_list", children: [] };
            Transforms.wrapNodes(editor, list, {
              match: (n) => n.type === "list-item",
            });
          }

          if (type === "ordered-list-item") {
            const list = { type: "ol_list", children: [] };
            Transforms.wrapNodes(editor, list, {
              match: (n) => n.type === "ordered-list-item",
            });
          }

          if (type === "horizontal-rule") {
            Transforms.insertNodes(editor, {
              type: "paragraph",
              children: [
                {
                  text: "",
                },
              ],
            });
          }

          return;
        }
      }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          block.type !== "paragraph" &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: "paragraph" });

          if (block.type === "list-item") {
            Transforms.unwrapNodes(editor, {
              match: (n) => n.type === "ul-list",
              split: true,
            });
          }

          if (block.type === "ordered-list-item") {
            Transforms.unwrapNodes(editor, {
              match: (n) => n.type === "ol-list",
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

export default withShortcuts;
