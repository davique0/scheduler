import React, { Component } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //function that saves a new interview object and send it to bookInterview
  const save = (name, interviewer) => {
    //throws an error if name or interviewer aren't entered by user
    // if (!name || !interviewer) return transition(ERROR_SAVE, true)
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  };
  //mode send to confirm dialog box
  const onDelete = () => {
    transition(CONFIRM)
  };
  //if confirm on dialog box it will delete
  const confirmDelete = (id) => {
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
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
          onEdit={() => transition(EDIT)}
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
      {mode === EDIT && <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={(student, interviewer) => save(student, interviewer)}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
      />}
      {mode === ERROR_SAVE && <Error message="Couldn't save the appointment" onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message="Couldn't delete the appointment" onClose={() => back()} />}

    </article>
  );
}
