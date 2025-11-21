// src/utils/tokenStorage.ts

const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";

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

// ---------- リフレッシュトークン ----------
export function getRefreshToken(): string | null {
  if (import.meta.env.VITE_ENV === "local") {
    return localStorage.getItem(REFRESH_KEY);
  } else {
    return (window as any).__REFRESH_TOKEN__ || null;
  }
}

export function setRefreshToken(token: string) {
  if (import.meta.env.VITE_ENV === "local") {
    localStorage.setItem(REFRESH_KEY, token);
  } else {
    (window as any).__REFRESH_TOKEN__ = token;
  }
}

export function removeRefreshToken() {
  if (import.meta.env.VITE_ENV === "local") {
    localStorage.removeItem(REFRESH_KEY);
  } else {
    (window as any).__REFRESH_TOKEN__ = null;
  }
}
