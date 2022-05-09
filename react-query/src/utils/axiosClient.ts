import axios from "axios";
import { getCookie } from "./cookies";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const customHeaders = {
    Authorization: "",
  };
  type TypeToken = string;

  const token: TypeToken = getCookie("token") || "";
  if (token) {
    customHeaders.Authorization = `Bearer ${token}`;
  }

  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error.response, "interceptors Error");
    if (error.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = '/login';
    } else {
      throw error;
    }
  },
);

export default axiosClient;
