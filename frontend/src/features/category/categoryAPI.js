import axios from "../../lib/axios";

export const getAllCategoriesRequest = async () => {
  const res = await axios.get("/categories");
  return res.data;
};

export const createCategoryRequest = async (categoryData) => {
  const res = await axios.post("/categories", categoryData);
  return res.data;
};