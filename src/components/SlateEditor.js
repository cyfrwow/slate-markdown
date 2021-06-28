import React, { useMemo, useCallback, useState } from "react";
import { createEditor } from "slate";
// import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";

const SlateEditor = () => {
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);
  const editor = useMemo(() => withReact(createEditor()), []);

  //   useEffect(() => {
  //     onValueUpdate(value);
  //   }, [value]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "heading_one":
        return <h1 {...props.attributes}>{props.children}</h1>;
      case "heading_two":
        return <h2 {...props.attributes}>{props.children}</h2>;
      case "heading_three":
        return <h3 {...props.attributes}>{props.children}</h3>;
      case "heading_four":
        return <h4 {...props.attributes}>{props.children}</h4>;
      case "heading_five":
        return <h5 {...props.attributes}>{props.children}</h5>;
      case "heading_six":
        return <h6 {...props.attributes}>{props.children}</h6>;
      case "paragraph":
        return <p {...props.attributes}>{props.children}</p>;
      case "thematic_break":
        return <hr />;
      case "block_quote":
        return (
          <blockquote
            style={{
              borderLeft: "2px solid #ccc",
              marginLeft: "-0",
              padding: "0 5px",
            }}
            {...props.attributes}
          >
            {props.children}
          </blockquote>
        );
      case "link":
        return (
          <a {...props.attributes} href={props.element.link}>
            {props.children}
          </a>
        );
      case "ul_list":
        return <ul {...props.attributes}>{props.children}</ul>;
      case "ol_list":
        return <ol {...props.attributes}>{props.children}</ol>;
      case "list_item":
        return <li {...props.attributes}>{props.children}</li>;
      default:
        return <p {...props.attributes}>{props.children}</p>;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  //   const handleValue = (value) => {
  //     console.log("handleValue", { value });
  //     setValue(value);
  //   };

  return (
    <div className="column">
      <h4>Slate Editor</h4>
      <Slate editor={editor} value={value} onChange={setValue}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          autoFous
          placeholder="Write some shit..."
        />
      </Slate>
    </div>
  );
};

const Leaf = (props) => {
  return (
    <>
      {props.leaf.bold && (
        <span {...props.attributes} style={{ fontWeight: "bold" }}>
          {props.children}
        </span>
      )}
      {props.leaf.italic && (
        <span {...props.attributes} style={{ fontStyle: "italic" }}>
          {props.children}
        </span>
      )}
      {props.leaf.code && <code {...props.attributes}>{props.children}</code>}
      {props.leaf.strikeThrough && (
        <del {...props.attributes}>{props.children}</del>
      )}
      {!props.leaf.code &&
        !props.leaf.italic &&
        !props.leaf.bold &&
        !props.leaf.strikeThrough && (
          <span {...props.attributes} style={{ fontWeight: "italic" }}>
            {props.children}
          </span>
        )}
    </>
  );
};

export default SlateEditor;
