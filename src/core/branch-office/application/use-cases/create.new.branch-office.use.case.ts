import { Inject, Injectable } from "@nestjs/common";
import { BRANCH_OFFICE_REPOSITORY, BranchOfficeRepository } from "../../domain/repository/branch-office.repository";
import { BranchOfficeEntity } from "../../domain/entities/branch-office.entity";
import { CreateBranchOfficeDTO } from "src/adapters/http/dtos/branch-office/create.branch-office.dto";

@Injectable()
export class CreateNewBranchOfficeUseCase{
    constructor(
        @Inject(BRANCH_OFFICE_REPOSITORY)
        private readonly branchOfficeRepository: BranchOfficeRepository,
    ){}

    async save( dto: CreateBranchOfficeDTO){
        const entity = new BranchOfficeEntity();
        
        entity.name = dto.name;
        entity.addressId = dto.addressId;
        entity.educationalCenterId = dto.educationalCenterId;

        const branchEntity = await this.branchOfficeRepository.save( entity );
        return branchEntity; 
    }
}