import { Request, Response } from "express";
import { createMediaSchema } from "./media.schema";
import { mediaService } from "./media.service";

const createMediaHandler = async (req: Request, res: Response) => {
	const data = createMediaSchema.parse(req.body);

	const media = await mediaService.createMedia(data);

	res.status(201).json({
		success: true,
		data: media,
	});
};

const getMediaBySpecialistHandler = async (req: Request, res: Response) => {
	const data = await mediaService.getMediaBySpecialist(req.params.specialistId as string);

	res.json({
		success: true,
		data,
	});
};

const deleteMediaHandler = async (req: Request, res: Response) => {
	await mediaService.deleteMedia(req.params.id as string);

	res.status(204).send();
};

export const mediaController = {
	createMediaHandler,
	getMediaBySpecialistHandler,
	deleteMediaHandler,
};
