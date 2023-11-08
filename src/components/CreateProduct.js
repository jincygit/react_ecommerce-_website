import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/home.module.css';
import { Toaster,toast } from 'react-hot-toast';
//get firebase instance
import { firestore as db } from '../firebase';
import { getFirestore, collection, getDocs, onSnapshot, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import {addSingleProduct} from "../redux/actions/productActions";


export const CreateProduct = () => {
    const dispatch = useDispatch();
    let {products,cart} = useSelector((state) => state);
    //add button loading
    const [addingTodo, setAddingTodo] = useState(false);
    //page loader values
    const [loadingStatus, setLoadingStatus] = useState(true);
    //rating value
    const [rating, setRating] = useState(0);
    //input fields state
    const [productTitle, setProductTitle] = useState("");
    const [productImageUrl, setProductImageUrl] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDetails, setProductDetails] = useState("");
    const [errorMsgStatus, setErrorMsgStatus] = useState(false);

    //handleRatingChange
    const handleRatingChange = (newRating) => {
      setRating(newRating);
      //console.log("newRating  ",newRating)
    };

    const createProductInFirebaseDb = async() => {
        //validate all fields
        if((productTitle=="")||(productPrice=="")||(productImageUrl=="")||(productDetails=="")){
          //set error msg if any field value missing
          setErrorMsgStatus(true);
        }
        else{
            //create product if all data avaliable
            setErrorMsgStatus(false);
            setAddingTodo(true);
            //setting productData
            const productData = {
              details: productDetails,
              price: productPrice,
              imageUrl: productImageUrl,
              title: productTitle,
              rating: rating
            };
            //add new product in firebase db
            try {
                const productsCollection = collection(db, 'products');
                // 'product' should be an object containing the product data
                const newProductRef = await addDoc(productsCollection, productData);
                //dispatch(addSingleProduct(productData));
                setAddingTodo(false);
                //empty input field after product creation
                setProductTitle("");
                setProductImageUrl("");
                setProductPrice("");
                setProductDetails("");
                //setRating(0);
                //success toast msg
                toast.success("Product added successfully", {
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
                setAddingTodo(false);
                //console.error('Error adding product: ', error);

                //error toast msg
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
    }
  
    return (
      <div className={styles.home}>
        <div className={styles.postsList}>
          
          {/* banner section starts */}
              <div className={styles.bannerdiv}>
                <img className={styles.bannerimg}
                  src="https://www.banglashoppers.com/media/wysiwyg/slidershow/bs-home-01.jpg"/>
              </div>   
          {/* banner section ends */}
          {/* create product section starts */}
              <div>
                <div className={styles.createPost}>
                    <div className={styles.createpost_header+ " "+styles.createPostDiv}>
                    Create Product
                    </div>
                    {/* Product Name */}
                      <input type="text" 
                        className={styles.createPostInput} 
                        name="" 
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                        placeholder='Enter Product Name' required/>
                    
                    {/* Product Price */}
                      <input type="number"
                        className={styles.createPostInput}
                        name="" 
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        placeholder='Enter Product Price' required/>
                    {/* Product image url */}
                      <input type="text" 
                        className={styles.createPostInput} 
                        name="" 
                        value={productImageUrl}
                        onChange={(e) => setProductImageUrl(e.target.value)}
                        placeholder='Enter Product Image Url' required/>
                    {/* Product rating */}

                      <div className={styles.rating}>
                      <p>Add Product Rating by clicking stars</p>
                        <input type="radio" id="star5" name="rating" value="5" onClick={() => handleRatingChange(5)}/>
                        <label htmlFor="star5"></label>
                        <input type="radio" id="star4" name="rating" value="4" onClick={() => handleRatingChange(4)}/>
                        <label htmlFor="star4"></label>
                        <input type="radio" id="star3" name="rating" value="3" onClick={() => handleRatingChange(3)}/>
                        <label htmlFor="star3"></label>
                        <input type="radio" id="star2" name="rating" value="2" onClick={() => handleRatingChange(2)}/>
                        <label htmlFor="star2"></label>
                        <input type="radio" id="star1" name="rating" value="1" onClick={() => handleRatingChange(1)}/>
                        <label htmlFor="star1"></label>
                      </div>

                    {/* Product description */}
                      <textarea
                        placeholder='Enter Product Details'
                        className={styles.addPost+" "+ styles.createPostTextarea}
                        value={productDetails}
                        onChange={(e) => setProductDetails(e.target.value)}
                        required
                      />

                    {errorMsgStatus&&<p className={styles.errorMsg}>Please fill all required fields</p>}
                    
                    {/* Add button starts */}
                      <div className={styles.createPostDiv}>
                        {/* if input is not present, then restrict button click  */}
                        <button
                          className={styles.addPostBtn}
                          onClick={createProductInFirebaseDb}
                          // onClick={rating===0?null:createProductInFirebaseDb}
                          disabled={addingTodo}
                        >
                          {/* adding button text changes on loading period */}
                          {addingTodo ? 'Adding Product...' : 'Add Product'}
                        </button>
                      </div>
                    {/* Add button ends */}
                </div>
              </div>
          {/* create product section ends */}
        </div>
        <Toaster />
      </div>
    );
};


