import axios from "../../services/axios.js";

export const getAllCategoriesRequest = async () => {
  const res = await axios.get("/category/categories");
  return res.data;
};

export const createCategoryRequest = async (categoryData) => {
  const res = await axios.post("/category/categories", categoryData);
  return res.data;
};

export const updateCategoryRequest = async (id, categoryData) => {
  const res = await axios.put(
    `/category/categories/${id}`,
    categoryData
  );

  return res.data;
};

export const toggleCategoryStatusRequest = async (id) => {
  const res = await axios.patch(
    `/category/categories/${id}/toggle-status`
  );

  return res.data;
};

export const deleteCategoryRequest = async (id) => {
  const res = await axios.delete(
    `/category/categories/${id}`
  );

  return res.data;
};