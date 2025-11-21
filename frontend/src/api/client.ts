import axios, { AxiosError } from "axios";
import { getAccessToken, setAccessToken } from "../utils/tokenStorage";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
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

// レスポンス interceptor
apiClient.interceptors.response.use(
  (res) => res.data,
  async (error: AxiosError & { config?: any }) => {
    const originalRequest = error.config;

    // 401 かつまだリトライしていない場合
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // サーバーにリフレッシュリクエスト
        // httpOnly cookie は自動送信される
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-tokens`,
          {},
          { withCredentials: true }
        );
        const newToken = res.data;
        if (!newToken) throw new Error("Refresh failed");

        setAccessToken(newToken);

        // 元のリクエストを再実行
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient.request(originalRequest);
      } catch (err) {
        console.error("Token refresh failed", err);
      }
    }

    return Promise.reject(error);
  }
);
