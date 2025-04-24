import { Inject, Injectable } from "@nestjs/common";
import { EducationalCenterEntity } from "../../domain/entities/educational-center.entity";
import { EducationalCenterService } from "../services/educational-center.service";
import { CreateEducationalCenterAppDTO } from "../dtos/create.educational-center.app.dto";

@Injectable()
export class CreateNewEducationalCenterUseCase {
    constructor(
        @Inject()
        private readonly service: EducationalCenterService,
    ) {}

    async execute(dto:CreateEducationalCenterAppDTO){
        const entity:EducationalCenterEntity = {
            name: dto.name,
        }
        return await this.service.save(entity);
    }
} 