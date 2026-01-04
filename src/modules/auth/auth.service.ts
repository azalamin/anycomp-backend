import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import config from "../../config";
import { AppError } from "../../utils/AppError";

const ADMIN = {
	email: "admin@anycomp.com",
	password: bcrypt.hashSync("admin123", 10),
};

const login = async (email: string, password: string) => {
	if (email !== ADMIN.email) {
		throw new AppError("Invalid credentials", 401);
	}

	const isMatch = await bcrypt.compare(password, ADMIN.password);
	if (!isMatch) {
		throw new AppError("Invalid credentials", 401);
	}

	const token = jwt.sign({ role: "admin", email }, config.jwt_secret, {
		expiresIn: config.jwt_expires_in,
	});

	return { token };
};

export const authService = {
	login,
};
