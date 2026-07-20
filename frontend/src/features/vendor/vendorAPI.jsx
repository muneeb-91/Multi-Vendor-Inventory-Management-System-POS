import axios from "../../services/axios";

export const getAllVendorsRequest = async () => {
  const response = await axios.get("/vendor/requests");
  return response.data;
};

