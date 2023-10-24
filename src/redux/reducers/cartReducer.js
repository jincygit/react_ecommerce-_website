import {
    ADD_CART,
    REMOVE_CART,
    CHANGE_CART_COUNT
} from "../actions/cartActions";

const INITIAL_STATE = {
    cart: [], // Initialize the cart as an empty array
    cartCount: 0,
}
//const INITIAL_STATE = [];


export const cartReducer = (state = INITIAL_STATE, action) => {
    //console.log("cart actionpayload...", action)
    switch (action.type) {
        case ADD_CART:
            //console.log("state action...", state);
            const currentCart = state.cart;
            let totalCartItems = state.cartCount;
            currentCart.push( action.payload );    
            totalCartItems = totalCartItems+1;
            return {
              ...state,
              cart:currentCart,
              cartCount:totalCartItems
            }
        case REMOVE_CART:
            //getting Product index
            const removeProductIndex = state.cart.findIndex((m) => m.id === action.payload.id);
            if (removeProductIndex !== -1) {
                //manage cart count with deleted product qty
                let totalCartItemsIncrement = state.cartCount;
                totalCartItemsIncrement=totalCartItemsIncrement-action.payload.qty;
                
                //increase cart count and product quantity
                const updatedProduct = action.payload;
                let updatedList = [...state.cart];
                // if(action.payload.qty===0){
                  console.log("remove..",action.payload.qty);
                  updatedList.splice(removeProductIndex, 1);
                // }else{
                //   console.log("nondelete..",action.payload.qty);
                //   updatedList[removeProductIndex] = updatedProduct;
                //}
                
                return {
                    ...state,
                    cart: updatedList,
                    cartCount:totalCartItemsIncrement
                };
            }
            return state;

        case CHANGE_CART_COUNT:
            console.log("COUNT C ...", action);
            //getting Product index
            const productIndex = state.cart.findIndex((m) => m.id === action.payload.id);
            if (productIndex !== -1) {
                let totalCartItemsIncrement = state.cartCount;
                if(action.changeType==="plus"){
                  //on incrementing cart count
                  totalCartItemsIncrement++;
                  action.payload.qty++;
                }
                else{
                  //on decrementing cart count
                  totalCartItemsIncrement--;
                  action.payload.qty--;
                }
                
                //increase cart count and product quantity
                const updatedProduct = action.payload;
                let updatedList = [...state.cart];
                if(action.payload.qty===0){
                  console.log("delete..",action.payload.qty);
                  updatedList.splice(productIndex, 1);
                }else{
                  console.log("nondelete..",action.payload.qty);
                  updatedList[productIndex] = updatedProduct;
                }
                
                return {
                    ...state,
                    cart: updatedList,
                    cartCount:totalCartItemsIncrement
                };
            }
            return state;
        default:
            return state;
    }
};
