import { AppDataSource } from "../../config/data-source";
import { ServiceOffering } from "../../entities/ServiceOffering";
import { Specialist } from "../../entities/Specialist";
import { AppError } from "../../utils/AppError";

const serviceOfferingRepo = AppDataSource.getRepository(ServiceOffering);
const specialistRepo = AppDataSource.getRepository(Specialist);

const createServiceOffering = async (payload: any) => {
	const specialist = await specialistRepo.findOne({
		where: { id: payload.specialistId },
	});

	if (!specialist) {
		throw new AppError("Specialist not found", 404);
	}

	const serviceOffering = serviceOfferingRepo.create({
		name: payload.name,
		description: payload.description,
		price: payload.price,
		specialist,
	});

	return serviceOfferingRepo.save(serviceOffering);
};

const getServiceOfferingsBySpecialist = async (specialistId: string) => {
	const specialist = await specialistRepo.findOne({
		where: { id: specialistId },
	});

	if (!specialist) {
		throw new AppError("Specialist not found", 404);
	}

	return serviceOfferingRepo.find({
		where: {
			specialist: { id: specialistId },
		},
	});
};

const deleteServiceOffering = async (id: string) => {
	const serviceOffering = await serviceOfferingRepo.findOne({
		where: { id },
	});

	if (!serviceOffering) {
		throw new AppError("Service offering not found", 404);
	}

	await serviceOfferingRepo.remove(serviceOffering);
};

export const serviceOfferingService = {
	createServiceOffering,
	getServiceOfferingsBySpecialist,
	deleteServiceOffering,
};
