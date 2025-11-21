import { createContext, useContext, useEffect, useState } from "react";
import { refreshTokenApi } from "../api/auth";

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
});

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // アプリ起動時に localStorage から復元（ローカル環境のみ）
  useEffect(() => {
    if (import.meta.env.VITE_ENV === "local") {
      const token = localStorage.getItem("accessToken");
      if (token) setAccessToken(token);
    }
  }, []);

  // 定期的なリフレッシュ（任意）
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const newToken = await refreshTokenApi();
        if (newToken) setAccessToken(newToken);
      } catch (_) {
        console.warn("Auto refresh failed");
      }
    }, 5 * 60 * 1000); // 5分ごと

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
