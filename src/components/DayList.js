import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  return (
    <ul>
      {props.days.map((ele) => {
        return (
          <DayListItem
            key={ele.id}
            name={ele.name}
            spots={ele.spots}
            selected={ele.name === props.value}
            setDay={() => props.onChange(ele.name)}
          />
        );
      })}
    </ul>
  );
}
