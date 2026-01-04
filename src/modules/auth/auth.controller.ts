import { Request, Response } from "express";
import { loginSchema } from "./auth.schema";
import { authService } from "./auth.service";

const login = async (req: Request, res: Response) => {
	// Zod validation
	const { email, password } = loginSchema.parse(req.body);

	const result = await authService.login(email, password);

	res.status(200).json({
		success: true,
		message: "Login successful",
		data: result,
	});
};

export const authController = {
	login,
};
