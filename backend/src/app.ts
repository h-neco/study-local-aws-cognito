import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";
import adminRouter from "./routes/adminRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/admin", adminRouter);

export default app;
