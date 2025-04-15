import { BaseSchema } from "src/core/shared/persistence/base.schema";
import { Column, OneToMany, PrimaryGeneratedColumn, Entity as Schema } from "typeorm";
import { BranchOfficeSchema } from "../../../../branch-office/adapters/persistence/schemas/branch-office.schema";

@Schema({name: 'educational_center'})
export class EducationalCenterSchema extends BaseSchema {
    @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'educational_center_id'})
    educationalCenterId?: bigint;
    @Column({name: 'name', type: 'varchar', unique: true})
    name: string;

    @OneToMany(()=> BranchOfficeSchema, (branchOfficeSchema)=> branchOfficeSchema.educationalCenter)
    branchOffices?: BranchOfficeSchema[];
}