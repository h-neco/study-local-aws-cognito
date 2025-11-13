import { Request, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import {
  signupCognitoUser,
  loginCognitoUser,
  logoutCognitoUser,
  deleteCognitoUser as deleteCognitoUserAuth,
  confirmCognitoUser,
  approveCognitoUser,
} from "../services/cognitoService";
import { saveLog } from "../services/dynamoService";
import { sendMail } from "../services/mailService";
import { env } from "../config/env";

/**
 * サインアップ
 */
export const signup = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    if (env.TARGET_ENV === "local") {
      // 📩 確認リンクを生成
      const confirmLink = `http://localhost:5001/auth/confirm?email=${encodeURIComponent(
        email
      )}&code=999999`; // ローカル用のコード

      // 📤 確認メール送信
      await sendMail(
        email,
        "【ご確認ください】アカウントの有効化",
        `<p>以下のリンクをクリックして登録を完了してください。</p>
           <a href="${confirmLink}">${confirmLink}</a>`
      );
      console.log(`確認メールを送信しました: ${confirmLink}`);
    }
    const result = await signupCognitoUser(email, password);
    await saveLog(email, "signup");
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Unknown error" });
  }
};

/**
 * 確認 (GET /auth/confirm?email=xxx&code=yyy)
 */
export const confirmSignup = async (req: Request, res: Response) => {
  const email = req.query.email as string | undefined;
  const code = req.query.code as string | undefined;

  if (!email || !code) {
    return res.status(400).json({ error: "email and code are required" });
  }

  try {
    if (env.TARGET_ENV === "local") {
      // ローカルでもCognito上でCONFIRMEDにする
      await approveCognitoUser(email);
    } else {
      // 本番はCognitoの確認コードで承認
      await confirmCognitoUser(email, code);
    }

    await saveLog(email, "approve");
    res.send("アカウントが有効化されました。ログイン可能です。");
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to confirm" });
  }
};

/**
 * ログイン
 */
export const login = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginCognitoUser(email, password);
    await saveLog(email, "login");
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
  const { email, accessToken } = req.body;

  try {
    const result = await logoutCognitoUser(accessToken);
    await saveLog(email, "logout");
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
    await saveLog(email, "delete");
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(400).json({ error: message });
  }
};
