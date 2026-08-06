import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],

  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  },

  // Fetch Categories
  fetchCategoriesLoading: false,

  // Add Category
  addCategoryLoading: false,

  // Update Category
  updateCategoryLoading: false,

  // Toggle Category Status
  toggleCategoryStatusLoading: false,

  // Delete Category
  deleteCategoryLoading: false,
};

const categorySlice = createSlice({
  name: "categories",

  initialState,

  reducers: {
    // Fetch Categories
    fetchCategoriesStart: (state) => {
      state.fetchCategoriesLoading = true;
    },

    fetchCategoriesSuccess: (state, action) => {
      state.fetchCategoriesLoading = false;

      state.categories = action.payload.categories;
      state.pagination = action.payload.pagination;
    },

    fetchCategoriesFailure: (state) => {
      state.fetchCategoriesLoading = false;
      state.categories = [];
    },

    // Add Category
    addCategoryStart: (state) => {
      state.addCategoryLoading = true;
    },

    addCategorySuccess: (state, action) => {
      state.addCategoryLoading = false;
      state.categories.unshift(action.payload);
    },

    addCategoryFailure: (state) => {
      state.addCategoryLoading = false;
    },

    // Update Category
    updateCategoryStart: (state) => {
      state.updateCategoryLoading = true;
    },

    updateCategorySuccess: (state, action) => {
      state.updateCategoryLoading = false;

      const index = state.categories.findIndex(
        (category) => category._id === action.payload._id,
      );

      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },

    updateCategoryFailure: (state) => {
      state.updateCategoryLoading = false;
    },

    // Toggle Status
    toggleCategoryStatusStart: (state) => {
      state.toggleCategoryStatusLoading = true;
    },

    toggleCategoryStatusSuccess: (state, action) => {
      state.toggleCategoryStatusLoading = false;

      const category = state.categories.find(
        (category) => category._id === action.payload.categoryId,
      );

      if (category) {
        category.status = action.payload.status;
      }
    },

    toggleCategoryStatusFailure: (state) => {
      state.toggleCategoryStatusLoading = false;
    },

    // Delete Category
    deleteCategoryStart: (state) => {
      state.deleteCategoryLoading = true;
    },

    deleteCategorySuccess: (state, action) => {
      state.deleteCategoryLoading = false;

      state.categories = state.categories.filter(
        (category) => category._id !== action.payload,
      );
    },

    deleteCategoryFailure: (state) => {
      state.deleteCategoryLoading = false;
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,

  addCategoryStart,
  addCategorySuccess,
  addCategoryFailure,

  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,

  toggleCategoryStatusStart,
  toggleCategoryStatusSuccess,
  toggleCategoryStatusFailure,

  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
