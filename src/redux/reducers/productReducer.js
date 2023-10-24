import {
  ADD_PRODUCTS,
  REMOVE_PRODUCT,
} from "../actions/productActions";

const INITIAL_STATE = {
  products: [], // Initialize the cart as an empty array
};



export const productReducer = (state = INITIAL_STATE, action) => {
  //console.log("action...", action)
  switch (action.type) {
    case ADD_PRODUCTS:
      return action.payload;
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
