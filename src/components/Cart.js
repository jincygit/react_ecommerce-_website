//---------------------------ProductList---------------
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import styles from '../styles/home.module.css';
import { fetchProducts } from '../api/index';
import {addProducts} from "../redux/actions/productActions";
import {changeCartCount,removeCart} from "../redux/actions/cartActions";


export const Cart = ({ }) => {

    const dispatch = useDispatch();
    const {cart} = useSelector((state) => state);
    //const {cart,cartCount} = cart;
    //let products =[];
    console.log("cart state..",cart);
    const [isDeleting, setIsDeleting] = useState(false);


  const [editStatus, setEditStatus] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoId, setTodoId] = useState("");
  const [completedStatus, setCompletedStatus] = useState("");
  const [loading, setLoading] = useState(false);
  
  
    const changeCount = async (productData,type) => {
        try {
            console.log("qty.....",productData.qty);
            if((productData.qty===0)&&(type!=="plus")){
                //dispatch(changeCartCount(productData,type));
            }else{
                dispatch(changeCartCount(productData,type));
            }
            //setLoadingStatus(false);
        } catch (error) {
            console.log("error ", error);
        }
    };

    const handleRemoveCartProduct = async (productData) => {
        try {
            dispatch(removeCart(productData));
 
            setIsDeleting(false);
        } catch (error) {
            console.log("error ", error);
            setIsDeleting(false);
        }
    };
          
  

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
                :(cart.cart.length===0) 
                    ?
                    // empty cart banner
                    <div >
                        <img className={styles.loadingBannerImg}
                        src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-5521508-4610092.png"/>
                    </div>
                
                    // product list
                    :<div className={styles.postWrapper}>
                        <div className={styles.postHeader}>
                            <div className={styles.postAvatar}>
                                <table>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th><span>Price</span></th>
                                        <th>Qty</th>
                                        <th>TotalPrice</th>
                                        <th>Edit</th>
                                        
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.cart.map((cartItem) => (
                                        <tr key={cartItem.id}>
                                            <td>
                                                <img className={styles.productimage}
                                                src={cartItem.imageUrl}
                                                alt="post-pic"
                                                />
                                            </td>
                                            <td className={styles.titleTd}>
                                                {/* show edit input only by clicking edit icon */}                                    
                                                <div className={styles.titletext}>
                                                    <input type='text' 
                                                        value={cartItem.title} 
                                                        onChange={(e) => setTodoTitle(e.target.value)} 
                                                    />
                                                </div>                                           
                                            </td>
                                            <td>
                                                
                                                <span className={styles.completed}>
                                                    {cartItem.price}
                                                </span>
                                            </td>
                                            <td className={styles.qtyTd}>
                                                <img className={styles.plusicon}
                                                    src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" onClick={()=>changeCount(cartItem,"plus")}
                                                />
                                                <span className={styles.qtySpan}>
                                                    {cartItem.qty}
                                                </span>
                                                <img className={styles.plusicon}
                                                    src="https://as1.ftcdn.net/v2/jpg/01/45/20/26/1000_F_145202679_oT6Hqu8j7PxkTdxIeQ82UuXKs113uuyZ.jpg"  
                                                    onClick={()=>changeCount(cartItem,"minus")}
                                                 />
                                            </td>
                                            <td>
                                                <span className={styles.completed}>
                                                    {cartItem.price*cartItem.qty}
                                                </span>
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
                                                {!isDeleting
                                                    ? <button 
                                                        className={styles.actionicon}
                                                        // onClick={() => {setDeletingTodo(true);handleDeleteTodo(todo.id);}}
                                                        >
                                                        <img 
                                                        className={styles.actioniconimage}
                                                        src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/delete.png"
                                                        alt="delete-pic" onClick={()=>{setIsDeleting(false);handleRemoveCartProduct(cartItem);}}
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

export default Cart;
