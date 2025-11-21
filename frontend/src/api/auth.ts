import { apiClient } from "./client";
import {
  setAccessToken,
  getRefreshToken,
  getAccessToken,
} from "../utils/tokenStorage";

// -------------------------
// refresh token
// -------------------------
export async function refreshTokenApi() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const res = await apiClient.post("/auth/refresh-tokens", {
    refreshToken: refreshToken,
  });

  const newToken = res.AccessToken;

  if (newToken) setAccessToken(newToken);

  return newToken;
}

// -------------------------
// signup
// -------------------------
export function signup(data: { email: string; password: string }) {
  return apiClient.post("/auth/signup", data);
}

// login
export async function login(data: { email: string; password: string }) {
  const res = await apiClient.post("/auth/login", data);
  const token = res.accessToken;
  if (token) setAccessToken(token);
  return res;
}

// logout
export function logout() {
  const accessToken = getAccessToken();
  return apiClient.post("/auth/logout", { accessToken: accessToken });
}

// delete user
export function deleteUser() {
  const accessToken = getAccessToken();
  return apiClient.post("/auth/delete", { accessToken: accessToken });
}

// update email
export function updateEmail(newEmail: string) {
  const accessToken = getAccessToken();
  return apiClient.post("/auth/update-email", {
    newEmail: newEmail,
    accessToken: accessToken,
  });
}

// confirm email change
export function confirmEmailChange(params: {
  newEmail: string;
  accessToken: string;
  code: string;
}) {
  return apiClient.get("/auth/email-change-confirm", { params });
}

// update password
export function updatePassword(previousPassword: string, newPassword: string) {
  return apiClient.post("/auth/update-password", {
    previousPassword,
    proposedPassword: newPassword,
  });
}
