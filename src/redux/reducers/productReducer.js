import {
  ADD_PRODUCTS,
  REMOVE_PRODUCT,
  UPDATE_PRODUCT
} from "../actions/productActions";

const INITIAL_STATE = {
  products: [], // Initialize the cart as an empty array
};



export const productReducer = (state = INITIAL_STATE, action) => {
  //console.log("action...", action)
  switch (action.type) {
    case ADD_PRODUCTS:
      //return action.payload;
      return {  ...state,
                products: action.payload,};
      //return { products: action.payload,};

    case UPDATE_PRODUCT:
        //getting Product index
        const productIndex = state.products.findIndex((m) => m.id === action.payload.id);
        if (productIndex !== -1) {        
            //if index exist then update
            const updatedProduct = action.payload;
            let updatedList = [...state.products];
            updatedList[productIndex] = updatedProduct;         
            return {
                ...state,
                products: updatedList,
            };
        }
        return state;
      case REMOVE_PRODUCT:
        //getting Product index
        const removeProductIndex = state.products.findIndex((m) => m.id === action.id);
        if (removeProductIndex !== -1) {        
            //if index exist then update
            //const updatedProduct = action.payload;
            let updatedList = [...state.products];
            updatedList.splice(removeProductIndex, 1);       
            return {
                ...state,
                products: updatedList,
            };
        }
        return state;

    default:
      return state;
  }
};
