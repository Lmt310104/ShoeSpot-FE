import throttle from "lodash.throttle";
import Cookies from "universal-cookie";
import authService from "../services/auth.service";
import Axios from "axios";
import { API_URL } from "../utils/constant";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

export const getAccessToken = () => {
  return cookies.get("access_token");
};
export const setAccessToken = (token) => {
  cookies.set("access_token", token, { path: "/" });
};
export const removeAccessToken = () => {
  cookies.remove("access_token", { path: "/" });
};

const refreshAccessToken = throttle(
  async (originalRequest) => {
    try {
      const newToken = await authService.refreshAccessToken();
      originalRequest.headers.Authorization = `${newToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      console.error(
        "Refresh token expired or invalid. Logging out",
        refreshError
      );
      removeAccessToken();
      // window.location.href = routes.AUTH.SIGN_IN;
    }
  },
  1000,
  {
    leading: true,
    trailing: false,
  }
);

function authRequestInterceptor(config) {
  if (config.headers) {
    const token = getAccessToken();
    if (token) {
      console.log("token", token);
      config.headers.Authorization = `${token}`;
      const { userId } = jwtDecode(token);
      console.log("id", userId);
      config.headers["x-client-id"] = userId;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = {
      ...error.config,
      _retry: error.config._retry ?? false,
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops
      await refreshAccessToken(originalRequest);
    }

    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 400:
          console.error("Bad Request:", error.response);
          break;
        case 404:
          console.error("Resource not found: /not-found", error.response);
          break;
        case 500:
          console.error("Server error: /server-error", error.response);
          break;
        default:
          console.error("An unknown error occurred:", error.response);
      }
    } else {
      console.error("Network or CORS issue:", error.message);
    }

    return Promise.reject(error);
  }
);
