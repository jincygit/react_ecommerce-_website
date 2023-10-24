import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementTimer } from "../redux/actions/timerActions";

export const Time = () => {
  const dispatch = useDispatch();
  const { isRunning, elapsedTime } = useSelector((state) => {return state.timer;});
  

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return <b>{elapsedTime}</b>;
};
