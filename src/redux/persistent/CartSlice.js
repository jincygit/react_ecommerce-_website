import { createSlice } from "@reduxjs/toolkit";
import { myProduct } from "./products";

export const useCartSlice = createSlice({
  name: "cartitem",
  initialState: [],
  reducers: {
    addCart: (state, action) => {
      console.log(action);
      if (action.payload) {
        state.push(action.payload);
        //return action.payload;
      }
    }
   
  }
})

export const { addCart } = useCartSlice.actions;
export default useCartSlice.reducer;


//export default useCartSlice.reducer
