import { Body, Controller, Post } from "@nestjs/common";
import { CreateBranchOfficeWithAddressDTO } from "../dtos/create.branch-office.with.address.dto";

@Controller('branch-offices')
export class BranchOfficeController{
    constructor(
    ){}

    @Post()
    async saveBranchWithAddress(@Body() dto: CreateBranchOfficeWithAddressDTO){
        return dto;
    }
}