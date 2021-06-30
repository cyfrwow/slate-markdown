import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: "5px",
    padding: "5px",
    backgroundColor: "#eee",
    border: "1px solid #ddd",
    fontFamily: "inherit",
  },
}));

function PreElement(props) {
  const classes = useStyles();
  return (
    <pre className={classes.root} {...props.attributes}>
      {props.children}
    </pre>
  );
}

export default PreElement;
