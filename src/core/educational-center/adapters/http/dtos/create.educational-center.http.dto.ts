import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateEducationalCenterHttpDTO{
    @MinLength(2)
    @IsNotEmpty()
    @IsString()
    name: string;
}