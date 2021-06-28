import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {}
}));

function H2Element(props) {
  const classes = useStyles();
  return (
    <h2 className={classes.root} {...props.attributes}>
      {props.children}
    </h2>
  );
}

export default H2Element;
