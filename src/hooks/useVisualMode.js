import Empty from "components/Appointment/Empty";
import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  //setMode to a new one
  const transition = (newMode) => {
    setMode(newMode);
    setHistory([...history, newMode]);
  };
  //goes back to previous mode
  const back = () => {
    setHistory((prev) => [...prev.slice(0, -1)]);
    setMode(history[history.length - 2]);
    console.log(history);
  };
  return { mode, transition, back };
}
