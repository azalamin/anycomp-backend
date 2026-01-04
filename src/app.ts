import cors from "cors";
import express from "express";
import { authRouter } from "./modules/auth/auth.route";
import { specialistRouter } from "./modules/specialists/specialists.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/specialists", specialistRouter);
app.use("/api/auth", authRouter);

app.get("/health", (_req, res) => {
	res.json({ status: "OK", message: "Backend is running " });
});

export default app;
