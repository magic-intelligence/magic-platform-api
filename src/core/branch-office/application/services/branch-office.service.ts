import { CreateBranchOfficeDTO } from "src/adapters/http/dtos/branch-office/create.branch-office.dto";
import { CreateNewBranchOfficeUseCase } from "../use-cases/create.new.branch-office.use.case";
import { Inject } from "@nestjs/common";

export class BranchOfficeService{
    constructor(
        @Inject()
        private readonly createNewBranchOfficeUseCase: CreateNewBranchOfficeUseCase,
    ){}

    async saveNewBranch(dto: CreateBranchOfficeDTO){
        return this.createNewBranchOfficeUseCase.save(dto);
    }
}