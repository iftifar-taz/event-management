import axios from "axios";
import env from "../lib/validateEnv";
import { useUserStore } from "@/store/userStore";
import { useSessionStore } from "@/store/sessionStore";

// Create an axios instance
export const http = axios.create({
  withCredentials: true,
  baseURL: env.VITE_API_URL, // Replace with your base URL
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("request interceptor");
    return config;
  },
  function (error) {
    // Do something with request error
    console.log("request interceptor error");
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("response interceptor");
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("response interceptor error");
    if (error.response?.status === 401) {
      // Handle session expiry globally
      useUserStore.getState().setUser(null);
      useSessionStore.getState().setIsAdmin(false);
      useSessionStore.getState().setIsAuthenticated(false);
    }
    return Promise.reject(error);
  }
);
