import { Inject, Injectable } from "@nestjs/common";
import { CreateNewEducationalCenterUseCase } from "../use-case/create.new.educational-center.use-case";
import { CreateEducationalCenterDTO } from "src/adapters/http/dtos/educational-center/create.educational-center.dto";

export class EducationalCenterService{
    constructor(
        @Inject()
        private readonly createNewEducationalCenterUseCase: CreateNewEducationalCenterUseCase,
    ){}

    async saveNewEducationalCenter(dto: CreateEducationalCenterDTO){
        return await this.createNewEducationalCenterUseCase.save(dto);
    }
}