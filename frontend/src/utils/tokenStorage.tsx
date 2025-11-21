// src/utils/tokenStorage.ts

const ACCESS_KEY = "accessToken";

// ---------- アクセストークン ----------
export function getAccessToken(): string | null {
  if (import.meta.env.VITE_ENV === "local") {
    return localStorage.getItem(ACCESS_KEY);
  } else {
    return (window as any).__ACCESS_TOKEN__ || null;
  }
}

export function setAccessToken(token: string) {
  if (import.meta.env.VITE_ENV === "local") {
    localStorage.setItem(ACCESS_KEY, token);
  } else {
    (window as any).__ACCESS_TOKEN__ = token;
  }
}

export function removeAccessToken() {
  if (import.meta.env.VITE_ENV === "local") {
    localStorage.removeItem(ACCESS_KEY);
  } else {
    (window as any).__ACCESS_TOKEN__ = null;
  }
}
