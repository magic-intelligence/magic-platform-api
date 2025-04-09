import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ADDRESS_REPOSITORY } from "./domain/repositories/address.repository";
import { AddressRepositoryImpl } from "src/adapters/address/persistence/repositories/address.repository.impl";
import { AddressService } from "./application/services/address.service";
import { CreateNewAddressUseCase } from "./application/use-cases/create.new.address.use.case";
import { TransactionModule } from "src/infraestructure/database/typeorm/transactions/transaction.module";
import { AddressSchema } from "src/adapters/address/persistence/schemas/address.schema";

@Module({
    imports:[
        TypeOrmModule.forFeature([AddressSchema]),
        TransactionModule
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