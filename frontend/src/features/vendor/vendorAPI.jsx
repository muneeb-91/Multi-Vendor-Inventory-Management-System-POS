import axios from "../../services/axios";

export const getAllVendorsRequest = async () => {
  const response = await axios.get("/vendor");
  return response.data;
};

