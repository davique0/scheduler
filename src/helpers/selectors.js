export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((days) => days.name === day);
  //Ask if filteredDay is truty and if not returns []
  const appointmentsArr =
    filteredDay[0]?.appointments.map(
      (appointment) => state.appointments[appointment]
    ) || [];

  return appointmentsArr;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter((days) => days.name === day);
  //Ask if filteredDay is truty and if not returns []
  const interviewersArr =
    filteredDay[0]?.interviewers.map(
      (interviewer) => state.interviewers[interviewer]
    ) || [];
  return interviewersArr;
}
