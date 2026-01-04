import { AppDataSource } from "../../config/data-source";
import { Media } from "../../entities/Media";
import { PlatformFee } from "../../entities/PlatformFee";
import { ServiceOffering } from "../../entities/ServiceOffering";
import { Specialist } from "../../entities/Specialist";
import { AppError } from "../../utils/AppError";

const specialistRepo = AppDataSource.getRepository(Specialist);
const platformFeeRepo = AppDataSource.getRepository(PlatformFee);

const createSpecialist = async (payload: any) => {
	const platformFee = await platformFeeRepo.findOne({
		where: {
			min_value: 0,
		},
		order: { min_value: "ASC" },
	});

	if (!platformFee) {
		throw new AppError("Platform fee configuration missing", 500);
	}

	const platformFeeAmount =
		(payload.base_price * Number(platformFee.platform_fee_percentage)) / 100;

	const specialist = specialistRepo.create({
		title: payload.title,
		description: payload.description,
		base_price: payload.base_price,
		platform_fee: platformFeeAmount,
		final_price: payload.base_price + platformFeeAmount,
		is_draft: true,
		media: payload.media?.map((m: any) => Object.assign(new Media(), m)),
		service_offerings: payload.service_offerings?.map((s: any) =>
			Object.assign(new ServiceOffering(), s)
		),
	});

	return await specialistRepo.save(specialist);
};

const getAllSpecialists = async (query: any) => {
	const { status, search, page = 1, limit = 10 } = query;

	const qb = specialistRepo.createQueryBuilder("specialist");

	if (status === "draft") qb.andWhere("specialist.is_draft = true");
	if (status === "published") qb.andWhere("specialist.is_draft = false");

	if (search) {
		qb.andWhere("specialist.title ILIKE :search", {
			search: `%${search}%`,
		});
	}

	qb.skip((page - 1) * limit).take(limit);

	return qb.getManyAndCount();
};

const publishSpecialist = async (id: string) => {
	const specialist = await specialistRepo.findOne({ where: { id } });

	if (!specialist) {
		throw new AppError("Specialist not found", 404);
	}

	specialist.is_draft = false;
	return specialistRepo.save(specialist);
};

export const specialistService = {
	createSpecialist,
	getAllSpecialists,
	publishSpecialist,
};
