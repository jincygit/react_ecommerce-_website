//---------------------------ProductList---------------
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import styles from '../styles/home.module.css';
import { fetchProducts } from '../api/index';
import {addProducts,addSingleProduct,removeProduct} from "../redux/actions/productActions";
import {addCart,changeCartCount} from "../redux/actions/cartActions";
import ProductItem from './ProductItem';
import { Toaster,toast } from 'react-hot-toast';
//get firebase instance
import { firestore as db } from '../firebase';
import { getFirestore, collection, getDocs, onSnapshot, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
//import { calculateNewValue } from '@testing-library/user-event/dist/utils';


export const ProductList = ({ }) => {

    const dispatch = useDispatch();
    const wholeState = useSelector((state) => state);
    //get products
    let {products,cart} = useSelector((state) => state);
    //const productsList = products;
    const [productsList, setProductsList] = useState(products.products);
    //get sorting status
    const [sortingStatus, setSortingStatus] = useState(false);
    //console.log("wproduct state..",wholeState);
    //product loading status
    const [loading, setLoading] = useState(true);

    //function for fetchProductList
    const fetchProductList = async () => {
        try {
            //get products from the API
            const apiResponseData = await fetchProducts();
            //check whether api apiResponseData and set state
            if (apiResponseData.success) {  
                //dispatch(addProducts(apiResponseData.data));
            }
            const dataFromApi = apiResponseData.data;
            setLoading(false);
            

            //firebase code for add firebase data to state starts
                //fetching all data without condition from firebase
                const collectionRef = collection(db, 'products');
                onSnapshot(collectionRef, (querySnapshot) => {
                    const firebaseProducts = [];
                    querySnapshot.forEach((doc) => {
                        let newdata = { id: doc.id, ...doc.data() };
                        //adding firebase db data into existing api result data
                        dispatch(addSingleProduct(newdata));
                        firebaseProducts.push({ id: doc.id, ...doc.data() });
                    });
                    console.log("firebasec data",firebaseProducts);
                    console.log("dataFromApi data",dataFromApi);
                    //add api  products into firebase 
                    dataFromApi.forEach((apiProduct) => {
                        //check whether api product already exist in firebase db or not
                        let productExistStatus = firebaseProducts.findIndex((m) => m.id === apiProduct.id);
                        if (productExistStatus === -1) {
                            //if not exist then add into firebase db
                            // try {
                            //     const productsCollection = collection(db, 'products');
                            //     const newProductRef = addDoc(productsCollection, apiProduct);
                            //     dispatch(addSingleProduct(apiProduct));
                            // } catch (error) {
                            //     console.error('Error adding product: ', error);
                            // }
                        }
                    });
                    
                });
            //firebase code ends
            //setLoadingStatus(false);
        } catch (error) {
            console.log("error ", error);
            setLoading(false); 
        }
    };

    //function for sort by price
    const handlePriceSorting = async (sortingStatus) => {
        if(sortingStatus){
            //sorting added
            const sortedProducts = [...products.products]; 
            sortedProducts.sort((a, b) => a.price - b.price);
            //set sorted productsList
            products.products = sortedProducts
        }else{
            //sorting removed
            setSortingStatus(false);
            products.products = productsList
        }
    }

    //function for product delete from firebase
    const handleDelete = async (id) => {
        try{
            
            //delete in firebase
            const productRef = doc(db, 'products', id); 
            // Update your local state or UI as needed.
            dispatch(removeProduct(id));
            try {
                await deleteDoc(productRef);  
                //toast msg
                toast.success("Product deleted successfully", {
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
            } catch (error) {
                console.error('Error deleting product:', error);
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
            }
           
            //setDeletingStatus(false);
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
        }
    }

    
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
                        {/* sorting button section starts */}
                        <button 
                        className={styles.viewDetailsBtn} 
                        onClick={()=>{setSortingStatus(true);handlePriceSorting(true)}}
                        >
                        Sort By price
                        </button>
                        {sortingStatus&& 
                            <button className={styles.sortButton} 
                                onClick={()=>{handlePriceSorting(false);}}>
                                <img src="https://www.veryicon.com/download/png/miscellaneous/kqt/close-116?s=512"/>
                            </button>
                        }
                        {/* sorting button section ends */}
                       
                    </div>
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
                                                    <ProductItem product={product} 
                                                        key={product.id}
                                                        handleDelete ={handleDelete}/>
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
