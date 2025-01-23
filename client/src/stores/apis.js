// apis.js
import axios from "axios";

const baseUrl = "http://localhost:3000";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const validateAPI = async () => {
  const response = await api.get(`/validate`);
  return response;
};

export const loginAPI = async (email, password) => {
  const response = await api.post(`/login`, { email, password });
  return response;
};

export const logoutAPI = async () => {
  const response = await api.get(`/logout`);
  return response;
}

export const routesAPI = async () => {
  const response = await api.get('/router/get');
  return response;
}

export const classAPI = async(query) => {
  const response = await api.get(`/classroom/get/${query}`)
  return response.data;
}
