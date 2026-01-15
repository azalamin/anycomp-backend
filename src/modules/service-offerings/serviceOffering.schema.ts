import { z } from "zod";

export const createServiceOfferingSchema = z.object({
	specialistId: z.string().uuid("Invalid specialist id"),

	name: z.string().min(2, "Service name must be at least 2 characters"),

	description: z.string().min(5, "Description must be at least 5 characters"),

	price: z.coerce.number().positive("Price must be a positive number"),
});
