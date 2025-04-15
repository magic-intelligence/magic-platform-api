import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";
import { BaseEntity } from "../../../shared/domain/base.entity";
import { FamilyStatusEntity } from "../../../family-status/domain/entities/family-status.entity";
import { StudentFamilyEntity } from "../../../student-family/domain/entities/student-family.entity";
import { PersonGender } from "src/shared/value-object/person.gender";

export class StudentEntity extends BaseEntity{
    studentId: string;
    familyStatusId: string;
    branchId: string;
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    nickname?: string;
    birthday?: Date;
    phoneNumber?: string;
    gender: PersonGender;
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
    
    branch: BranchOfficeEntity;
    familyStatus: FamilyStatusEntity;
    studentFamilies?: StudentFamilyEntity[];
}