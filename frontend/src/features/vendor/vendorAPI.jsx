import axios from "../../services/axios";

export const getAllVendorsRequest = async () => {
  const response = await axios.get("/vendor/requests");
  return response.data;
};

export const updateVendorStatusRequest = async (id, status) => {
  const res = await axios.patch(`/vendors/${id}/status`, {
    status,
  });

  return res.data;
};