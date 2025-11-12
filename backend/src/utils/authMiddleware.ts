import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    isAdmin: boolean;
  };
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const payload: any = jwt.decode(token); // Cognito の JWT をデコード
    req.user = {
      userId: payload.sub,
      email: payload.email,
      isAdmin: payload["custom:role"] === "admin",
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
