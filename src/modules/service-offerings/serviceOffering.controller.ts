import { Request, Response } from "express";
import { createServiceOfferingSchema } from "./serviceOffering.schema";
import { serviceOfferingService } from "./serviceOffering.service";

const createServiceOfferingHandler = async (req: Request, res: Response) => {
	const data = createServiceOfferingSchema.parse(req.body);

	const serviceOffering = await serviceOfferingService.createServiceOffering(data);

	res.status(201).json({
		success: true,
		data: serviceOffering,
	});
};

const getServiceOfferingsBySpecialistHandler = async (req: Request, res: Response) => {
	const data = await serviceOfferingService.getServiceOfferingsBySpecialist(
		req.params.specialistId as string
	);

	res.json({
		success: true,
		data,
	});
};

const deleteServiceOfferingHandler = async (req: Request, res: Response) => {
	await serviceOfferingService.deleteServiceOffering(req.params.id as string);

	res.status(204).send();
};

export const serviceOfferingController = {
	createServiceOfferingHandler,
	getServiceOfferingsBySpecialistHandler,
	deleteServiceOfferingHandler,
};
