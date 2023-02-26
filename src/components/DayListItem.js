import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  let itemClass = classNames(
    "day-list__item",
    { "day-list__item--selected": props.selected },
    { "day-list__item--full": props.spots === 0 }
  );
  return (
    <li className={itemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      {/*Conditional to render appropate text depending of remaining spots, if spots === 0, it renders "no spots available" */}
      {!props.spots && <h3 className="text--light">no spots remaining</h3>}
      {props.spots === 1 && (
        <h3 className="text--light">{props.spots} spot remaining</h3>
      )}
      {props.spots > 1 && (
        <h3 className="text--light">{props.spots} spots remaining</h3>
      )}
    </li>
  );
}
