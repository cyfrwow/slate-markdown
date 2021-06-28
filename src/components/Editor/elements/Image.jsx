import React from "react";
import { useSelected, useFocused } from "slate-react";

function ImageElement({ attributes, children, element }) {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span {...attributes}>
      <span contentEditable={false}>
        <img
          alt="hah"
          src={element.url}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "20em",
            boxShadow: `${selected && focused ? "0 0 0 3px #B4D5FF" : "none"}`
          }}
        />
      </span>
      {children}
    </span>
  );
}

export default React.memo(ImageElement);
