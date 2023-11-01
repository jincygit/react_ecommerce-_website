import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/home.module.css';
import { useParams } from 'react-router-dom';


export const ProductDetails = () => {
    //getting productId
    const { productId } = useParams();
    const wholeState = useSelector((state) => state);
    const {products,cart} = useSelector((state) => state);
    const productData = products.products.filter((item) => item.id === productId);
    
    //rating
    let rating = 0;
    if(productData.length !== 0) {
      //rating update
      rating = productData[0].rating;
    }
    const stars = Array(rating).fill(null);
    //dummyFn
    const dummyFn = async () => {};
  


  return (
    
      (productData.length == 0) ? (
          // no data banner
          <div >
          <img className={styles.loadingBannerImg}
          src="https://siliconangle.com/files/2013/02/no-data.png"/>
          </div>
      
      ) : (
        <div className={styles.home} key ={productData[0].id}>
          
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
                      Product Details
                      </div>
                      {/* Product Name */}
                        <input type="text" className={styles.createPostInput} name="" 
                          value={productData[0].title}
                          onChange={(e) => dummyFn()}
                          placeholder='Enter Product Name' readOnly/>
                      
                      {/* Product Price */}
                        <input type="number" className={styles.createPostInput} name="" 
                          value={productData[0].price}
                          onChange={(e) => dummyFn()}
                          placeholder='Enter Product Price' readOnly/>
                      {/* Product image url */}
                        <input type="text" className={styles.createPostInput} name="" 
                          value={productData[0].imageUrl}
                          onChange={(e) => dummyFn()}
                          placeholder='Enter Product Image Url' readOnly/>
                      {/* Product rating */}
                      <div className={styles.rating}>
                          <p>Product Rating: {rating}</p>
                          {stars.map((_, index) => (
                            
                              <span key={index} className={index <= rating ? styles.filledStar : styles.emptyStar}>★</span>
                          
                          ))}
                      </div>
                      {/* Product description */}
                        <textarea
                          placeholder='Enter Product Details'
                          className={styles.addPost+" "+ styles.createPostTextarea} 
                          value={productData[0].details}
                          onChange={(e) => dummyFn()}
                          readOnly
                        />


                      
                      
                  </div>
                </div>
            {/* create product section ends */}
            
          
            
          </div>
        
        </div>
      )
  );
};


