import { AppDataSource } from "../config/data-source";
import { PlatformFee } from "../entities/PlatformFee";

const seedPlatformFee = async () => {
	const repo = AppDataSource.getRepository(PlatformFee);

	const exists = await repo.findOne({
		where: { tier_name: "default" },
	});

	if (exists) {
		console.log("Platform fee already exists");
		return;
	}

	const platformFee = repo.create({
		tier_name: "default",
		min_value: 0,
		max_value: 1_000_000,
		platform_fee_percentage: 10,
	});

	await repo.save(platformFee);
	console.log("Default platform fee seeded");
};

const seedAdmin = async () => {
	/**
	 * NOTE:
	 * This project uses a hardcoded admin login
	 * so we just log credentials here for clarity.
	 * No DB insert needed.
	 */

	console.log("Admin credentials ready");
	console.log("Email: admin@anycomp.com");
	console.log("Password: admin123");
};

const runSeed = async () => {
	try {
		await AppDataSource.initialize();
		console.log("Database connected");

		await seedPlatformFee();
		await seedAdmin();

		console.log("Seeding completed");
		process.exit(0);
	} catch (error) {
		console.error("Seeding failed", error);
		process.exit(1);
	}
};

runSeed();
