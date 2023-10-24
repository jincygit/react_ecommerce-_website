import { createSlice } from "@reduxjs/toolkit";
import { myProduct } from "./products";

export const productSlice = createSlice({
  name: "myProduct",
  initialState: [],
  reducers: {
    addProducts: (state, action) => {
      console.log(action);
      if (action.payload) {
        state.push(action.payload);
        //return action.payload;
      }
    }
   
  }
})

export const { addProducts } = productSlice.actions;
export default productSlice.reducer;
