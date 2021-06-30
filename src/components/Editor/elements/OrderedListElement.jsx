import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 20,
    listStyleType: "auto",
  },
}));

function OrderedListElement(props) {
  const classes = useStyles();
  return (
    <li className={classes.root} {...props.attributes}>
      {props.children}
    </li>
  );
}

export default OrderedListElement;
