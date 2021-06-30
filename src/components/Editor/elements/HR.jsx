import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: "1px solid #eee",
  },
}));

function HRELEMENT(props) {
  const classes = useStyles();
  return <hr className={classes.root} />;
}

export default HRELEMENT;
