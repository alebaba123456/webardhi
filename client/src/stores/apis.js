// apis.js
import axios from "axios";

const baseUrl = "http://localhost:3000";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const goValidate = async () => {
  const response = await api.get(`${baseUrl}/validate`);
  return response;
};

export const loginAPI = async (email, password) => {
  const response = await api.post(`${baseUrl}/login`, { email, password });
  return response;
};
