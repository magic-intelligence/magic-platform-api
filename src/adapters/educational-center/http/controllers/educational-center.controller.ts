import { Body, Controller, Inject, Post } from "@nestjs/common";
import { EducationalCenterService } from "src/core/educational-center/application/services/educational-center.service";
import { CreateEducationalCenterDTO } from "../dtos/create.educational-center.dto";

@Controller('educational-centers')
export class EducationalCenterController{
    constructor(
        @Inject()
        private readonly educationalCenterService: EducationalCenterService,
    ){}

    @Post()
    async saveEducationalCenter(@Body() dto: CreateEducationalCenterDTO){
        return await this.educationalCenterService.saveNewEducationalCenter(dto);
    }
}