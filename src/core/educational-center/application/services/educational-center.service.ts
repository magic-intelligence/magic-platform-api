import { Inject, Injectable } from "@nestjs/common";
import { EducationalCenterEntity } from "../../domain/entities/educational-center.entity";
import { EDUCATIONAL_CENTER_REPOSITORY, EducationalCenterRepository } from "../../domain/repositories/educational-center.repository";

@Injectable()
export class EducationalCenterService{
    constructor(
        @Inject(EDUCATIONAL_CENTER_REPOSITORY)
        private readonly educationalCenterRepository: EducationalCenterRepository,
    ){}
    async save(entity: EducationalCenterEntity) {
        return await this.educationalCenterRepository.save(entity);
    }
    
}