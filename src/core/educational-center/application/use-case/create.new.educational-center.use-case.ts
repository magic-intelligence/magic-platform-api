import { Inject, Injectable } from "@nestjs/common";
import { EDUCATIONAL_CENTER_REPOSITORY, EducationalCenterRepository } from "../../domain/repositories/educational-center.repository";
import { CreateEducationalCenterDTO } from "src/adapters/http/dtos/educational-center/create.educational-center.dto";
import { EducationalCenterEntity } from "../../domain/entities/educational-center.entity";

@Injectable()
export class CreateNewEducationalCenterUseCase {
    constructor(
        @Inject(EDUCATIONAL_CENTER_REPOSITORY)
        private readonly educationalCenterRepository: EducationalCenterRepository,
    ) {}

    async save(dto: CreateEducationalCenterDTO) {
        const entity = new EducationalCenterEntity();
        entity.name = dto.name;
        return await this.educationalCenterRepository.save(entity);
    }
} 