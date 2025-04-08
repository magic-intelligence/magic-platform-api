import { BaseSchema } from "src/adapters/persistence/shared/base.schema";
import { Column, Entity as Schema, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { AddressSchema } from "./address.schema";
import { ParentFamilySchema } from "./parent-family.schema";
import { StudentSchema } from "./student.schema";
import { EducationalCenterSchema } from "../../educational-center/persistence/schemas/educational-center.schema";

@Schema({name: 'branch_office'})
export class BranchOfficeSchema extends BaseSchema{
    @PrimaryGeneratedColumn('increment', {name: 'branch_office_id', type: 'bigint'})
    branchOfficeId?: bigint;
    @Column({name: 'address_id', type: 'bigint', nullable: false})
    addressId: bigint;
    @Column({name: 'educational_center_id', type: 'bigint', nullable: false})
    educationalCenterId: bigint;
    @Column({name: 'name', nullable: false, unique: true})
    name: string;

    @OneToOne( ()=> AddressSchema )
    @JoinColumn({name: 'address_id'})
    address?: AddressSchema;

    @ManyToOne( ()=> EducationalCenterSchema, (educationalCenter)=> educationalCenter.branchOffices )
    @JoinColumn({name: 'educational_center_id'})
    educationalCenter?: EducationalCenterSchema;

    @OneToMany(()=> ParentFamilySchema, (parentFamily)=> parentFamily.branchOffice)
    parentFamilies?: ParentFamilySchema[];
    
    @OneToMany(()=> StudentSchema, (student)=> student.branch)
    students?: StudentSchema[];
}