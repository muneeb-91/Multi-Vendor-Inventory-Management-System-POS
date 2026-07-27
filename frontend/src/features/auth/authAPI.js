import axios from "../../services/axios.js"

export const loginRequest = async (data) => {
  const response = await axios.post("/user/login", data);
  return response.data;
};

export const checkAuthRequest = async () => {
  const response = await axios.get("/user/check-auth");
  return response.data;
};

export const logoutRequest = async () => {
  const response = await axios.post("/user/logout");
  return response.data;
};