import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
	port: process.env.PORT,
	db_host: process.env.DB_HOST,
	db_port: process.env.DB_PORT,
	db_username: process.env.DB_USERNAME,
	db_password: process.env.DB_PASSWORD,
	db_name: process.env.DB_NAME,
	jwt_secret: process.env.JWT_SECRET,
	jwt_expires_in: process.env.JWT_EXPIRES_IN,
};

export default config;
