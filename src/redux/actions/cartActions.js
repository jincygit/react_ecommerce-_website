// define cart action constants here
export const ADD_CART = "Add cart";
export const REMOVE_CART = "Remove cart";
export const CHANGE_CART_COUNT = "change cart count";
export const RESET_CART = "Reset cart";


// define cart action creators here
export const resetCart = () => ({ type: RESET_CART});
export const addCart = (product) => ({ type: ADD_CART,payload: product });
export const removeCart = (product) => ({ type: REMOVE_CART,payload: product });
export const changeCartCount = (product,changeType) => ({ type: CHANGE_CART_COUNT, payload: product,changeType });
