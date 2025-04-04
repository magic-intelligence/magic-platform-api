import { AddressService } from "src/core/address/application/services/address.service";
import { BranchOfficeService } from "../services/branch-office.service";
import { CreateBranchOfficeWithAddressDTO } from "src/adapters/http/dtos/branch-office/create.branch-office.with.address.dto";
import { Inject } from "@nestjs/common";
import { TRANSACTION_PORT, TransactionPort } from "src/shared/ports/transaction.port";
import { BranchOfficeEntity } from "../../domain/entities/branch-office.entity";


export class CreateNewBranchOfficeFacade{
    constructor(
        @Inject()
        private readonly branchOfficeService:BranchOfficeService,
        @Inject()
        private readonly addressService: AddressService,
        @Inject(TRANSACTION_PORT)
        private readonly transaction: TransactionPort,
    ){}

    async execute(dto: CreateBranchOfficeWithAddressDTO){
        return this.transaction.run<BranchOfficeEntity>(async ()=>{
            const addressResponse = await this.addressService.saveNewAddress({
                city: dto.city,
                district: dto.district,
                exteriorNumber: dto.exteriorNumber,
                interiorNumber: dto.exteriorNumber,
                postalCode: dto.postalCode,
                state: dto.state,
                street: dto.street
            });

            const branchResponse = await this.branchOfficeService.saveNewBranch({
                name: dto.name,
                addressId: addressResponse.addressId,
                educationalCenterId: dto.educationalCenterId
            });

            return branchResponse;
        });
    }
}