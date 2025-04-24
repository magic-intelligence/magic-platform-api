import { Inject, Injectable } from "@nestjs/common";
import { BranchOfficeEntity } from "../../domain/entities/branch-office.entity";
import { BranchOfficeService } from "../services/branch-office.service";
import { CreateBranchOfficeAppDto } from "../../dtos/create.branch-office.app.dto";

@Injectable()
export class CreateNewBranchOfficeUseCase{
    constructor(
        @Inject()
        private readonly branchOfficeService: BranchOfficeService,
    ){}

    async execute(dto: CreateBranchOfficeAppDto){

        const entity: BranchOfficeEntity = {
            name: dto.name,
            addressId: dto.addressId.get(),
            educationalCenterId: dto.educationalCenterId.get(),
        }

        return this.branchOfficeService.saveNewBranchOffice(entity);
    }
}