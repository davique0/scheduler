import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewer = { ...props.interviewer };
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      key={interviewer.id}
      className="interviewers__item"
      onClick={() => props.setInterviewer(props.interviewer.id)}
    >
      {props.selected ? (
        <span className={interviewerClass}>
          <img
            className="interviewers__item-image"
            src={interviewer.avatar}
            alt={interviewer.name}
          />
          {interviewer.name}
        </span>
      ) : (
        <img
          className="interviewers__item-image"
          src={interviewer.avatar}
          alt={interviewer.name}
        />
      )}
    </li>
  );
}
