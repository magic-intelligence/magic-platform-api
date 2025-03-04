import { IsNotEmpty, IsUUID } from "class-validator";
import { ParentFamilyEntity } from "src/core/parent-family/domain/entities/parent-family.entity";
import { StudentEntity } from "src/core/student/domain/entities/student.entity";

export class CreateStudentFamilyDTO{
    @IsNotEmpty()
    @IsUUID()
    parentFamilyId: string;
    @IsNotEmpty()
    @IsUUID()
    studentId: string;
}