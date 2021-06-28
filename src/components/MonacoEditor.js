import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import unified from "unified";
import markdown from "remark-parse";
import slate from "remark-slate";

export default function MonacoEditor({ slateObject }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    unified()
      .use(markdown)
      .use(slate)
      .process(slateObject, (err, value) => {
        if (err) throw err;
        setValue(value.result);
      });
  }, [slateObject]);

  const editorDidMount = (editor, monaco) => {
    setTimeout(function () {
      editor.getAction("editor.action.formatDocument").run();
    }, 200);
  };

  return (
    <div className="column">
      <h4>Slate object</h4>
      <Editor
        className="editor"
        options={{ wordWrap: true }}
        defaultLanguage="json"
        onMount={editorDidMount}
        value={JSON.stringify(value)}
      />
    </div>
  );
}
