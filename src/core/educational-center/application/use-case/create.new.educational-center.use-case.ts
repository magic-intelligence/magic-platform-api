import { Inject, Injectable } from "@nestjs/common";
import { EDUCATIONAL_CENTER_REPOSITORY, EducationalCenterRepository } from "../../domain/repositories/educational-center.repository";
import { CreateEducationalCenterDTO } from "src/core/educational-center/adapters/http/dtos/create.educational-center.dto";
import { EducationalCenterEntity } from "../../domain/entities/educational-center.entity";

@Injectable()
export class CreateNewEducationalCenterUseCase {
    constructor(
        @Inject(EDUCATIONAL_CENTER_REPOSITORY)
        private readonly educationalCenterRepository: EducationalCenterRepository,
    ) {}

    async save(entity: EducationalCenterEntity) {
        return await this.educationalCenterRepository.save(entity);
    }
} 