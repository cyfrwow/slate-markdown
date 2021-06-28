import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {}
}));

function H5Element(props) {
  const classes = useStyles();
  return (
    <h5 className={classes.root} {...props.attributes}>
      {props.children}
    </h5>
  );
}

export default H5Element;
