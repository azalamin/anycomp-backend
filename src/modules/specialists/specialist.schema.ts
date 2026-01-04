import { z } from "zod";

export const createSpecialistSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z.string().min(10),
	base_price: z.number().positive(),

	media: z
		.array(
			z.object({
				url: z.string().url(),
				media_type: z.string(),
				display_order: z.number().int().nonnegative(),
			})
		)
		.optional(),

	service_offerings: z
		.array(
			z.object({
				name: z.string().min(2),
				description: z.string().min(5),
				price: z.number().positive(),
			})
		)
		.optional(),
});

export const updateSpecialistSchema = createSpecialistSchema.partial();
