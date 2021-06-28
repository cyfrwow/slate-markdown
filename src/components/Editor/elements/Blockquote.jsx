import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    borderLeft: `3px solid #ccc`,
    paddingLeft: 20,
    margin: 0
  }
}));

function BlockquoteElement(props) {
  const classes = useStyles();
  return (
    <blockquote className={classes.root} {...props.attributes}>
      {props.children}
    </blockquote>
  );
}

export default BlockquoteElement;
