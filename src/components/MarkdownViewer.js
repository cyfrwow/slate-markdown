import { useState, useEffect } from "react";
// import { serialize } from "remark-slate";
import slateToMd from "../components/Editor/conversion/markdown/slateToMd";

function MarkdownViewer({ slateObject }) {
  const [value, setValue] = useState("");
  useEffect(() => {
    // const markDownText = slateObject.map((v) => serialize(v)).join("");
    const markDownText = slateToMd(slateObject);
    setValue(markDownText);
  }, [slateObject]);

  return (
    <div className="column">
      <h4>Markdown</h4>
      <textarea defaultValue={value}></textarea>
    </div>
  );
}

export default MarkdownViewer;
