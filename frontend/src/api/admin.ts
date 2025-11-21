import { apiClient } from "./client";

// ユーザー一覧
export function getUserList() {
  return apiClient.get("/admin/users");
}

// ユーザー削除
export function adminDeleteUser(email: string) {
  return apiClient.post("/admin/delete", { email });
}

// 管理者に昇格
export function promoteToAdmin(email: string) {
  return apiClient.post("/admin/promote", { email });
}

// 管理者解除
export function demoteAdmin(email: string) {
  return apiClient.post("/admin/demote", { email });
}
