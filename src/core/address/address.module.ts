import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressSchema } from "src/adapters/persistence/schemas";
import { ADDRESS_REPOSITORY } from "./domain/repositories/address.repository";
import { AddressRepositoryImpl } from "src/adapters/persistence/repositories/address.repository.impl";
import { AddressService } from "./application/services/address.service";
import { CreateNewAddressUseCase } from "./application/use-cases/create.new.address.use.case";

@Module({
    imports:[
        TypeOrmModule.forFeature([AddressSchema])
    ],
    providers:[
        {
            provide: ADDRESS_REPOSITORY,
            useClass: AddressRepositoryImpl
        },
        AddressService,
        CreateNewAddressUseCase
    ],
    exports: [
        ADDRESS_REPOSITORY,
        CreateNewAddressUseCase,
        AddressService
    ]
})

export class AddressModule{}