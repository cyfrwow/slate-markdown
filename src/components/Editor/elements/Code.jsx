import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eee",
    padding: "2px 5px",
    fontSize: "14px",
    borderRadius: "5px",
    color: "crimson",
  },
}));

function CodeElement(props) {
  const classes = useStyles();
  return (
    <code className={classes.root} {...props.attributes}>
      {props.children}
    </code>
  );
}

export default CodeElement;
