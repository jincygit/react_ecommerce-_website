import "./styles.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

// components imports
import Navbar from "./components/Navbar";

// pages imports
import { CreateProduct } from "./components/CreateProduct";
import { ProductList } from "./components/ProductList";
import { ProductDetails } from "./components/ProductDetails";

import { Cart } from "./components/Cart";

import Home from "./pages/Home";
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
                    <Route exact path='/' element={< Home />}></Route>
                    <Route exact path='/create' element={< CreateProduct />}></Route>
                    <Route exact path='/products' element={< ProductList />}></Route>
                    <Route exact path='/cart' element={< Cart />}></Route>
                    <Route exact path='/details/:productId' element={< ProductDetails />}></Route>
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
