import { BadRequestException, Inject } from "@nestjs/common";
import { CreateNewEducationalCenterUseCase } from "../use-case/create.new.educational-center.use-case";
import { CreateEducationalCenterDTO } from "src/core/educational-center/adapters/http/dtos/create.educational-center.dto";
import { EducationalCenterEntity } from "../../domain/entities/educational-center.entity";
import { validate } from "class-validator";
import { EducationalCenterNameVO } from "../../value-objects/educational-center.name.vo";

export class EducationalCenterService{
    constructor(
        @Inject()
        private readonly createNewEducationalCenterUseCase: CreateNewEducationalCenterUseCase,
    ){}

    async saveNewEducationalCenter(dto: CreateEducationalCenterDTO){
        
        // Segunda validacion del DTO
        if(!await validate(dto)) throw new BadRequestException();

        const entity = new EducationalCenterEntity();
        entity.name = EducationalCenterNameVO.create(dto.name);
        return await this.createNewEducationalCenterUseCase.save(entity);
    }
}