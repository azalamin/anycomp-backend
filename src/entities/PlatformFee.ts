import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "platform_fee" })
@Index(["min_value", "max_value"])
export class PlatformFee {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	tier_name!: string;

	@Column({ type: "decimal", precision: 10, scale: 2 })
	min_value!: number;

	@Column({ type: "decimal", precision: 10, scale: 2 })
	max_value!: number;

	@Column({ type: "decimal", precision: 5, scale: 2 })
	platform_fee_percentage!: number;
}
