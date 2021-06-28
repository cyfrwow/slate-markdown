import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {}
}));

function H3Element(props) {
  const classes = useStyles();
  return (
    <h3 className={classes.root} {...props.attributes}>
      {props.children}
    </h3>
  );
}

export default H3Element;
