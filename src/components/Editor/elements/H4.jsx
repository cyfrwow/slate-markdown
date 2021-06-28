import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {}
}));

function H4Element(props) {
  const classes = useStyles();
  return (
    <h4 className={classes.root} {...props.attributes}>
      {props.children}
    </h4>
  );
}

export default H4Element;
