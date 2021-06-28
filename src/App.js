// import MonacoEditor from "./components/MonacoEditor";
// import MarkdownViewer from "./components/MarkdownViewer";
// import SlateEditor from "./components/SlateEditor";
// import "./App.css";
import MarkdownEditor from "./components/Editor/MarkdownEditor";

const App = () => {
  //   const handleSlateValueChange = (value) => {
  //     console.log("handleSlateValueChange", { value });
  //   };

  return (
    <div className="container">
      {/* <MarkdownViewer value={slateObject} /> */}
      {/* <MonacoEditor value={slateObject} /> */}
      {/* <SlateEditor onValueUpdate={handleSlateValueChange} /> */}
      <MarkdownEditor />
    </div>
  );
};

export default App;
