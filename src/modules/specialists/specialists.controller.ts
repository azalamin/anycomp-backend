import { Request, Response } from "express";
import { createSpecialistSchema } from "./specialist.schema";
import { specialistService } from "./specialists.service";

const createSpecialistHandler = async (req: Request, res: Response) => {
	const data = createSpecialistSchema.parse(req.body);
	const specialist = await specialistService.createSpecialist(data);

	res.status(201).json({
		success: true,
		data: specialist,
	});
};

const getAllSpecialistsHandler = async (req: Request, res: Response) => {
	const [data, total] = await specialistService.getAllSpecialists(req.query);

	res.json({
		success: true,
		total,
		data,
	});
};

const publishSpecialistHandler = async (req: Request, res: Response) => {
	const specialist = await specialistService.publishSpecialist(req.params.id as string);

	res.json({
		success: true,
		data: specialist,
	});
};

export const specialistController = {
	createSpecialistHandler,
	getAllSpecialistsHandler,
	publishSpecialistHandler,
};
