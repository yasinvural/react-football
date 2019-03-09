import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const spinnerStyle = {
  top: "50%",
  left: "50%",
  position: "absolute",
  transform: "translate(-50%,-50%)"
};

const Spinner = () => {
  return (
    <div style={spinnerStyle}>
      <CircularProgress />
    </div>
  );
};
export default Spinner;
