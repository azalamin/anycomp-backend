import { RequestHandler } from "express";
import { createSpecialistSchema, updateSpecialistSchema } from "./specialist.schema";
import { specialistService } from "./specialists.service";

const createSpecialistHandler: RequestHandler = async (req, res) => {
	const data = createSpecialistSchema.parse(req.body);
	const specialist = await specialistService.createSpecialist(data);

	res.status(201).json({
		success: true,
		data: specialist,
	});
};

const getAllSpecialistsHandler: RequestHandler = async (req, res) => {
	const result = await specialistService.getAllSpecialists(req.query);

	res.json({
		success: true,
		...result,
	});
};

const getSingleSpecialistHandler: RequestHandler = async (req, res) => {
	const specialist = await specialistService.getSingleSpecialist(req.params.id as string);

	res.status(200).json({
		success: true,
		data: specialist,
	});
};

const publishSpecialistHandler: RequestHandler = async (req, res) => {
	const specialist = await specialistService.publishSpecialist(req.params.id as string);

	res.json({
		success: true,
		data: specialist,
	});
};

const updateSpecialistHandler: RequestHandler = async (req, res) => {
	const data = updateSpecialistSchema.parse(req.body);
	const specialist = await specialistService.updateSpecialist(req.params.id as string, data);

	res.json({
		success: true,
		data: specialist,
	});
};

const deleteSpecialistHandler: RequestHandler = async (req, res) => {
	await specialistService.deleteSpecialist(req.params.id as string);

	res.status(204).send();
};

export const specialistController = {
	createSpecialistHandler,
	getAllSpecialistsHandler,
	publishSpecialistHandler,
	updateSpecialistHandler,
	deleteSpecialistHandler,
	getSingleSpecialistHandler,
};
