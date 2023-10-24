//---------------------------Navbar Component---------------
import { Link } from 'react-router-dom';
import styles from '../styles/navbar.module.css';
import { useDispatch, useSelector } from "react-redux";


const Navbar = () => {
  const {cart} = useSelector((state) => state);
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img 
            className={styles.navbarlogo}
            alt="todo logo"
            src="https://www.logodesignteam.com/images/portfolio-images/ecommerce-websites-logo-design/ecommerce-websites-logo-design-new11.jpg"
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
          <Link to="/">
              <div className={styles.navHome}>
                
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXL0zU9PDcOlu0ziQ2CJ0LsBiDO7pRk9bI04tynwznb2euBv11tTJJwdd02qctw5V1-wE&usqp=CAU"
                    alt=""
                    className={styles.navHomeDp}
                  />
                
                <span>Products</span>
              </div>
          </Link>
          
          <Link to="/create">
            <div className={styles.navCreatePage}>
              
                <img
                  src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-and-shapes-3/177800/144-512.png"
                  alt=""
                  className={styles.navCreatePageDp}
                />
              
              <span>Create Product</span>
            </div>
          </Link>


          <Link to="/">
            <div className={styles.user}>
              
                <img
                  src="https://cdn-icons-png.flaticon.com/512/186/186313.png"
                  alt=""
                  className={styles.userDp}
                />
              
              <span>User</span>
            </div>
          </Link>
        
          <Link to="/cart">
            <div className={styles.navLinks}>
              
                <div className={styles.cartContainer}>
                  <div className={styles.cartIcon}>
                      <img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL2pvYjE0MjgtZWxlbWVudC0xMDctcC5wbmc.png"/>
                  </div>
                  <div className={styles.cartCount}>{cart.cartCount}</div>
                  
              </div>
              
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
