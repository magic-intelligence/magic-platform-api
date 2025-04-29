import { BaseSchema } from "src/core/shared/persistence/base.schema";
import { Column, Entity as Schema, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { AddressSchema } from "../../../../address/adapters/persistence/schemas/address.schema";
import { EducationalCenterSchema } from "../../../../educational-center/adapters/persistence/schemas/educational-center.schema";

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
}