import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes";
import adminRouter from "./routes/adminRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (_, res) => res.send("Local AWS Backend is running!"));
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

export default app;
