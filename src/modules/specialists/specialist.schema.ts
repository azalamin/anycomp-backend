import { z } from "zod";

/**
 * ============================
 * Shared Sub Schemas
 * ============================
 */

const mediaSchema = z.object({
	url: z.string().url("Invalid media URL"),
	media_type: z.string().min(1, "Media type is required"),
	display_order: z.coerce.number().int().nonnegative("Display order must be a non-negative number"),
});

const serviceOfferingSchema = z.object({
	name: z.string().min(2, "Service name must be at least 2 characters"),
	description: z.string().min(5, "Description must be at least 5 characters"),
	price: z.coerce.number().positive("Price must be a positive number"),
});

/**
 * ============================
 * Create Specialist Schema
 * ============================
 */

export const createSpecialistSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z.string().min(10, "Description must be at least 10 characters"),

	base_price: z.coerce.number().positive("Base price must be a positive number"),

	media: z.array(mediaSchema).optional(),

	service_offerings: z.array(serviceOfferingSchema).optional(),
});

/**
 * ============================
 * Update Specialist Schema
 * (PATCH semantics)
 * ============================
 */

export const updateSpecialistSchema = createSpecialistSchema
	.partial()
	.refine(data => Object.keys(data).length > 0, {
		message: "At least one field is required to update",
	});
