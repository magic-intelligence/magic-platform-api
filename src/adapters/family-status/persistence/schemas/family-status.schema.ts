import { BaseSchema } from "src/adapters/shared/base.schema";
import { Column, OneToMany, PrimaryGeneratedColumn, Entity as Schema} from "typeorm";
import { StudentSchema } from "../../../student/persistence/schemas/student.schema";

@Schema('family_status')
export class FamilyStatusSchema extends BaseSchema{
    @PrimaryGeneratedColumn('increment', {name: 'family_status_id', type: 'bigint'})
    familyStatusId: string;
    @Column({name: 'name', nullable: false})
    name: string;
    @Column({name: 'description', nullable: true})
    description?: string;

    @OneToMany(()=> StudentSchema, (student)=> student.familyStatus )
    students?: StudentSchema[];
}