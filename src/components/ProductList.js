//---------------------------ProductList---------------
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import styles from '../styles/home.module.css';
import { fetchProducts } from '../api/index';
import {addProducts,addSingleProduct} from "../redux/actions/productActions";
import {addCart,changeCartCount} from "../redux/actions/cartActions";
// import {addProducts} from "../redux/persistent/addProducts";
// import {addCart} from "../redux/persistent/CartSlice";
import ProductItem from './ProductItem';
import { Toaster,toast } from 'react-hot-toast';
//get firebase instance
import { firestore as db } from '../firebase';

import { getFirestore, collection, getDocs, onSnapshot, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';



export const ProductList = ({ }) => {

    const dispatch = useDispatch();
    const wholeState = useSelector((state) => state);
    //get products
    let {products,cart} = useSelector((state) => state);
    //const productsList = products;
    const [productsList, setProductsList] = useState(products.products);
    //get sorting status
    const [sortingStatus, setSortingStatus] = useState(false);
    console.log("wproduct state..",wholeState);
    //product loading status
    const [loading, setLoading] = useState(true);

    //function for fetchProductList
    const fetchProductList = async () => {
        try {
            //get products from the API
            const response = await fetchProducts();
            //check whether api response and set state
            if (response.success) {
                dispatch(addProducts(response.data));
            }
            setLoading(false);

            //firebase code starts
                //fetching all data without condition from firebase
                const collectionRef = collection(db, 'products');
                onSnapshot(collectionRef, (querySnapshot) => {
                    console.log("..products",typeof products);
                    const firebaseProducts = [];
                    querySnapshot.forEach((doc) => {
                        console.log("addddd");
                        let newdata = { id: doc.id, ...doc.data() };
                        //adding firebase db data into existing api result data
                        dispatch(addSingleProduct(newdata));
                        //firebaseProducts.push({ id: doc.id, ...doc.data() });
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
            setProductsList(sortedProducts);
        }else{
            //sorting removed
            setSortingStatus(false);
            setProductsList(products.products);    
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
                                            {productsList.map((product) => (
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
