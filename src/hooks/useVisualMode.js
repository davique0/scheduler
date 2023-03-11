import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  //setMode to a new one
  const transition = (newMode, replace = false) => {
    //if replace is true, like in an error, it deletes last on history and replace it with newMode.
    if (replace) {
      setHistory(prev => ([...prev.slice(0, prev.length - 1), newMode]));
      setMode(newMode);
      return;
    }
    setMode(newMode);
    setHistory(prev => ([...prev, newMode]));
  };
  //goes back to previous mode
  const back = () => {
    //if history array is already at first value it shouldn't do anything
    if (history.length <= 1) return;
    //create a new array to delete last item of history array and set it as new history
    let newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    //access last item of the array which after deleting should be previous mode
    setMode(newHistory[newHistory.length - 1]);
  };
  return { mode, transition, back };
}
