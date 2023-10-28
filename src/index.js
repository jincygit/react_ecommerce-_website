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
//import * as serviceWorker from "./serviceWorker";


//firebase
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

//firebase
const firebaseConfig = {
  apiKey: "AIzaSyBSDwtGHXa3_0oGXys_AOmK7ruDW-QlhBQ",
  authDomain: "react-ecommerce-app-e50bd.firebaseapp.com",
  projectId: "react-ecommerce-app-e50bd",
  storageBucket: "react-ecommerce-app-e50bd.appspot.com",
  messagingSenderId: "651691067553",
  appId: "1:651691067553:web:0396ac4cdf111c2f1ec8e0",
  measurementId: "G-51WPQ2PENJ"
};

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


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
