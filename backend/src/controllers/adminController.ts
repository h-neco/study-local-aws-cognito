import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import {
  listCognitoUsers,
  approveCognitoUser,
  deleteCognitoUser,
} from "../services/cognitoService";
import { saveLog } from "../services/dynamoService";

/**
 * ユーザー一覧取得
 */
export const getUserList = async (req: AuthRequest, res: Response) => {
  try {
    const users = await listCognitoUsers();
    res.json(users);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
};

/**
 * ユーザー削除
 */
export const deleteUser = async (req: AuthRequest, res: Response) => {
  const { email } = req.body;
  const actionUserEmail = req.user?.email;

  try {
    const result = await deleteCognitoUser(email);
    await saveLog(actionUserEmail ? actionUserEmail : "unknown", "delete", {
      targetEmail: email,
    });
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
};
