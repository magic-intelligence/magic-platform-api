import { Body, Controller, Post } from "@nestjs/common";
import { CreateBranchWithAddressDTO } from "../dtos/branch/create.branch.with.address.dto";
import { CreateNewBranchFacade } from "src/core/branch/application/facade/create.new.branch.facade";

@Controller('branches')
export class BranchController{
    constructor(
        private readonly createNewBranchFacade: CreateNewBranchFacade,
    ){}

    @Post()
    async saveBranchWithAddress(@Body() dto: CreateBranchWithAddressDTO){
        return await this.createNewBranchFacade.execute(dto);
    }
}