import React, { Component } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //function that saves a new interview object and send it to bookInterview
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  };

  const onDelete = () => {
    transition(CONFIRM)
  };

  const confirmDelete = (id) => {
    transition(DELETING);
    props.cancelInterview(id).then(() => {
      transition(EMPTY);
    });
  }
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => onDelete()}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={(student, interviewer) => save(student, interviewer)}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && <Confirm onConfirm={() => confirmDelete(props.id)} onCancel={() => back()} message="Are you sure you would like to delete?" />}
      {mode === DELETING && <Status message="Deleting" />}
    </article>
  );
}
