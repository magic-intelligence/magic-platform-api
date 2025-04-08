import { BadRequestException, Inject } from "@nestjs/common";
import { CreateNewEducationalCenterUseCase } from "../use-case/create.new.educational-center.use-case";
import { CreateEducationalCenterDTO } from "src/adapters/educational-center/http/dtos/create.educational-center.dto";
import { EducationalCenterEntity } from "../../domain/entities/educational-center.entity";
import { validate } from "class-validator";

export class EducationalCenterService{
    constructor(
        @Inject()
        private readonly createNewEducationalCenterUseCase: CreateNewEducationalCenterUseCase,
    ){}

    async saveNewEducationalCenter(dto: CreateEducationalCenterDTO){
        
        // Segunda validacion del DTO
        if(!await validate(dto)) throw new BadRequestException();

        const entity = new EducationalCenterEntity();
        entity.name = dto.name;
        return await this.createNewEducationalCenterUseCase.save(entity);
    }
}