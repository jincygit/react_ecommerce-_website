import {
  ADD_CART,
  REMOVE_CART,
  INCREMENT_CART_COUNT,
  DECREMENT_CART_COUNT
} from "../actions/cartActions";

const INITIAL_STATE = [];

// title: "",
// price: "",
// rating: "",
// link: "",
// }

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CART:
      return { ...state, isRunning: true };
    case REMOVE_CART:
      return { ...state, isRunning: false };

    case INCREMENT_CART_COUNT:
      return { isRunning: false, elapsedTime: 0 };
    case DECREMENT_CART_COUNT:
      return { ...state, elapsedTime: ++state.elapsedTime };
    default:
      return state;
  }
};
