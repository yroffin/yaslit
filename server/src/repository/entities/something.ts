import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne } from "typeorm"
import { IsUUID, IsString } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType, ID } from '@nestjs/graphql';

@Entity("folder")
@ObjectType()
export class Folder {
    @Field(type => ID)
    @ApiProperty({ type: 'string' })
    @IsUUID()
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: string

    @Field()
    @ApiProperty({ type: 'string' })
    @IsString()
    @Column({ name: "name" })
    name?: string

    @Field(() => [Something], { defaultValue: [] })
    @ApiProperty({ type: () => Something, isArray: true })
    @OneToMany<Something>(() => Something, something => something.folder, { eager: true })
    somethings: Something[];
}

@Entity("something")
@ObjectType()
export class Something {
    @Field(type => ID)
    @ApiProperty({ type: 'string' })
    @IsUUID()
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: string

    @Field()
    @ApiProperty({ type: 'string' })
    @IsString()
    @Column({ name: "name" })
    name?: string

    // Folder
    @Field()
    @ApiProperty({ type: () => Folder })
    @ManyToOne<Folder>(() => Folder, folder => folder.somethings, { lazy: true })
    folder: Folder;

    @Field(() => [Tag], { defaultValue: [] })
    @ApiProperty({ type: () => Tag, isArray: true })
    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];
}

@Entity("tags")
@ObjectType()
export class Tag {
    @Field(type => ID)
    @ApiProperty({ type: 'string' })
    @IsUUID()
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id!: string

    @Field()
    @ApiProperty({ type: 'string' })
    @IsString()
    @Column({ name: "name" })
    name?: string

    @Field(() => [Something], { defaultValue: [] })
    @ApiProperty({ type: () => Something, isArray: true })
    @ManyToMany(type => Something)
    @JoinTable()
    somethings: Something[];
}
