import { BaseEntity } from "../../../../../src/shared/types/entities/base.entity";
import { FamilyStatusEntity } from "../../../family-status/domain/entities/family-status.entity";
import { PersonEntity } from "../../../person/domain/entities/person.entity";
import { StudentFamilyEntity } from "../../../student-family/domain/entities/student-family.entity";

export class StudentEntity extends BaseEntity{
    familyStatusId: string;
    personId: string;
    nickname?: string;
    graceMinutes?: number;
    enrollmentMount?: number;
    enrollmentDueDate?: Date;
    monthlyMount?: number;
    monthlyDueDate?: Date;
    materialMount?: number;
    materialDueDate?: Date;
    entryTime: string;
    exitTime: string;
    brothersNumber: number;
    allergyDescription?: string;
    
    familyStatus: FamilyStatusEntity;
    person: PersonEntity;
    studentFamilies?: StudentFamilyEntity[];
}