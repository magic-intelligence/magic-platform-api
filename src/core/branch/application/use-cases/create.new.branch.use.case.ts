import { Inject, Injectable } from "@nestjs/common";
import { BRANCH_REPOSITORY, BranchRepository } from "../../domain/repository/branch.repository";
import { BranchEntity } from "../../domain/entities/branch.entity";
import { CreateBranchDTO } from "src/adapters/http/dtos/branch/create.branch.dto";

@Injectable()
export class CreateNewBranchUseCase{
    constructor(
        @Inject(BRANCH_REPOSITORY)
        private readonly branchRepository: BranchRepository,
    ){}

    async save( dto: CreateBranchDTO){
        const entity = new BranchEntity();
        
        entity.name = dto.name;
        entity.addressId = dto.addressId;

        const branchEntity = await this.branchRepository.save( entity );
        return branchEntity; 
    }
}