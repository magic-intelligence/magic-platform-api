import { BaseSchema } from "src/adapters/persistence/shared/base.schema";
import { StudentFamilySchema } from "./student-family.schema";
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn, Entity as Schema } from "typeorm";

@Schema('emergency_contact')
export class EmergencyContactSchema extends BaseSchema{
    @PrimaryGeneratedColumn('increment', {name: 'emergency_contact_id', type: 'bigint'})
    emergencyContactId: string;
    @Column({name: 'student_family_id', type: 'bigint', nullable: false, unique:false})
    studentFamilyId: string;
    @Column({name: 'priority_level', type: 'int', unique: true})
    priorityLevel: number;
    
    @OneToOne(()=> StudentFamilySchema)
    @JoinColumn({name: 'student_family_id'})
    studentFamily?: StudentFamilySchema;
}