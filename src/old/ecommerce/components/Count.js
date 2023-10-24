import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { incrementTimer } from "../redux/actions/counterActions";

export const Count = () => {
  const { count } = useSelector((state) => {return state.counter;});


  return <b>{count}</b>;
};
