import { z } from "zod";

export const createPlatformFeeSchema = z.object({
	tier_name: z.string().min(1, "Tier name is required"),

	min_value: z.coerce.number().nonnegative("Minimum value must be a non-negative number"),

	max_value: z.coerce.number().positive("Maximum value must be a positive number"),

	platform_fee_percentage: z.coerce
		.number()
		.positive("Platform fee must be positive")
		.max(100, "Platform fee cannot exceed 100%"),
});
