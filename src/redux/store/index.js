import * as redux from "redux";
import { combineReducers } from "redux";
//import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
// import { persistReducer } from 'redux-persist'
import { persistStore, persistReducer } from "redux-persist";
import { productReducer } from '../reducers/productReducer';
import { cartReducer } from '../reducers/cartReducer';


// import counter reducer function here+

// const { productReducer } = require("../reducers/productReducer");
// const { cartReducer } = require("../reducers/cartReducer");


// combine the reducer functions here
const reducers = combineReducers({
    products:productReducer,
    cart :cartReducer,
})


// add the root reducer function to store here
//export const store = redux.createStore(result);

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, reducers)
  
  // const store = configureStore({
  //   reducer: persistedReducer,
  //   devTools: process.env.NODE_ENV !== 'production'
  // })
  
  // export default store;

//////////////////////////////////
  // const composeEnhancer =
  // (process.env.NODE_ENV !== "production" &&
  //   window &&
  //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  // compose;

//const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = redux.createStore(
  persistedReducer,
  undefined,
  
);

export const persistor = persistStore(store);
//to remove cart old data
//persistor.purge(['cart']);