import { AddressService } from "src/core/address/application/services/address.service";
import { BranchService } from "../services/branch.service";
import { CreateBranchWithAddressDTO } from "src/adapters/http/dtos/branch/create.branch.with.address.dto";
import { Inject } from "@nestjs/common";
import { TRANSACTION_PORT, TransactionPort } from "src/shared/ports/transaction.port";
import { BranchSchema } from "src/adapters/persistence/schemas";
import { BranchEntity } from "../../domain/entities/branch.entity";


export class CreateNewBranchFacade{
    constructor(
        @Inject()
        private readonly branchService:BranchService,
        @Inject()
        private readonly addressService: AddressService,
        @Inject(TRANSACTION_PORT)
        private readonly transaction: TransactionPort,
    ){}

    async execute(dto: CreateBranchWithAddressDTO){
        return this.transaction.run<BranchEntity>(async ()=>{
            const addressResponse = await this.addressService.saveNewAddress({
                city: dto.city,
                district: dto.district,
                exteriorNumber: dto.exteriorNumber,
                interiorNumber: dto.exteriorNumber,
                postalCode: dto.postalCode,
                state: dto.state,
                street: dto.street
            });

            const branchResponse = await this.branchService.saveNewBranch({
                name: dto.name,
                addressId: addressResponse.addressId,
            });

            return branchResponse;
        });
    }
}