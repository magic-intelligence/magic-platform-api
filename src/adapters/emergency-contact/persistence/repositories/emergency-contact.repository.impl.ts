import { EmergencyContactEntity } from "src/core/emergency-contact/domain/entities/emergency-contact.entity";
import { EmergencyContactRepository } from "src/core/emergency-contact/domain/repositories/emergency-contact.repository";
import { Repository } from "typeorm";
import { EmergencyContactSchema } from "../schemas/emergency-contact.schema";
import { InjectRepository } from "@nestjs/typeorm";
import { EmergencyContactMapper } from "../mappers/emergency-contact.mapper";
import { handlerExceptionError } from "src/shared/exceptions/handler.exception.error";

export class EmergencyContactRepositoryImpl implements EmergencyContactRepository{
    constructor(
        @InjectRepository(EmergencyContactSchema)
        private readonly emergencyContactRepository: Repository<EmergencyContactSchema> 
    ){}

    async save(entity: EmergencyContactEntity): Promise<EmergencyContactEntity> {
        try {
            const studentSchema = EmergencyContactMapper.toPersistence(entity);

            const result = await this.emergencyContactRepository.save(studentSchema);
            
            return EmergencyContactMapper.toDomain(result);
        } catch (error) {
            return handlerExceptionError(error);
        }
    }
    findAll(): Promise<EmergencyContactEntity[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<EmergencyContactEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

} 