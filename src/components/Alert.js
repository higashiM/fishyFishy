import React from "react";

const Alert = props => {
  return props.alert ? <p className="alert">{props.alert}</p> : null;
};

export default Alert;
