import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import vendorReducer from "../features/vendor/vendorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vendors: vendorReducer,
  },
});