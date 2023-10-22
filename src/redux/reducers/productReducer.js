import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
} from "../actions/productActions";

const INITIAL_STATE = { isRunning: false, elapsedTime: 0 };

// title: "",
// price: "",
// rating: "",
// link: "",
// }

export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return { ...state, isRunning: true };
    case REMOVE_PRODUCT:
      return { ...state, isRunning: false };

    // case RESET_TIMER:
    //   return { isRunning: false, elapsedTime: 0 };
    // case INCREMENT_TIMER:
    //   return { ...state, elapsedTime: ++state.elapsedTime };
    default:
      return state;
  }
};
