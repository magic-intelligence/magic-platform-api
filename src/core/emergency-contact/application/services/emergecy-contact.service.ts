import { Inject } from "@nestjs/common";
import { EMERGENCY_CONTACT_REPOSITORY, EmergencyContactRepository } from "../../domain/repositories/emergency-contact.repository";
import { CreateEmergencyContactDTO } from "src/core/emergency-contact/adapters/http/dtos/create.emergency-contcat.dto";
import { EmergencyContactEntity } from "../../domain/entities/emergency-contact.entity";

export class EmergencyContactService{
    constructor(
        @Inject(EMERGENCY_CONTACT_REPOSITORY)
        private readonly emergencyContactRepository: EmergencyContactRepository,
    ){}

    async save(dto: CreateEmergencyContactDTO){
        const emergencyContactEntity = new EmergencyContactEntity();
        emergencyContactEntity.studentFamilyId=dto.studentFamilyId;
        emergencyContactEntity.priorityLevel=dto.priorityLevel;

        const result = await this.emergencyContactRepository.save(emergencyContactEntity);
        return result;
    }
}