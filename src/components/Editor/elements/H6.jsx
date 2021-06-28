import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {}
}));

function H6Element(props) {
  const classes = useStyles();
  return (
    <h6 className={classes.root} {...props.attributes}>
      {props.children}
    </h6>
  );
}

export default H6Element;
