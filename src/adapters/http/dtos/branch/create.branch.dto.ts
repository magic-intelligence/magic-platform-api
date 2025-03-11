import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateBranchDTO{
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d+$/, { message: 'addressId must be a positive integer' })
    addressId: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;
}