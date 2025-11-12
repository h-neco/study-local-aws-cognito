import axios from "axios";

const api = axios.create({
  baseURL: "/api", // viteでproxyする
});

export const signup = (email: string, password: string) =>
  api.post("/auth/signup", { email, password });

export const login = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const logout = () => api.post("/auth/logout");

export const listUsers = () => api.get("/admin/users");

export const approveUser = (username: string) =>
  api.post(`/admin/approve/${username}`);
