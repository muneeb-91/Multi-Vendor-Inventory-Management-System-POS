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
      console.log(state.categories);
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
  },
});

export const {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  addCategorySuccess,
} = categorySlice.actions;

export default categorySlice.reducer;