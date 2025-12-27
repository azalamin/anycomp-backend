import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const envSchema = z.object({
	PORT: z.string().default("5000"),
	DB_HOST: z.string(),
	DB_PORT: z.string(),
	DB_USERNAME: z.string(),
	DB_PASSWORD: z.string(),
	DB_NAME: z.string(),
	JWT_SECRET: z.string(),
	JWT_EXPIRES_IN: z.string(),
});

const env = envSchema.parse(process.env);

const config = {
	port: Number(env.PORT),
	db_host: env.DB_HOST,
	db_port: Number(env.DB_PORT),
	db_username: env.DB_USERNAME,
	db_password: env.DB_PASSWORD,
	db_name: env.DB_NAME,
	jwt_secret: env.JWT_SECRET,
	jwt_expires_in: env.JWT_EXPIRES_IN,
};

export default config;
