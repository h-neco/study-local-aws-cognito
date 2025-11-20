import { apiClient } from "./client";

// ユーザー一覧
export function getUserList() {
  return apiClient.get("/admin/users");
}

// ユーザー削除
export function adminDeleteUser(userId: string) {
  return apiClient.post("/admin/delete", { userId });
}

// 管理者に昇格
export function promoteToAdmin(userId: string) {
  return apiClient.post("/admin/promote", { userId });
}

// 管理者解除
export function demoteAdmin(userId: string) {
  return apiClient.post("/admin/demote", { userId });
}
