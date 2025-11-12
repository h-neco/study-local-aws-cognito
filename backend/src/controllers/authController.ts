import { Request, Response } from "express";
import {
  signupCognitoUser,
  loginCognitoUser,
  logoutCognitoUser,
  deleteCognitoUser as deleteCognitoUserAuth,
} from "../utils/cognitoService";

// サインアップ
export async function signup(req: Request, res: Response) {
  const { username, password, email } = req.body;
  try {
    const result = await signupCognitoUser(username, password, email);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// ログイン
export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const result = await loginCognitoUser(username, password);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}

// ログアウト
export async function logout(req: Request, res: Response) {
  const { accessToken } = req.body;
  try {
    await logoutCognitoUser(accessToken);
    res.json({ message: "Logged out" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// ユーザー退会
export async function deleteUser(req: Request, res: Response) {
  const { username } = req.params;
  try {
    await deleteCognitoUserAuth(username);
    res.json({ message: "User deleted" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
