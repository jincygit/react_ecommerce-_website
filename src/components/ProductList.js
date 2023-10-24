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

export const ProductList = ({ }) => {

    const dispatch = useDispatch();
    const wholeState = useSelector((state) => state);
    const {products,cart} = useSelector((state) => state);
    console.log("wproduct state..",wholeState);
    // const products = [];
    // const cart = [];
    //console.log("wproduct cart state..",cart);
    const [loading, setLoading] = useState(true);


  const [editStatus, setEditStatus] = useState(false);
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
            //setLoadingStatus(false);
        } catch (error) {
            console.log("error ", error);
            setLoading(false); 
        }
    };

    const handleAddToCart = async (productData) => {
        try {
            //console.log("test cart  ",cart, "type  ",typeof cart.cart);
            let currentCart =cart.cart
            //callback for finding whether product already exist or not in cart
            function callbackFunctionToFindProduct(product) {
                console.log("PRODUCT....",product)
                return product.id === productData.id;
            }
            //check product is already in cart or not, 
            var productAlreadyInCart = currentCart.find(callbackFunctionToFindProduct);
            console.log("find..",productAlreadyInCart);
            if(!productAlreadyInCart){
                //if not, initally qty as 1
                productData.qty=1;
                console.log("KK  ",productData)
                dispatch(addCart(productData));
            }else{
                //if exist then increase count
                dispatch(changeCartCount(productData,"plus"));
            }
            //setLoadingStatus(false);
        } catch (error) {
            console.log("error ", error);
            //setLoading(false); 
        }
    };
    useEffect(() => {
        // Call the fetchProductList function for setting product list
        fetchProductList(); 
    }, []);       
  

  return (
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
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td>
                                                <img className={styles.productimage}
                                                src={product.imageUrl}
                                                alt="post-pic"
                                                />
                                            </td>
                                            <td className={styles.titleTd}>
                                                {/* show edit input only by clicking edit icon */}                                    
                                                <div className={styles.titletext}>
                                                    <input type='text' 
                                                        value={product.title} 
                                                        onChange={(e) => setTodoTitle(e.target.value)} 
                                                    />
                                                </div>                                           
                                            </td>
                                            <td>
                                                {/* show select input for edit based on editStatus */}
                                                <span className={styles.completed}>
                                                    {product.price}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    className={styles.addToCartBtn} 
                                                    onClick={()=>handleAddToCart(product)}>
                                                    Add to cart
                                                </button>
                                            </td>
                                            <td>
                                                    {/* show edit button and update button  based on editStatus */}
                                                    {!editStatus 
                                                    ? <button 
                                                        className={styles.actionicon} 
                                                        onClick={(e) => setEditStatus(true)}>
                                                        <img 
                                                            className={styles.actioniconimage}
                                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFx5EmaIWUIF5VpUW_y24CdKV0s3AB16_VJw&usqp=CAU"
                                                            alt="edit-pic"
                                                            
                                                        />
                                                        </button>
                                                    :     editStatus
                                                        ? <button 
                                                                className={styles.actionicon} 
                                                                // onClick={() => {setEditStatus(false);handleTodoUpdate(todo.id);}}
                                                                >
                                                                <img 
                                                                className={styles.actioniconimage}
                                                                src="https://previews.123rf.com/images/gguy/gguy1808/gguy180800007/106507629-update-in-progress-loading-bar.jpg"
                                                                alt="update-pic" 
                                                                
                                                                />
                                                            </button>
                                                            : <button 
                                                                className={styles.actionicon} 
                                                                // onClick={() => {setEditStatus(false);handleTodoUpdate(todo.id);}}
                                                                >
                                                                <img 
                                                                className={styles.actioniconimage}
                                                                src="https://www.pngall.com/wp-content/uploads/4/Update-Button-PNG-Free-Image.png"
                                                                alt="update-pic" 
                                                                
                                                                />
                                                            </button>
                                                    
                                                    } 
                                            </td>
                                            <td>
                                                {/* show delete button or deleting button  based on deletingTodo value */}
                                                {!editStatus
                                                    ? <button 
                                                        className={styles.actionicon}
                                                        // onClick={() => {setDeletingTodo(true);handleDeleteTodo(todo.id);}}
                                                        >
                                                        <img 
                                                        className={styles.actioniconimage}
                                                        src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/delete.png"
                                                        alt="delete-pic"
                                                        />
                                                    </button>
                                                    : <button 
                                                        className={styles.actionicon}
                                                        // onClick={() => {setDeletingTodo(true);handleDeleteTodo(todo.id);}}
                                                        >
                                                        <img 
                                                        className={styles.actioniconimage}
                                                        src="https://www.shutterstock.com/shutterstock/videos/1058485897/thumb/6.jpg?ip=x480"
                                                        alt="delete-pic"
                                                        />
                                                    </button>
                                                    }
                                            </td>
                                        </tr>
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
  );
};

// prop validation
// ProductList.propTypes = {
//   todo: PropTypes.object.isRequired,
// };

export default ProductList;
