import { IsInt, IsNotEmpty, IsPositive, IsString, IsUUID, Matches } from "class-validator";

export class CreateEmergencyContactDTO{
    @IsNotEmpty()
    @IsString()
    @Matches(/^\d+$/, { message: 'studentFamilyId must be a positive integer' })
    studentFamilyId: string;
    @IsPositive()
    @IsInt()
    priorityLevel: number;
}