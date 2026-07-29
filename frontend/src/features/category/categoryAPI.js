import axios from "../../services/axios.js"

export const getAllCategoriesRequest = async () => {
  console.log("fetching categories");
  const res = await axios.get("/category/categories");
  return res.data;
};

export const createCategoryRequest = async (categoryData) => {
  const res = await axios.post("/categories", categoryData);
  return res.data;
};

export const toggleStatus = async (id) => {
  const res = await axios.post(`/category/categories/${id}/toggle-status`);
  return res.data;
};