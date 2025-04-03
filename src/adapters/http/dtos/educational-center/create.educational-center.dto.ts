import { IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export class CreateEducationalCenterDTO{
    @MinLength(2)
    @IsNotEmpty()
    @IsString()
    name: string;
}