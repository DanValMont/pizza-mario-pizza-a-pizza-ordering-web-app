import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAdmin: false,
  },
  reducers: {
    loggedInAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    loggedOutAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { loggedInAdmin, loggedOutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
