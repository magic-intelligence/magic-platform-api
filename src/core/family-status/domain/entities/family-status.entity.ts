import { StudentEntity } from "src/core/student/domain/entities/student.entity";
import { BaseEntity } from "src/core/shared/domain/base.entity";

export class FamilyStatusEntity extends BaseEntity{
    familyStatusId: string;
    name: string;
    description?: string;

    students?: StudentEntity[];
}