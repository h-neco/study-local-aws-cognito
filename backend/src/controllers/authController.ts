import { Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import {
  signupCognitoUser,
  loginCognitoUser,
  logoutCognitoUser,
  deleteCognitoUser as deleteCognitoUserAuth,
} from "../services/cognitoService";
import { saveLog } from "../services/dynamoService";

/**
 * サインアップ
 */
export const signup = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await signupCognitoUser(email, password);
    // TODO dynamodb service uuidでエラー
    //await saveLog(email, "signup", { userSub: result.UserSub });
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
};

/**
 * ログイン
 */
export const login = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginCognitoUser(email, password);
    //await saveLog(email, "login", { userSub: (result as any).UserSub });
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
};

/**
 * ログアウト
 */
export const logout = async (req: AuthRequest, res: Response) => {
  const { accessToken } = req.body;

  try {
    const result = await logoutCognitoUser(accessToken);
    //const userId = req.user?.userId ?? "unknown";
    //await saveLog(userId, "logout");
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
};

/**
 * 退会
 */
export const deleteUser = async (req: AuthRequest, res: Response) => {
  const { email } = req.body;

  try {
    const result = await deleteCognitoUserAuth(email);
    const userId = req.user?.userId ?? "unknown";
    //await saveLog(userId, "delete");
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
};
