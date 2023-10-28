// define product action constants here
export const ADD_PRODUCTS = "Add product";
export const REMOVE_PRODUCT = "Remove product";
export const UPDATE_PRODUCT = "update product";
export const DECREMENT_PRODUCT_COUNT = "Decrement product count";


// define product action creators here
export const addProducts = (data) => ({ type: ADD_PRODUCTS,payload: data });
export const removeProduct = (id) => ({ type: REMOVE_PRODUCT,id: id });
export const updateProducts = (data) => ({ type: UPDATE_PRODUCT,payload: data });
export const decrementCartCount = () => ({ type: DECREMENT_PRODUCT_COUNT });