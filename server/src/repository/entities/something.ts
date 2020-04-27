import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { IsUUID, IsString } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType, ID } from '@nestjs/graphql';

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
}
