import { AppDataSource } from "../../config/data-source";
import { Media } from "../../entities/Media";
import { Specialist } from "../../entities/Specialist";
import { AppError } from "../../utils/AppError";

const mediaRepo = AppDataSource.getRepository(Media);
const specialistRepo = AppDataSource.getRepository(Specialist);

const createMedia = async (payload: any) => {
	const specialist = await specialistRepo.findOne({
		where: { id: payload.specialistId },
	});

	if (!specialist) {
		throw new AppError("Specialist not found", 404);
	}

	const media = mediaRepo.create({
		url: payload.url,
		media_type: payload.media_type,
		display_order: payload.display_order,
		specialist,
	});

	return mediaRepo.save(media);
};

const getMediaBySpecialist = async (specialistId: string) => {
	return mediaRepo.find({
		where: {
			specialist: { id: specialistId },
		},
		order: {
			display_order: "ASC",
		},
	});
};

const deleteMedia = async (id: string) => {
	const media = await mediaRepo.findOne({ where: { id } });

	if (!media) {
		throw new AppError("Media not found", 404);
	}

	await mediaRepo.remove(media);
};

export const mediaService = {
	createMedia,
	getMediaBySpecialist,
	deleteMedia,
};
