//---------------------------Home page---------------
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from '../styles/home.module.css';
import { fetchProducts } from '../api/index';
import {addProducts} from "../redux/actions/productActions";
import { Link } from 'react-router-dom';


export const Home = ({ }) => {

    const dispatch = useDispatch();
    //const wholeState = useSelector((state) => state);
    //console.log("wproduct state..",wholeState);

    const [loading, setLoading] = useState(true);





    const fetchProductList = async () => {
        try {
            //get products from the API
            const response = await fetchProducts();
            //check whether api response and set state
            if (response.success) {
                dispatch(addProducts(response.data));
            }
            setLoading(false);
        } catch (error) {
            console.log("error ", error);
            setLoading(false); 
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
                            
                    {/* product list */}
                    <div className={styles.postWrapper}>
                        <div className={styles.postHeader}>
                            <div >
                                <center>
                                    <Link to="/products">
                                        <button 
                                            className={styles.gotoIcon}
                                            // onClick={() => {setDeletingTodo(true);handleDeleteTodo(todo.id);}}
                                            >
                                            <img 
                                            className={styles.gotoIconImage}
                                            src="https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png"
                                            alt="delete-pic"
                                            />
                                        </button>
                                
                                        <p className={styles.gotoP}>GO TO PRODUCT PAGE</p>
                                    </Link>
                                </center>
                            </div>         
  
                        </div>
                    </div>
                
            </div>
        </div>
    </div>
  );
};

// prop validation
// ProductList.propTypes = {
//   todo: PropTypes.object.isRequired,
// };

export default Home;
