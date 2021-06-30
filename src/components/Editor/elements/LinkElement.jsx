import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "blue",
    cursor: "pointer",
  },
}));

function LinkElement(props) {
  const classes = useStyles();
  return (
    <a className={classes.root} {...props.attributes} href={props.children}>
      {props.children}
    </a>
  );
}

export default LinkElement;
