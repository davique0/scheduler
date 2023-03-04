export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((days) => days.name === day);
  console.log(filteredDay);
  //Ask if filteredDay is truty and if not returns []
  const appointmentsArr =
    filteredDay[0]?.appointments.map((x) => state.appointments[x]) || [];

  return appointmentsArr;
}
