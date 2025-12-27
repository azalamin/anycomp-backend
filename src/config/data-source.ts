import "reflect-metadata";
import { DataSource } from "typeorm";
import config from ".";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: config.db_host,
	port: config.db_port,
	username: config.db_username,
	password: config.db_password,
	database: config.db_name,
	synchronize: true,
	logging: false,
	entities: [],
});
