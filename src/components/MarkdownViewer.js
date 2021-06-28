import React, { useEffect } from "react";
import { serialize } from "remark-slate";

function MarkdownViewer({ slateObject }) {
  useEffect(() => {
    console.log(slateObject && slateObject.map((v) => serialize(v)).join(""));
  }, [slateObject]);

  return (
    <div className="column">
      <h4>Markdown</h4>
      <textarea value=""></textarea>
    </div>
  );
}

export default MarkdownViewer;
