import { CreateBranchDTO } from "src/adapters/http/dtos/branch/create.branch.dto";
import { CreateNewBranchUseCase } from "../use-cases/create.new.branch.use.case";
import { Inject } from "@nestjs/common";

export class BranchService{
    constructor(
        @Inject()
        private readonly createNewBranchUseCase: CreateNewBranchUseCase,
    ){}

    async saveNewBranch(dto: CreateBranchDTO){
        return this.createNewBranchUseCase.save(dto);
    }
}