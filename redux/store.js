import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import adminReducer from "./adminSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    admin: adminReducer,
  },
});
