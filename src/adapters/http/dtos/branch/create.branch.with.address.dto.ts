import { IsInt, IsNotEmpty, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateBranchWithAddressDTO{
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    @IsPositive()
    postalCode: number;
    @IsString()
    @IsNotEmpty()
    street: string;
    @IsString()
    @IsNotEmpty()
    interiorNumber: string;
    @IsString()
    @IsNotEmpty()
    exteriorNumber: string;
    @IsString()
    @IsNotEmpty()
    district: string;
    @IsString()
    @IsNotEmpty()
    city: string;
    @IsString()
    @IsNotEmpty()
    state: string;
}