import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EducationalCenterRepositoryImpl } from "src/adapters/persistence/repositories/educational-center.repository.impl";
import { EducationalCenterSchema } from "src/adapters/persistence/schemas/educational-center.schema";
import { TransactionModule } from "src/infraestructure/database/typeorm/transactions/transaction.module";
import { EDUCATIONAL_CENTER_REPOSITORY } from "./domain/repositories/educational-center.repository";
import { CreateNewEducationalCenterUseCase } from "./application/use-case/create.new.educational-center.use-case";
import { EducationalCenterService } from "./application/services/educational-center.service";
import { EducationalCenterController } from "src/adapters/http/controllers/educational-center.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([EducationalCenterSchema]),
    ],
    providers:[
        {
            provide: EDUCATIONAL_CENTER_REPOSITORY,
            useClass: EducationalCenterRepositoryImpl
        },
        CreateNewEducationalCenterUseCase,
        EducationalCenterService
    ],
    controllers: [
        EducationalCenterController
    ],
    exports: [
        EDUCATIONAL_CENTER_REPOSITORY,
    ]

})
export class EducationalCenterModule{}