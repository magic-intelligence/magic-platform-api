import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EducationalCenterEntity } from "src/core/educational-center/domain/entities/educational-center.entity";
import { EducationalCenterRepository } from "src/core/educational-center/domain/repositories/educational-center.repository";
import { handlerExceptionError } from "src/shared/exceptions/handler.exception.error";
import { EducationalCenterMapper } from "../mappers/educational-center.mapper";
import { EducationalCenterSchema } from "../schemas/educational-center.schema";
// import { Transactional } from "src/infraestructure/database/typeorm/transactions/transactional.decorator";

Injectable()
export class EducationalCenterRepositoryImpl implements EducationalCenterRepository{
    constructor(
        @InjectRepository(EducationalCenterSchema)
        private readonly educationalCenterRepository: Repository<EducationalCenterSchema>
    ){}

    async save(entity: EducationalCenterEntity): Promise<EducationalCenterEntity> {
        try{
            const educationalCenterSchema = EducationalCenterMapper.toPersistence(entity);
            
            const result = await this.educationalCenterRepository.save(educationalCenterSchema);
            
            return EducationalCenterMapper.toDomain(result);
        } catch(error){
            return handlerExceptionError(error);
        }
    }
    findAll(): Promise<EducationalCenterEntity[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<EducationalCenterEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}