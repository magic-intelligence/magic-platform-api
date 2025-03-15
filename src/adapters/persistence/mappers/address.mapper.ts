import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { AddressSchema } from "../schemas";
import { plainToInstance } from "class-transformer";

export class AddressMapper {
    static toDomain(addressSchema?: AddressSchema): AddressEntity {
        return plainToInstance(AddressEntity, addressSchema);
    }

    static toPersistence(addressEntity?: AddressEntity): AddressSchema {
        return plainToInstance(AddressSchema, addressEntity);
    }

    static toDomainList(addressSchemas?: AddressSchema[]){
        return addressSchemas?.map(item=> this.toDomain(item));
    }

    static toPersistenceList(addressEntities?: AddressEntity[]){
        return addressEntities?.map(item=> this.toPersistence(item));
    }
}