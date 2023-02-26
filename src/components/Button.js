import React from "react";

import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
  let buttonClass = classNames(
    "button",
    { "button--danger": props.danger }, //conditional to add class when the button is "danger or Cancel"
    { "button--confirm": props.confirm } //conditional to add class when the button is "confirm"
  );

  return (
    //passing class and actions as a props from inde.js in stories
    <button
      onClick={props.onClick}
      className={buttonClass}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
