import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {}
}));

function H1Element(props) {
  const classes = useStyles();
  return (
    <h1 className={classes.root} {...props.attributes}>
      {props.children}
    </h1>
  );
}

export default H1Element;
