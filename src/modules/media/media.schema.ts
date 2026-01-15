import { z } from "zod";

export const createMediaSchema = z.object({
	specialistId: z.string().uuid("Invalid specialist id"),

	url: z.string().url("Invalid media URL"),

	media_type: z.string().min(1, "Media type is required"),

	display_order: z.coerce.number().int().nonnegative("Display order must be a non-negative number"),
});
