import { useEffect, useState } from "react";
import { formatTime } from "./utils";

const Counter = ({ start, stop, addToHistory }) => {
  const [counter, setCounter] = useState(0);

  const startTimer = () => {
    const timer = window.setInterval(() => {
      setCounter((c) => ++c);
    }, 1000);

    return timer;
  };

  useEffect(() => {
    let timer = null;

    if (start) timer = startTimer();
    else {
      addToHistory(counter);
      clearInterval(timer);
    }

    if (stop) setCounter(0);

    return () => clearInterval(timer);
  }, [start, stop, counter]);

  return <div>{formatTime(counter)}</div>;
};

export default Counter;
