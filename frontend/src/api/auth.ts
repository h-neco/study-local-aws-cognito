import { apiClient } from "./client";

// サインアップ
export function signup(data: { email: string; password: string }) {
  return apiClient.post("/auth/signup", data);
}

// ログイン
export function login(data: { email: string; password: string }) {
  return apiClient.post("/auth/login", data);
}

// ログアウト
export function logout() {
  return apiClient.post("/auth/logout");
}

// ユーザー削除
export function deleteUser() {
  return apiClient.post("/auth/delete");
}

// メール変更要求（確認メール送信）
export function updateEmail(newEmail: string) {
  const accessToken = localStorage.getItem("accessToken");

  return apiClient.post("/auth/update-email", {
    newEmail,
    accessToken,
  });
}

// メール変更確認
export function confirmEmailChange(params: {
  newEmail: string;
  accessToken: string;
  code: string;
}) {
  return apiClient.get("/auth/email-change-confirm", {
    params,
  });
}

// パスワード変更
export function updatePassword(previousPassword: string, newPassword: string) {
  return apiClient.post("/auth/update-password", {
    previousPassword,
    proposedPassword: newPassword,
  });
}
