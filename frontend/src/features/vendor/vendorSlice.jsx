import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendors: [],
  loading: false,
  error: null,
};

const vendorSlice = createSlice({
  name: "vendors",

  initialState,

  reducers: {
    fetchVendorsStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchVendorsSuccess: (state, action) => {
      state.loading = false;
      state.vendors = action.payload;
    },

    fetchVendorsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchVendorsStart,
  fetchVendorsSuccess,
  fetchVendorsFailure,
} = vendorSlice.actions;

export default vendorSlice.reducer;