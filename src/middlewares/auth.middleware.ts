import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { AppError } from "../utils/AppError";

const authMiddleware = () => {
	return async (req: Request, _res: Response, next: NextFunction) => {
		const authHeader = req.headers.authorization;
		const accessToken = authHeader?.split(" ")[1];

		if (!accessToken) {
			return next(new AppError("Unauthorized access", 401));
		}

		try {
			const decoded = jwt.verify(accessToken, config.jwt_secret as string) as JwtPayload & {
				role: "admin";
			};

			if (decoded.role !== "admin") {
				return next(new AppError("Forbidden access", 403));
			}

			req.user = decoded;
			next();
		} catch {
			return next(new AppError("Invalid or expired token", 401));
		}
	};
};

export default authMiddleware;
