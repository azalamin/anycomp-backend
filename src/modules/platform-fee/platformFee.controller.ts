import { Request, Response } from "express";
import { createPlatformFeeSchema } from "./platformFee.schema";
import { platformFeeService } from "./platformFee.service";

const createPlatformFeeHandler = async (req: Request, res: Response) => {
	const data = createPlatformFeeSchema.parse(req.body);

	const platformFee = await platformFeeService.createPlatformFee(data);

	res.status(201).json({
		success: true,
		data: platformFee,
	});
};

const getAllPlatformFeesHandler = async (_req: Request, res: Response) => {
	const data = await platformFeeService.getAllPlatformFees();

	res.json({
		success: true,
		data,
	});
};

export const platformFeeController = {
	createPlatformFeeHandler,
	getAllPlatformFeesHandler,
};
