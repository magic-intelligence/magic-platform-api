import { Inject, Injectable } from "@nestjs/common";
import { ADDRESS_REPOSITORY, AddressRepository } from "../../domain/repositories/address.repository";
import { CreateAddressDTO } from "src/adapters/http/dtos/address/create.address.dto";
import { AddressEntity } from "../../domain/entities/address.entity";

@Injectable()
export class CreateNewAddressUseCase{
    constructor(
        @Inject(ADDRESS_REPOSITORY)
        private readonly addressRepositoy: AddressRepository,
    ){}

    async save(dto: CreateAddressDTO){
        const entity = new AddressEntity();

        entity.postalCode = dto.postalCode;
        entity.street = dto.street;
        entity.interiorNumber = dto.interiorNumber;
        entity.exteriorNumber = dto.exteriorNumber;
        entity.city = dto.city;
        entity.district = dto.district;
        entity.state = dto.state;

        return this.addressRepositoy.save(entity);
    }
}