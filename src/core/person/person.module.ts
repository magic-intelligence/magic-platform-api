import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonRepositoryImpl } from "src/adapters/persistence/repositories/person.repository.impl";
import { PersonSchema } from "src/adapters/persistence/schemas/person.schema";
import { PERSON_REPOSITORY } from "./domain/repositories/person.repository";
import { PersonService } from "./application/service/person.service";
import { TransactionModule } from "src/infraestructure/database/typeorm/transactions/transaction.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([PersonSchema]),
        TransactionModule
    ],
    providers:[
        {
            provide: PERSON_REPOSITORY,
            useClass: PersonRepositoryImpl
        },
        PersonService
     ],
    exports:[ 
        PERSON_REPOSITORY,
        PersonService
    ]
})

export class PersonModule{}