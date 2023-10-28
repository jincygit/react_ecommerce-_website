//---------------------------ProductList---------------
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import styles from '../styles/home.module.css';
import { fetchProducts } from '../api/index';
import {addProducts} from "../redux/actions/productActions";
import {addCart,changeCartCount} from "../redux/actions/cartActions";
// import {addProducts} from "../redux/persistent/addProducts";
// import {addCart} from "../redux/persistent/CartSlice";
import ProductItem from './ProductItem';
import { Toaster,toast } from 'react-hot-toast';
//get firebase instance
import { firestore as db } from '../firebase';

import { getFirestore, collection, getDocs, onSnapshot, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';



export const ProductList = ({ }) => {

    const dispatch = useDispatch();
    const wholeState = useSelector((state) => state);
    const {products,cart} = useSelector((state) => state);
    console.log("wproduct state..",wholeState);
    //console.log("wproduct products..",products);
    // const products = [];
    // const cart = [];
    //console.log("wproduct cart state..",cart);
    const [loading, setLoading] = useState(true);


//   const [editStatus, setEditStatus] = useState(false);
//   const [updatingStatus, setUpdatingStatus] = useState(false);
//   const [deletingStatus, setDeletingStatus] = useState(false);

//   const [productTitle, setProductTitle] = useState("");
//   const [productImageUrl, setProductImageUrl] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productDetails, setProductDetails] = useState("");


  const [todoTitle, setTodoTitle] = useState("");
  const [todoId, setTodoId] = useState("");
  const [completedStatus, setCompletedStatus] = useState("");


    const fetchProductList = async () => {
        try {
            //get products from the API
            const response = await fetchProducts();
            //console.log("url response ....",response);
            //check whether api response and set state
            if (response.success) {
                dispatch(addProducts(response.data));
            }
            setLoading(false);

            //firebase code starts
            //fetching all data without condition from firebase
            const collectionRef = collection(db, 'products'); 
            const queryConditions = query(
                collectionRef,
                where('price', '>', 0),
            );
            onSnapshot(queryConditions, (querySnapshot) => {
                const firebaseProducts = [];
                querySnapshot.forEach((doc) => {
                    firebaseProducts.push({ id: doc.id, ...doc.data() });
                
                });
                //this.setState({ products, loading: false });
                console.log("..firebaseProducts", firebaseProducts);
            });
            
            //firebase code ends
            //setLoadingStatus(false);
        } catch (error) {
            console.log("error ", error);
            setLoading(false); 
        }
    };

    const handleEdit = async () => {
        try {
            //setLoadingStatus(false);
        } catch (error) {
            console.log("error ", error);
        }
    };

    const handleAddToCart = async (productData) => {
        try {
            //console.log("test cart  ",cart, "type  ",typeof cart.cart);
            let currentCart =cart.cart
            //callback for finding whether product already exist or not in cart
            function callbackFunctionToFindProduct(product) {
                //console.log("PRODUCT....",product)
                return product.id === productData.id;
            }
            //check product is already in cart or not, 
            var productAlreadyInCart = currentCart.find(callbackFunctionToFindProduct);
            console.log("find..",productAlreadyInCart);
            if(!productAlreadyInCart){
                //if not, initally qty as 1
                productData.qty=1;
                dispatch(addCart(productData));
            }else{
                //if exist then increase count
                dispatch(changeCartCount(productData,"plus"));
            }
            //toast msg
            toast.success("Product added to cart successfully", {
                icon: '✅',
                style: {
                backgroundColor: 'green', 
                color: 'white',
                userSelect: 'none',
                },
                duration: 1000, // Duration in milliseconds 
                position: 'top-right', // Toast position on the screen
                // onClose: () => console.log('Toast is closed'), // Callback
                onClose:(id) => {
                toast.dismiss(id); // Close the toast when the icon is clicked
                },
            });
            //setLoadingStatus(false);
        } catch (error) {
            console.log("error ", error);
            //toast msg
            toast.error(error, {
                icon: '❌', // You can customize the icon
                style: {
                backgroundColor: 'red', // You can customize the style
                color: 'white',
                userSelect: 'none',
                },
                duration: 1000, // Duration in milliseconds 
                position: 'top-right', // Toast position on the screen
                // onClose: () => console.log('Toast is closed'), // Callback
                onClose:(id) => {
                toast.dismiss(id); // Close the toast when the icon is clicked
                },
            });
            //setLoading(false); 
        }
    };
    useEffect(() => {
        // Call the fetchProductList function for setting product list
        fetchProductList(); 
    }, []);       
  

  return (<div>
            <div className={styles.home}>
                <div className={styles.postsList}>
                    {/* banner section starts */}
                        <div className={styles.bannerdiv}>
                        <img className={styles.bannerimg}
                            src="https://www.banglashoppers.com/media/wysiwyg/slidershow/bs-home-01.jpg"/>
                        </div>   
                    {/* banner section ends */}
                    <div>
                        {loading
                            // loading banner
                            ?<div >
                                <img className={styles.loadingBannerImg}
                                    src="https://en.pimg.jp/042/221/629/1/42221629.jpg"/>
                            </div>
                        :(products.length===0) 
                            ?
                            // no data banner
                            <div >
                                <img className={styles.loadingBannerImg}
                                src="https://siliconangle.com/files/2013/02/no-data.png"/>
                            </div>
                        
                            // product list
                            :<div className={styles.postWrapper}>
                                <div className={styles.postHeader}>
                                    <div className={styles.postAvatar}>
                                        <table>
                                        <thead></thead>
                                        <tbody>
                                            {products.products.map((product) => (
                                                <ProductItem product={product} key={product.id}/>
                                            ))}
                                            
                                        </tbody>
                                        </table>
                                    </div>         
        
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        <Toaster />
        </div>
  );
};

// prop validation
// ProductList.propTypes = {
//   todo: PropTypes.object.isRequired,
// };

export default ProductList;
