import { Inject, Injectable } from "@nestjs/common";
import { EducationalCenterEntity } from "../../domain/entities/educational-center.entity";
import { EducationalCenterNameVO } from "../../value-objects/educational-center.name.vo";
import { EducationalCenterService } from "../services/educational-center.service";

@Injectable()
export class CreateNewEducationalCenterUseCase {
    constructor(
        @Inject()
        private readonly service: EducationalCenterService,
    ) {}

    async execute(name: string){
        const entity = new EducationalCenterEntity();
        entity.name = EducationalCenterNameVO.create(name);
        return await this.service.save(entity);
    }
} 