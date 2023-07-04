import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import adminSlice from "./adminSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    admin: adminSlice,
  },
});
