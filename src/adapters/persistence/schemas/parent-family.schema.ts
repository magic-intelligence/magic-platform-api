import { BaseSchema } from "src/infraestructure/database/typeorm/base/base.schema";
import { Entity as Schema, JoinColumn, OneToMany, OneToOne, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RelationshipSchema } from "./relationship.schema";
import { StudentFamilySchema } from "./student-family.schema";
import { PersonGender } from "src/shared/value-object/person.gender";
import { BranchSchema } from "./branch.schema";
import { AddressSchema } from "./address.schema";

@Schema({name: 'parent_family'})
export class ParentFamilySchema extends BaseSchema{
    @PrimaryGeneratedColumn('increment', {name: 'parent_family_id', type: 'bigint'})
    parentFamilyId: string;
    @Column({name: 'relationship_id', type: 'bigint', nullable: false})
    relationshipId: string;
    @Column({name: 'branch_id', type: 'bigint', nullable: false})
    branchId: string;
    @Column({name: 'address_id', type: 'bigint', nullable: true})
    addressId?: string;
    @Column({name: 'name', nullable: false})
    name: string;
    @Column({name: 'paternal_surname', nullable: false})
    paternalSurname: string;
    @Column({name: 'maternal_surname', nullable: false})
    maternalSurname: string;
    @Column({name: 'birthday', type: 'timestamp', nullable: true})
    birthday?: Date;
    @Column({name: 'phone_number', type: 'varchar', length: 20, nullable: true, unique: true})
    phoneNumber?: string;
    @Column({name: 'gender', type: 'enum', enum: PersonGender, nullable: false})
    gender: PersonGender;

    @ManyToOne(()=> BranchSchema, (branch)=> branch.parentFamilies)
    @JoinColumn({name: 'branch_id'})
    branch?: BranchSchema;
    @OneToOne(()=> AddressSchema,{nullable: true})
    @JoinColumn({name: 'address_id'})
    address?: AddressSchema;
    @ManyToOne(()=> RelationshipSchema, (relationship)=> relationship.parentFamilies)
    @JoinColumn({name: 'relationship_id'})
    relationship?: RelationshipSchema;
    @OneToMany(()=> StudentFamilySchema, (studentFamily)=> studentFamily.parentFamily)
    studentFamilies?: StudentFamilySchema[];
}