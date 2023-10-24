// define product action constants here
export const ADD_PRODUCTS = "Add product";
export const REMOVE_PRODUCT = "Remove product";
export const INCREMENT_PRODUCT_COUNT = "Increment product count";
export const DECREMENT_PRODUCT_COUNT = "Decrement product count";


// define product action creators here
export const addProducts = (data) => ({ type: ADD_PRODUCTS,payload: data });
export const removeProduct = () => ({ type: REMOVE_PRODUCT });
export const changeCartCount = () => ({ type: INCREMENT_PRODUCT_COUNT });
export const decrementCartCount = () => ({ type: DECREMENT_PRODUCT_COUNT });