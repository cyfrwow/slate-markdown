import { useState, useCallback } from "react";
import MonacoEditor from "./components/MonacoEditor";
// import MarkdownViewer from "./components/MarkdownViewer";
// import SlateEditor from "./components/SlateEditor";
import "./App.css";
import MarkdownEditor from "./components/Editor/MarkdownEditor";

const App = () => {
  const [slateObject, setSlateObject] = useState([]);
  const handleSlateValueChange = useCallback((value) => {
    setSlateObject(value);
  }, []);

  return (
    <div className="container">
      {/* <MarkdownViewer value={slateObject} /> */}
      {/* <SlateEditor onValueUpdate={handleSlateValueChange} /> */}
      <MarkdownEditor
        onValueChange={(value) => handleSlateValueChange(value)}
      />
      <MonacoEditor slateObject={slateObject} />
    </div>
  );
};

export default App;
