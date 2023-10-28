// define product action constants here
export const ADD_PRODUCTS = "Add product";
export const REMOVE_PRODUCT = "Remove product";
export const UPDATE_PRODUCT = "update product";
export const ADD_A_PRODUCT = "Add a product";
//ADD_A_PRODUCT

// define product action creators here
export const addProducts = (data) => ({ type: ADD_PRODUCTS,payload: data });
export const removeProduct = (id) => ({ type: REMOVE_PRODUCT,id: id });
export const updateProducts = (data) => ({ type: UPDATE_PRODUCT,payload: data });
export const addSingleProduct = (data) => ({ type: ADD_A_PRODUCT,payload: data });