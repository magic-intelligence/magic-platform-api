import { Body, Controller, Post } from "@nestjs/common";
import { CreateBranchOfficeWithAddressDTO } from "../dtos/branch-office/create.branch-office.with.address.dto";
import { CreateNewBranchOfficeFacade } from "src/core/branch-office/application/facade/create.new.branch-office.facade";

@Controller('branch-offices')
export class BranchOfficeController{
    constructor(
        private readonly createNewBranchFacade: CreateNewBranchOfficeFacade,
    ){}

    @Post()
    async saveBranchWithAddress(@Body() dto: CreateBranchOfficeWithAddressDTO){
        return await this.createNewBranchFacade.execute(dto);
    }
}