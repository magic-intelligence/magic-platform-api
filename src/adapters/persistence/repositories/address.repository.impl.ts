import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { AddressRepository } from "src/core/address/domain/repositories/address.repository";
import { Repository } from "typeorm";
import { AddressSchema } from "../schemas";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressMapper } from "../mappers/address.mapper";
import { handlerExceptionError } from "src/shared/exceptions/handler.exception.error";

export class AddressRepositoryImpl implements AddressRepository{
    constructor(
        @InjectRepository(AddressSchema)
        private readonly addressRepository: Repository<AddressSchema>,
    ){}
    async save(entity: AddressEntity): Promise<AddressEntity> {
        try {
            const schema = AddressMapper.toPersistence(entity);

            const result = await this.addressRepository.save(schema);

            return AddressMapper.toDomain(result);
        } catch (error) {
            return handlerExceptionError(error);
        }
    }
    findAll(): Promise<AddressEntity[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<AddressEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}