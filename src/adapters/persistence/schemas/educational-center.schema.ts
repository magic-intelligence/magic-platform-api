import { BaseSchema } from "src/infraestructure/database/typeorm/base/base.schema";
import { Column, PrimaryGeneratedColumn, Entity as Schema } from "typeorm";

@Schema({name: 'educational_center'})
export class EducationalCenterSchema extends BaseSchema {
    @PrimaryGeneratedColumn('increment',{type: 'bigint', name: 'educational_center_id'})
    educationalCenterId?: bigint;
    @Column({name: 'name', type: 'varchar', unique: true})
    name: string;
}