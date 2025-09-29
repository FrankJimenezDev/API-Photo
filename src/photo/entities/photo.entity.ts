import { IsBoolean, IsOptional, IsString, MaxLength } from "class-validator";
import { IPhoto } from "src/interfaces/photo.interface";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Photo implements IPhoto {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @IsString()
    @Column()
    coudinaryPublicId: string;

    @IsString()
    @Column()
    url: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    @Column({ nullable: true })
    title?: string;

    @IsString()
    @IsOptional()
    @MaxLength(255)
    @Column({ nullable: true })
    description?: string;

    @IsBoolean()
    @IsOptional()
    @Column({ default: false })
    isDeleted?: boolean;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
