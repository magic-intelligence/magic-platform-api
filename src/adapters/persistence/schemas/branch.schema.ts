import { BaseSchema } from "src/infraestructure/database/typeorm/base/base.schema";
import { Column, Entity as Schema, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressSchema } from "./address.schema";
import { ParentFamilySchema } from "./parent-family.schema";
import { StudentSchema } from "./student.schema";

@Schema({name: 'branch'})
export class BranchSchema extends BaseSchema{
    @PrimaryGeneratedColumn('increment', {name: 'branch_id', type: 'bigint'})
    branchId: string;
    @Column({name: 'address_id', type: 'bigint', nullable: false})
    addressId: string;
    @Column({name: 'name', nullable: false, unique: true})
    name: string;
    @OneToOne( ()=> AddressSchema )
    @JoinColumn({name: 'address_id'})
    address?: AddressSchema;

    @OneToMany(()=> ParentFamilySchema, (parentFamily)=> parentFamily.branch)
    parentFamilies?: ParentFamilySchema[];
    @OneToMany(()=> StudentSchema, (student)=> student.branch)
    students?: StudentSchema[];
}