// add counter action creators imports here
import {
    RESET_COUNTER,
    INCREMENT_COUNTER,
    DECREMENT_COUNTER
  } from "../actions/counterActions";


const INITIAL_STATE = { count: 0};

// define counter reducer function here
export const counterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case RESET_COUNTER:
        return INITIAL_STATE;
      case INCREMENT_COUNTER:
        //const i = state.count;
        //const incrementedNewValue = i+3;
        return { ...state, count: state.count+1 };
      case DECREMENT_COUNTER:
        return { ...state, count: state.count-1 };
      default:
        return state;
    }
  };