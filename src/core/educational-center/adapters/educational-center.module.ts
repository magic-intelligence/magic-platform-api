import { Module } from "@nestjs/common";
import { EDUCATIONAL_CENTER_REPOSITORY } from "src/core/educational-center/domain/repositories/educational-center.repository";
import { EducationalCenterRepositoryImpl } from "./persistence/repositories/educational-center.repository.impl";
import { EducationalCenterController } from "./http/controllers/educational-center.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EducationalCenterSchema } from "./persistence/schemas/educational-center.schema";
import { EducationalCenterService } from "../application/services/educational-center.service";
import { CreateNewEducationalCenterUseCase } from "../application/use-case/create.new.educational-center.use-case";

@Module({
    imports:[
        TypeOrmModule.forFeature([EducationalCenterSchema])
    ],
    providers:[
        {
            provide: EDUCATIONAL_CENTER_REPOSITORY,
            useClass: EducationalCenterRepositoryImpl
        },
        EducationalCenterService,
        CreateNewEducationalCenterUseCase,
    ],
    controllers:[
        EducationalCenterController
    ],
    exports:[
        EducationalCenterService
    ]
})
export class EducationalCenterModule{}