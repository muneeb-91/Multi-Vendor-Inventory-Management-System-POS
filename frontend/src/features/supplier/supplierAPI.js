import axios from "../../services/axios.js";

export const getAllSuppliersRequest = async ({
  page = 1,
  limit = 5,
  search = "",
  status = "all",
}) => {
  const res = await axios.get("/supplier/suppliers", {
    params: {
      page,
      limit,
      search,
      status,
    },
  });

  return res.data;
};

export const addSupplierRequest = async (supplierData) => {
  const res = await axios.post("/supplier/suppliers", supplierData);

  return res.data;
};

export const updateSupplierRequest = async (id, supplierData) => {
  const res = await axios.put(
    `/supplier/suppliers/${id}`,
    supplierData
  );

  return res.data;
};

export const toggleSupplierStatusRequest = async (id) => {
  const res = await axios.patch(
    `/supplier/suppliers/${id}/toggle-status`
  );

  return res.data;
};

export const deleteSupplierRequest = async (id) => {
  const res = await axios.delete(
    `/supplier/suppliers/${id}`
  );

  return res.data;
};