import { Inject, Injectable } from "@nestjs/common";
import { BRANCH_OFFICE_REPOSITORY, BranchOfficeRepository } from "../../domain/repository/branch-office.repository";
import { BranchOfficeEntity } from "../../domain/entities/branch-office.entity";import { CreateBranchOfficeDTO } from "src/adapters/branch-office/http/dtos/create.branch-office.dto";

@Injectable()
export class CreateNewBranchOfficeUseCase{
    constructor(
        @Inject(BRANCH_OFFICE_REPOSITORY)
        private readonly branchOfficeRepository: BranchOfficeRepository,
    ){}

    async save( entity: BranchOfficeEntity){
        const branchEntity = await this.branchOfficeRepository.save( entity );
        return branchEntity; 
    }
}