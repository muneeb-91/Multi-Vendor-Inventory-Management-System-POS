import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import vendorReducer from "../features/vendor/vendorSlice.js";
import categoryReducer from '../features/category/categorySlice.js';
import supplierReducer from '../features/supplier/supplierSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    vendors: vendorReducer,
    categories: categoryReducer,
    suppliers: supplierReducer,
  },
});