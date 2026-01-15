import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	Index,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Media } from "./Media";
import { ServiceOffering } from "./ServiceOffering";

@Entity({ name: "specialists" })
export class Specialist {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column()
	title!: string;

	@Index(["slug"], { unique: true })
	@Column({ nullable: false })
	slug!: string;

	@Column("text")
	description!: string;

	@Column({ type: "decimal", precision: 10, scale: 2 })
	base_price!: number;

	@Column({ type: "decimal", precision: 10, scale: 2 })
	platform_fee!: number;

	@Column({ type: "decimal", precision: 10, scale: 2 })
	final_price!: number;

	@Column({ default: true })
	is_draft!: boolean;

	@OneToMany(() => Media, media => media.specialist, {
		cascade: true,
	})
	media!: Media[];

	@OneToMany(() => ServiceOffering, service => service.specialist, {
		cascade: true,
	})
	service_offerings!: ServiceOffering[];

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@DeleteDateColumn()
	deleted_at!: Date;
}
