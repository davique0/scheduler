import { useState, useEffect } from "react";
import axios from "axios";

// const SET_DAY = "SET_DAY";
// const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
// const SET_INTERVIEW = "SET_INTERVIEW";

// function reducer(state, action) {
//   switch (action.type) {
//     case SET_DAY:
//       return { ...state, day }
//     case SET_APPLICATION_DATA:
//       return { /* insert logic */ }
//     case SET_INTERVIEW: {
//       return /* insert logic */
//     }
//     default:
//       throw new Error(
//         `Tried to reduce with unsupported action type: ${action.type}`
//       );
//   }
// }


export default function useApplicationData() {
  // const [state, dispatch] = useReducer(reducer, 0)

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  // assigning different functions for diferent states
  const setDay = (day) => setState({ ...state, day });
  // const setDay = (day) => dispatch({ type: SET_DAY, day})
  //fetching data from scheduler-api
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  useEffect(() => {
    updateSpotsRemaining()
  }, [state.appointments])

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState((prev) => ({ ...prev, appointments }));
      })
  };

  const cancelInterview = (id) => {
    const appointment = { ...state.appointments[id], interview: null };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`)
      .then((response) => {
        setState((prev) => ({ ...prev, appointments }));
      })
  };

  const updateSpotsRemaining = () => {
    const updatedDays = state.days.map((day) => {

      const updatedSpots = day.appointments.length - day.appointments.filter((appointment) => { return state.appointments[appointment].interview }).length

      const updatedDay = { ...day, spots: updatedSpots }

      return updatedDay

    })

    setState((prev) => ({ ...prev, days: updatedDays }))
  }

  return { state, setDay, bookInterview, cancelInterview }
}