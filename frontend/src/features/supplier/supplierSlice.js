import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suppliers: [],

  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  },

  // Fetch Suppliers
  fetchSuppliersLoading: false,

  // Add Supplier
  addSupplierLoading: false,

  // Update Supplier
  updateSupplierLoading: false,

  // Toggle Supplier Status
  toggleSupplierStatusLoading: false,

  // Delete Supplier
  deleteSupplierLoading: false,
};

const supplierSlice = createSlice({
  name: "suppliers",

  initialState,

  reducers: {
    // ==========================
    // Fetch Suppliers
    // ==========================

    fetchSuppliersStart: (state) => {
      state.fetchSuppliersLoading = true;
    },

    fetchSuppliersSuccess: (state, action) => {
      state.fetchSuppliersLoading = false;

      state.suppliers = action.payload.suppliers;
      state.pagination = action.payload.pagination;
    },

    fetchSuppliersFailure: (state) => {
      state.fetchSuppliersLoading = false;
      state.suppliers = [];
    },

    // ==========================
    // Add Supplier
    // ==========================

    addSupplierStart: (state) => {
      state.addSupplierLoading = true;
    },

    addSupplierSuccess: (state, action) => {
      state.addSupplierLoading = false;
      state.suppliers.unshift(action.payload);
    },

    addSupplierFailure: (state) => {
      state.addSupplierLoading = false;
    },

    // ==========================
    // Update Supplier
    // ==========================

    updateSupplierStart: (state) => {
      state.updateSupplierLoading = true;
    },

    updateSupplierSuccess: (state, action) => {
      state.updateSupplierLoading = false;

      const index = state.suppliers.findIndex(
        (supplier) => supplier._id === action.payload._id
      );

      if (index !== -1) {
        state.suppliers[index] = action.payload;
      }
    },

    updateSupplierFailure: (state) => {
      state.updateSupplierLoading = false;
    },

    // ==========================
    // Toggle Status
    // ==========================

    toggleSupplierStatusStart: (state) => {
      state.toggleSupplierStatusLoading = true;
    },

    toggleSupplierStatusSuccess: (state, action) => {
      state.toggleSupplierStatusLoading = false;

      const supplier = state.suppliers.find(
        (supplier) => supplier._id === action.payload.supplierId
      );

      if (supplier) {
        supplier.status = action.payload.status;
      }
    },

    toggleSupplierStatusFailure: (state) => {
      state.toggleSupplierStatusLoading = false;
    },

    // ==========================
    // Delete Supplier
    // ==========================

    deleteSupplierStart: (state) => {
      state.deleteSupplierLoading = true;
    },

    deleteSupplierSuccess: (state, action) => {
      state.deleteSupplierLoading = false;

      state.suppliers = state.suppliers.filter(
        (supplier) => supplier._id !== action.payload
      );
    },

    deleteSupplierFailure: (state) => {
      state.deleteSupplierLoading = false;
    },
  },
});

export const {
  fetchSuppliersStart,
  fetchSuppliersSuccess,
  fetchSuppliersFailure,

  addSupplierStart,
  addSupplierSuccess,
  addSupplierFailure,

  updateSupplierStart,
  updateSupplierSuccess,
  updateSupplierFailure,

  toggleSupplierStatusStart,
  toggleSupplierStatusSuccess,
  toggleSupplierStatusFailure,

  deleteSupplierStart,
  deleteSupplierSuccess,
  deleteSupplierFailure,
} = supplierSlice.actions;

export default supplierSlice.reducer;