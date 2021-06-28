import { Transforms } from "slate";
import deserialize from "../conversion/html/deserialize";

const withHtml = editor => {
  const { insertData, isInline, isVoid } = editor;

  editor.isInline = element => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.isVoid = element => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = data => {
    const html = data.getData("text/plain");
    console.log("html", html);
    if (html) {
      const fragment = deserialize(html);
      console.log("fragment", fragment);
      Transforms.insertFragment(editor, fragment);
      return;
    }
    insertData(data);
  };

  return editor;
};

export default withHtml;
