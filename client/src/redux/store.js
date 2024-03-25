import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice/userSlice.js";
export const store = configureStore({
  reducer: { user: userReducer },
});
