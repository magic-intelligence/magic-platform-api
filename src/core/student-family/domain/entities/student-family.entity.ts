import { ParentFamilyEntity } from "src/core/parent-family/domain/entities/parent-family.entity";
import { StudentEntity } from "src/core/student/domain/entities/student.entity";
import { BaseEntity } from "src/core/shared/base.entity";

export class StudentFamilyEntity extends BaseEntity{
    studentFamilyId: string;
    studentId: string;
    parentFamilyId: string;
    student?: StudentEntity;
    parentFamily?: ParentFamilyEntity;
}