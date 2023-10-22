//const redux = require("redux");
import * as redux from "redux";
import { combineReducers } from "redux";

// import counter reducer function here
const { productReducer } = require("../reducers/productReducer");
const { cartReducer } = require("../reducers/cartReducer");


// combine the reducer functions here
const result = combineReducers({
    product:productReducer,
    cart :cartReducer
})


// add the root reducer function to store here
//export const store = redux.createStore(timerReducer);
export const store = redux.createStore(result);
