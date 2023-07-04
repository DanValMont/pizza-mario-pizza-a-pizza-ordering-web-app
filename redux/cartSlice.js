import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const existProductInArray = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existProductInArray) {
        const productIndexInArray = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        state.total -= state.products[productIndexInArray].total;
        const updatedProductsArray = state.products.filter(
          (product) => product._id !== action.payload._id
        );

        state.products = updatedProductsArray;

        state.products.push(action.payload);
        state.quantity = state.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
        state.total += action.payload.price * action.payload.quantity;
      }
    },
    removeProduct: (state, action) => {
      const updatedProductsArray = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.products = updatedProductsArray;
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
