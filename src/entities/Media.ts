import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Specialist } from "./Specialist";

@Entity({ name: "media" })
@Index(["specialist"])
export class Media {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	url!: string;

	@Column()
	media_type!: string;

	@Column()
	display_order!: number;

	@ManyToOne(() => Specialist, specialist => specialist.media, {
		onDelete: "CASCADE",
	})
	specialist!: Specialist;
}
