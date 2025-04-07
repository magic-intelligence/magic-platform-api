import { CreateBranchOfficeDTO } from "src/adapters/http/dtos/branch-office/create.branch-office.dto";
import { CreateNewBranchOfficeUseCase } from "../use-cases/create.new.branch-office.use.case";
import { BadRequestException, Inject } from "@nestjs/common";
import { BranchOfficeEntity } from "../../domain/entities/branch-office.entity";
import { validate } from "class-validator";

export class BranchOfficeService{
    constructor(
        @Inject()
        private readonly createNewBranchOfficeUseCase: CreateNewBranchOfficeUseCase,
    ){}

    async saveNewBranch(dto: CreateBranchOfficeDTO){

        // Segunda validacion del DTO
        if(!await validate(dto)) throw new BadRequestException();

        const entity: BranchOfficeEntity= {
            name: dto.name,
            addressId: dto.addressId,
            educationalCenterId: dto.educationalCenterId,
        }

        return this.createNewBranchOfficeUseCase.save(entity);
    }
}