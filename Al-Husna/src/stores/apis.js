// api.js
import axios from 'axios';

const baseUrl = "http://localhost:3004";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const goValidate = async () => { 
  const response = await api.get(`${baseUrl}/validate`);
  return response
};