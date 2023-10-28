//---------------------------ProductList---------------
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/home.module.css';
import {updateProducts,removeProduct} from "../redux/actions/productActions";
import {addCart,changeCartCount} from "../redux/actions/cartActions";
import { Toaster,toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export const ProductItem = ({product }) => {

    const dispatch = useDispatch();
    const wholeState = useSelector((state) => state);
    const {cart} = useSelector((state) => state);
    //console.log("wproduct state..",wholeState);
    // const products = [];
    // const cart = [];
    //console.log("wproduct cart state..",cart);
    //const [loading, setLoading] = useState(true);


    const [editStatus, setEditStatus] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [deletingStatus, setDeletingStatus] = useState(false);
    const [productTitle, setProductTitle] = useState(product.title);
    const [productImageUrl, setProductImageUrl] = useState(product.imageUrl);
    const [productPrice, setProductPrice] = useState(product.price);
    const [productDetails, setProductDetails] = useState(product.details);
    
   //function for product delete
    const handleDelete = async () => {
        try{
            dispatch(removeProduct(product.id));
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
            setDeletingStatus(false);
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
    }

    //function for product edit
    const handleEdit = async () => {
        try {
            //setLoadingStatus(false);
            const updatedValues = {
                id:product.id,
                rating:product.rating,
                title:productTitle,
                imageUrl:productImageUrl,
                price:productPrice,
                details:productDetails,
            };
            dispatch(updateProducts(updatedValues));
            //toast msg
            toast.success("Product edited successfully", {
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
            setUpdatingStatus(false)
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
    };

    //function for product cart count change
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
           
    return (
        <tr >
            {!editStatus &&
                 <td>
                 <img className={styles.productimage}
                     src={product.imageUrl}
                     alt="post-pic"
                 />
             </td>
            }
            {!editStatus &&
                <td className={styles.titleTd}>
                    {/* show edit input only by clicking edit icon */} 
                    <p>{product.title}</p> 
                </td> 
            }   
            {!editStatus &&
                <td>
                    <span className={styles.completed}>
                        {product.price}
                    </span>
                </td>
            }
            {/* if editStatus enabled */}
            {editStatus &&
                <td>
                    <table className={styles.editTable}>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="text" 
                                        className={styles.editInput} 
                                        name="" value={productTitle}
                                        placeholder='Enter Product Name'
                                        onChange={(e) => setProductTitle(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" 
                                        className={styles.editInput} 
                                        name="" value={productPrice}
                                        placeholder='Enter Product Price'
                                        onChange={(e) => setProductPrice(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" 
                                        className={styles.editInput} 
                                        name="" value={productImageUrl}
                                        placeholder='Enter Product ImageUrl'
                                        onChange={(e) => setProductImageUrl(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <textarea 
                                        className={styles.editInput} 
                                        name="" value={productDetails}
                                        placeholder='Enter Product Details'
                                        onChange={(e) => setProductDetails(e.target.value)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </td>
            }
            <td>
                <Link to={`/details/${product.id}`}>
                    <button 
                        className={styles.viewDetailsBtn} 
                        // onClick={()=>handleAddToCart(product)}
                        >
                        View Details
                    </button>
                </Link>
            </td>
            {!editStatus &&
                <td>
                    <button 
                        className={styles.addToCartBtn} 
                        onClick={()=>handleAddToCart(product)}>
                        Add to cart
                    </button>
                </td>
            }
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
                    :     updatingStatus
                        ? <button 
                                className={styles.actionicon} 
                                // onClick={() => {setEditStatus(false);handleTodoUpdate(todo.id);}}
                                >
                                <img 
                                className={styles.actioniconimage}
                                src="https://previews.123rf.com/images/gguy/gguy1808/gguy180800007/106507629-update-in-progress-loading-bar.jpg"
                                alt="updating-pic" 
                                
                                />
                            </button>
                            : <button 
                                className={styles.actionicon} 
                                onClick={() => {setUpdatingStatus(true);}}
                                >
                                <img 
                                className={styles.actioniconimage}
                                src="https://www.pngall.com/wp-content/uploads/4/Update-Button-PNG-Free-Image.png"
                                alt="update-pic" 
                                onClick={() => {setEditStatus(false);handleEdit();}}
                                />
                            </button>
                    
                    } 
            </td>
            <td>
                {/* show delete button or deleting button  based on deletingTodo value */}
                {!deletingStatus
                    ? <button 
                        className={styles.actionicon}
                        onClick={() => {setDeletingStatus(true);handleDelete();}}
                        >
                        <img 
                        className={styles.actioniconimage}
                        src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/delete.png"
                        alt="delete-pic"
                        />
                    </button>
                    : <button 
                        className={styles.actionicon}
                        
                        >
                        <img 
                        className={styles.actioniconimage}
                        src="https://www.shutterstock.com/shutterstock/videos/1058485897/thumb/6.jpg?ip=x480"
                        alt="delete-pic"
                        />
                    </button>
                    }
            </td>
            {/* <Toaster /> */}
        </tr>
    );
};

// prop validation
// ProductList.propTypes = {
//   todo: PropTypes.object.isRequired,
// };

export default ProductItem;
