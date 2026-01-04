import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Specialist } from "./Specialist";

@Entity({ name: "service_offerings" })
export class ServiceOffering {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	name!: string;

	@Column("text")
	description!: string;

	@Column({ type: "decimal", precision: 10, scale: 2 })
	price!: number;

	@Index()
	@ManyToOne(() => Specialist, specialist => specialist.service_offerings, {
		onDelete: "CASCADE",
	})
	specialist!: Specialist;
}
