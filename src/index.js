import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import Root from './timer_action/Root';


import { BrowserRouter } from "react-router-dom";
// import store from "./redux/store/index";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/es/integration/react';
//let persistor = persistStore(store);
import { store, persistor } from "./redux/store/index";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
      {/* <Root /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
