import { AppDataSource } from "../../config/data-source";
import { PlatformFee } from "../../entities/PlatformFee";
import { AppError } from "../../utils/AppError";

const platformFeeRepo = AppDataSource.getRepository(PlatformFee);

const createPlatformFee = async (payload: any) => {
	const existing = await platformFeeRepo.findOne({
		where: {
			min_value: payload.min_value,
			max_value: payload.max_value,
		},
	});

	if (existing) {
		throw new AppError("Platform fee tier already exists", 409);
	}

	const platformFee = platformFeeRepo.create(payload);
	return platformFeeRepo.save(platformFee);
};

const getAllPlatformFees = async () => {
	return platformFeeRepo.find({
		order: { min_value: "ASC" },
	});
};

export const platformFeeService = {
	createPlatformFee,
	getAllPlatformFees,
};
