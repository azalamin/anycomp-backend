import { AppDataSource } from "../../config/data-source";
import { Media } from "../../entities/Media";
import { PlatformFee } from "../../entities/PlatformFee";
import { ServiceOffering } from "../../entities/ServiceOffering";
import { Specialist } from "../../entities/Specialist";
import { AppError } from "../../utils/AppError";
import { slugify } from "../../utils/slugify";

const specialistRepo = AppDataSource.getRepository(Specialist);
const platformFeeRepo = AppDataSource.getRepository(PlatformFee);

const generateUniqueSlug = async (title: string, id?: string) => {
	const baseSlug = slugify(title);
	let slug = baseSlug;
	let count = 1;

	while (true) {
		const existing = await specialistRepo.findOne({
			where: { slug },
		});

		// If creating → no id yet
		// If updating → allow same record
		if (!existing || (id && existing.id === id)) {
			break;
		}

		slug = `${baseSlug}-${count}`;
		count++;
	}

	return slug;
};

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

	const slug = await generateUniqueSlug(payload.title);

	const specialist = specialistRepo.create({
		title: payload.title,
		slug,
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
	const { status, search, page = 1, limit = 10, sortBy = "created_at", order = "desc" } = query;

	const qb = specialistRepo.createQueryBuilder("specialist");

	// Soft delete protection
	qb.where("specialist.deleted_at IS NULL");

	// Draft / Published filter
	if (status === "draft") qb.andWhere("specialist.is_draft = true");
	if (status === "published") qb.andWhere("specialist.is_draft = false");

	// Search
	if (search) {
		qb.andWhere("specialist.title ILIKE :search", {
			search: `%${search}%`,
		});
	}

	// SORTING
	const allowedSortFields = ["created_at", "final_price", "base_price"] as const;

	const sortField = allowedSortFields.includes(sortBy) ? sortBy : "created_at";

	const sortOrder = order?.toUpperCase() === "ASC" ? "ASC" : "DESC";

	qb.orderBy(`specialist.${sortField}`, sortOrder);

	// Pagination
	const [data, total] = await qb
		.skip((Number(page) - 1) * Number(limit))
		.take(Number(limit))
		.getManyAndCount();

	const totalPages = Math.ceil(total / Number(limit));

	return {
		data,
		meta: {
			total,
			page: Number(page),
			limit: Number(limit),
			totalPages,
			sortBy: sortField,
			order: sortOrder,
		},
	};
};

const getSingleSpecialist = async (id: string) => {
	const specialist = await specialistRepo.findOne({
		where: { id },
		relations: ["media", "service_offerings"],
		order: {
			media: {
				display_order: "ASC",
			},
		},
	});

	if (!specialist) {
		throw new AppError("Specialist not found", 404);
	}

	return specialist;
};

const publishSpecialist = async (id: string) => {
	const specialist = await specialistRepo.findOne({ where: { id } });

	if (!specialist) {
		throw new AppError("Specialist not found", 404);
	}

	specialist.is_draft = false;
	return specialistRepo.save(specialist);
};

const updateSpecialist = async (id: string, payload: any) => {
	const specialist = await specialistRepo.findOne({
		where: { id },
		relations: ["media", "service_offerings"],
	});

	if (!specialist) {
		throw new AppError("Specialist not found", 404);
	}

	// Update scalar fields
	Object.assign(specialist, payload);

	// Replace media if provided
	if (payload.media) {
		specialist.media = payload.media.map((m: any) => Object.assign(new Media(), m));
	}

	// Replace services if provided
	if (payload.service_offerings) {
		specialist.service_offerings = payload.service_offerings.map((s: any) =>
			Object.assign(new ServiceOffering(), s)
		);
	}

	return specialistRepo.save(specialist);
};

const deleteSpecialist = async (id: string) => {
	const specialist = await specialistRepo.findOne({ where: { id } });

	if (!specialist) {
		throw new AppError("Specialist not found", 404);
	}

	await specialistRepo.softDelete(id);
};

export const specialistService = {
	createSpecialist,
	getAllSpecialists,
	publishSpecialist,
	updateSpecialist,
	deleteSpecialist,
	getSingleSpecialist,
};
