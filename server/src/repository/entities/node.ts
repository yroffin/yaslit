import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne, OneToOne } from "typeorm"
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

    @Field(() => [Node], { defaultValue: [] })
    @ApiProperty({ type: () => Node, isArray: true })
    @OneToMany<Node>(() => Node, node => node.folder, { eager: true })
    nodes: Node[];
}

@Entity("node")
@ObjectType()
export class Node {
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
    @ManyToOne<Folder>(() => Folder, folder => folder.nodes, { lazy: true })
    folder: Folder;

    @Field(() => [Tag], { defaultValue: [] })
    @ApiProperty({ type: () => Tag, isArray: true })
    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];
}

@Entity("edge")
@ObjectType()
export class Edge {
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

    // Source
    @Field()
    @ApiProperty({ type: () => Node })
    @OneToOne<Node>(() => Node)
    source: Node;

    // Target
    @Field()
    @ApiProperty({ type: () => Node })
    @OneToOne<Node>(() => Node)
    target: Node;

    // Folder
    @Field()
    @ApiProperty({ type: () => Folder })
    @ManyToOne<Folder>(() => Folder, folder => folder.nodes, { lazy: true })
    folder: Folder;

    // Tag
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

    @Field(() => [Node], { defaultValue: [] })
    @ApiProperty({ type: () => Node, isArray: true })
    @ManyToMany(type => Node)
    @JoinTable()
    nodes: Node[];
}