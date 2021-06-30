import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CustomEditor } from "../helpers";
import { useSlate } from "slate-react";

const useStyles = makeStyles((theme) => ({
  static: {
    padding: `12px 20px`,
  },
  active: {
    fontWeight: "bold",
    border: `1px solid #ccc`,
    boxSizing: `border-box`,
  },
  item: {
    cursor: "pointer",
  },
}));

const markOptions = [
  { value: `bold`, icon: "B" },
  { value: `italic`, icon: "I" },
  { value: `underline`, icon: "U" },
  { value: `strikethrough`, icon: "S" },
  { value: `code`, icon: "<>" },
  { value: `pre`, icon: "<block>" },
];

function Static() {
  const classes = useStyles();
  const editor = useSlate();

  const handleMarkMouseDown = ({ e, mark }) => {
    stopPropagation(e);
    CustomEditor.toggleMark(editor, mark.value);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Grid className={classes.static} container spacing={3} wrap="nowrap">
      {markOptions.map((mark) => (
        <Grid
          key={mark.value}
          item
          onMouseDown={(e) => handleMarkMouseDown({ e, mark })}
          className={`${
            CustomEditor.isMarkActive(editor, mark.value) ? classes.active : ``
          } ${classes.item}`}
        >
          {mark?.icon}
        </Grid>
      ))}
      {/* <Grid item>
        <InsertImageButton />
      </Grid> */}
    </Grid>
  );
}

// const InsertImageButton = () => {
//   const editor = useSlate();
//   return (
//     <Grid
//       onMouseDown={(event) => {
//         event.preventDefault();
//         const url = window.prompt("Enter the URL of the image:");
//         if (!url) return;
//         CustomEditor.insertImage(editor, url);
//       }}
//     >
//       img
//     </Grid>
//   );
// };

export default React.memo(Static);
