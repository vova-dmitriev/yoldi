import axios from "axios";

import { X_API_KEY } from "@/constants/localStorage";
import { PUBLIC_ROUTES } from "@/constants/routes";

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
        window.location.href = PUBLIC_ROUTES.login;
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