import { AddressService } from "src/core/address/application/services/address.service";
import { BranchService } from "../services/branch.service";
import { CreateBranchWithAddressDTO } from "src/adapters/http/dtos/branch/create.branch.with.address.dto";
import { Inject } from "@nestjs/common";


export class CreateNewBranchFacade{
    constructor(
        @Inject()
        private readonly branchService:BranchService,
        @Inject()
        private readonly addressService: AddressService,
    ){}

    async execute(dto: CreateBranchWithAddressDTO){
        const addressResponse = await this.addressService.saveNewAddress(dto);

        const branchResponse = await this.branchService.saveNewBranch({
            ...dto,
            addressId: addressResponse.addressId,
        });

        return {
            ...branchResponse,
            address:{
                ...addressResponse
            }
        }
    }
}