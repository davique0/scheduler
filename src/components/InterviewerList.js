import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((ele) => {
          return (
            <InterviewerListItem
              key={ele.id}
              name={ele.name}
              avatar={ele.avatar}
              setInterviewer={() => props.setInterviewer(ele.id)}
              selected={props.interviewer === ele.id}
            />
          );
        })}
      </ul>
    </section>
  );
}
