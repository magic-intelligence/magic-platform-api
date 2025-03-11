import { CreateAddressDTO } from "src/adapters/http/dtos/address/create.address.dto";
import { CreateNewAddressUseCase } from "../use-cases/create.new.address.use.case";
import { Inject } from "@nestjs/common";

export class AddressService{
    constructor(
        @Inject()
        private readonly createNewAddressUseCase: CreateNewAddressUseCase,
    ){}

    async saveNewAddress(dto: CreateAddressDTO){
        return this.createNewAddressUseCase.save(dto);
    }
}