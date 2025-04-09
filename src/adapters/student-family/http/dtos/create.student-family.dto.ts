import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateStudentFamilyDTO{
    @IsNotEmpty()
    @IsString()
    @Matches(/^\d+$/, { message: 'parentFamilyId must be a positive integer' })
    parentFamilyId: string;
    @IsNotEmpty()
    @IsString()
    @Matches(/^\d+$/, { message: 'studentId must be a positive integer' })
    studentId: string;
}