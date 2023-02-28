import React from "react";

export default function Empty(props) {
  return (
    <main className="appoinment_add">
      <img
        className="appointment_add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}
