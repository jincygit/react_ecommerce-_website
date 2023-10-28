//import firebase from 'firebase/app';//cause error
import firebase from 'firebase/compat/app';
//import 'firebase/firestore';
import 'firebase/compat/firestore';
// Your web app's Firebase configuration
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
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();