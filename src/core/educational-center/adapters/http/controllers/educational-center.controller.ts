import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateEducationalCenterHttpDTO } from "../dtos/create.educational-center.http.dto";
import { EducationalCenterPresenter } from "../presenters/educational-center.presenter";
import { CreateNewEducationalCenterUseCase } from "src/core/educational-center/application/use-case/create.new.educational-center.use-case";
import { EducationalCenterNameVO } from "src/core/educational-center/value-objects/educational-center.name.vo";
import { CreateEducationalCenterAppDTO } from "src/core/educational-center/application/dtos/create.educational-center.app.dto";

@Controller('educational-centers')
export class EducationalCenterController{
    constructor(
        @Inject()
        private readonly createNewEducationalCenterUseCase: CreateNewEducationalCenterUseCase,
    ){}

    @Post()
    async saveEducationalCenter(@Body() httpDto: CreateEducationalCenterHttpDTO){
        const appDto: CreateEducationalCenterAppDTO = {
            name: EducationalCenterNameVO.set(httpDto.name),
        }
        const response = await this.createNewEducationalCenterUseCase.execute(appDto);
        return EducationalCenterPresenter.toHttp(response);
    }
}