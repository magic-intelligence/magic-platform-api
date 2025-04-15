import {  Module } from "@nestjs/common";
import { CreateNewEducationalCenterUseCase } from "./application/use-case/create.new.educational-center.use-case";
import { EducationalCenterService } from "./application/services/educational-center.service";
import { EducationalCenterAdapterModule } from "src/core/educational-center/adapters/educational-center.adapter.module";
@Module({
    imports:[EducationalCenterAdapterModule],
    providers:[
        EducationalCenterService,
        CreateNewEducationalCenterUseCase,
    ],
    exports:[
        EducationalCenterService
    ]
})
export class EducationalCenterCoreModule{}