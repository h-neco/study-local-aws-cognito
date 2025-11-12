import { Request, Response } from "express";
import {
  listCognitoUsers,
  approveCognitoUser,
  deleteCognitoUser as deleteCognitoUserAdmin,
} from "../utils/cognitoService";

// ユーザー一覧
export async function listUsers(req: Request, res: Response) {
  try {
    const users = await listCognitoUsers();
    res.json(users);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// ユーザー承認
export async function approveUser(req: Request, res: Response) {
  const { username } = req.params;
  try {
    const result = await approveCognitoUser(username);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

// ユーザー削除
export async function deleteUser(req: Request, res: Response) {
  const { username } = req.params;
  try {
    await deleteCognitoUserAdmin(username);
    res.json({ message: "User deleted" });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
