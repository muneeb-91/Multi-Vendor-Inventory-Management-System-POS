import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
};

const categorySlice = createSlice({
  name: "categories",

  initialState,

  reducers: {
    // Fetch Categories
    fetchCategoriesStart: (state) => {
      state.categoriesLoading = true;
      state.categoriesError = null;
    },

    fetchCategoriesSuccess: (state, action) => {
      state.categoriesLoading = false;
      state.categories = action.payload;
    },

    fetchCategoriesFailure: (state, action) => {
      state.categoriesLoading = false;
      state.categories = [];
      state.categoriesError = action.payload;
    },

    // Add Category
    addCategorySuccess: (state, action) => {
      state.categories.unshift(action.payload);
    },

    // Update Category
    updateCategorySuccess: (state, action) => {
      const index = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );

      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },

    // Toggle Status
    toggleCategoryStatusSuccess: (state, action) => {
      const category = state.categories.find(
        (category) => category._id === action.payload._id
      );

      if (category) {
        category.status = action.payload.status;
      }
    },

    // Delete Category
    deleteCategorySuccess: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  addCategorySuccess,
  updateCategorySuccess,
  toggleCategoryStatusSuccess,
  deleteCategorySuccess,
} = categorySlice.actions;

export default categorySlice.reducer;