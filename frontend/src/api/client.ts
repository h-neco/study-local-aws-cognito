import axios, { AxiosError } from "axios";
import { refreshTokenApi } from "./auth";
import { getAccessToken, setAccessToken } from "../utils/tokenStorage";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: import.meta.env.VITE_ENV === "production",
  headers: {
    "Content-Type": "application/json",
  },
});

// リクエスト：アクセストークン付与
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// レスポンス：401 → リフレッシュ → 再実行
apiClient.interceptors.response.use(
  (res) => res.data,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await refreshTokenApi();
        if (!newToken) throw new Error("Refresh token missing");

        setAccessToken(newToken);

        // retry original request
        const retry = error.config!;
        retry.headers.Authorization = `Bearer ${newToken}`;

        return apiClient.request(retry);
      } catch (err) {
        console.error("Token refresh failed", err);
      }
    }

    return Promise.reject(error);
  }
);
