import axios from "axios";

import { X_API_KEY } from "@/constants/localStorage";

const api = axios.create({
  baseURL: "https://frontend-test-api.yoldi.agency/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem(X_API_KEY);
      }
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    const apiKey = localStorage.getItem(X_API_KEY);
    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
