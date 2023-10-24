import "./styles.css";
//import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import store from "./redux/store/index";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

// components imports
import Navbar from "./components/Navbar";

// pages imports
import { CreateProduct } from "./components/CreateProduct";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";

// import { Timer } from "./pages/Timer";
// import { Counter } from "./pages/Counter";
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/es/integration/react';


//let persistor = persistStore(store);

export default function App() {
  return (
    <div className="App">
      {/* <Provider store={store}> */}
        {/* <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}> */}
              {/* <RouterProvider router={router} /> */}
              
                  {/* wrap all elements inside router */}
                  <Navbar />
                  <Routes>
                  
                    <Route exact path='/create' element={< CreateProduct />}></Route>
                    <Route exact path='/' element={< ProductList />}></Route>
                    <Route exact path='/cart' element={< Cart />}></Route>
                    {/* <Route path="/create-post" element={<CreatePost />} />
                    <Route exact path='/CreatePost' element={< CreatePost />}></Route>
                    <Route exact path='/PostDetail/:postId' element={< PostDetail />}></Route> */}
                  </Routes>
             
            {/* </PersistGate>
        </Provider> */}
      {/* </Provider> */}
      
    </div>
  );
}
