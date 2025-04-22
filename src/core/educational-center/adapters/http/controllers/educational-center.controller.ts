import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateEducationalCenterDTO } from "../dtos/create.educational-center.dto";
import { EducationalCenterPresenter } from "../presenters/educational-center.presenter";
import { CreateNewEducationalCenterUseCase } from "src/core/educational-center/application/use-case/create.new.educational-center.use-case";

@Controller('educational-centers')
export class EducationalCenterController{
    constructor(
        @Inject()
        private readonly createNewEducationalCenterUseCase: CreateNewEducationalCenterUseCase,
    ){}

    @Post()
    async saveEducationalCenter(@Body() dto: CreateEducationalCenterDTO){
        const response = await this.createNewEducationalCenterUseCase.execute(dto.name);
        return EducationalCenterPresenter.toHttp(response);
    }
}