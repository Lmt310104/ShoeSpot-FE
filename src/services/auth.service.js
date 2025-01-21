import { api, getAccessToken, setAccessToken } from "../lib/api-client";
import { trimObjectAttributes } from "../utils/format";
import { API_URL } from "../utils/constant";
import axios from "axios";

class AuthService {
  async login(data) {
    const trimmedData = trimObjectAttributes(data);
    return api.post("/auth/log-in", trimmedData);
  }
  async signUp(data) {
    const trimmedData = trimObjectAttributes(data);
    return api.post("/auth/sign-up", trimmedData);
  }
  async refreshAccessToken() {
    const token = getAccessToken();
    if (!token) throw new Error("No refresh token available");

    const response = await axios.get(`${API_URL}/auth/refresh-token`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    const newAccessToken = response.data.access_token;
    setAccessToken(newAccessToken);
    return newAccessToken;
  }
  async logOut() {
    return api.post("/auth/log-out");
  }
}

export default new AuthService();
