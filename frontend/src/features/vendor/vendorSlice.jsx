import { createSlice } from "@reduxjs/toolkit";

const initialState = {
// Vendor Requests States
  vendorRequests: [],
  vendorRequestsLoading: false,
  vendorRequestsError: null,
};

const vendorSlice = createSlice({
  name: "vendors",

  initialState,

  reducers: {
    // Vendor Requests
    fetchVendorRequestsStart: (state) => {
      state.vendorRequestsLoading = true;
      state.vendorRequestsError = null;
    },

    fetchVendorRequestsSuccess: (state, action) => {
      state.vendorRequestsLoading = false;
      state.vendorRequests = action.payload;
      console.log(state.vendorRequests);
    },

    fetchVendorRequestsFailure: (state, action) => {
      state.vendorRequestsLoading = false;
      state.vendorRequests = [];
      state.vendorRequestsError = action.payload;
    },
  },
});

export const {
  fetchVendorRequestsStart,
  fetchVendorRequestsSuccess,
  fetchVendorRequestsFailure,
} = vendorSlice.actions;

export default vendorSlice.reducer;