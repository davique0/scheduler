import React from "react";

import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
  let buttonClass = classNames(
    "button",
    { "button--danger": props.danger },
    { "button--confirm": props.confirm }
  );

  //   //conditional to add class when the button is "confirm"
  //   if (props.confirm) {
  //     buttonClass += " button--confirm";
  //   }
  //   //conditional to add class when the button is "danger or Cancel"
  //   if (props.danger) {
  //     buttonClass += " button--danger";
  //   }

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
