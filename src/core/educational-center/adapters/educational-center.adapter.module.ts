import { forwardRef, Module } from "@nestjs/common";
import { EDUCATIONAL_CENTER_REPOSITORY } from "src/core/educational-center/domain/repositories/educational-center.repository";
import { EducationalCenterRepositoryImpl } from "./persistence/repositories/educational-center.repository.impl";
import { EducationalCenterController } from "./http/controllers/educational-center.controller";
import { EducationalCenterCoreModule } from "src/core/educational-center/educational-center.core.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EducationalCenterSchema } from "./persistence/schemas/educational-center.schema";

@Module({
    imports:[
        forwardRef(() => EducationalCenterCoreModule),
        TypeOrmModule.forFeature([EducationalCenterSchema])
    ],
    providers:[
        {
            provide: EDUCATIONAL_CENTER_REPOSITORY,
            useClass: EducationalCenterRepositoryImpl
        },
    ],
    controllers:[
        EducationalCenterController
    ],
    exports:[EDUCATIONAL_CENTER_REPOSITORY]
})
export class EducationalCenterAdapterModule{}