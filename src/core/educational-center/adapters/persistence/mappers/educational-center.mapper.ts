import { EducationalCenterEntity } from "src/core/educational-center/domain/entities/educational-center.entity";
import { EducationalCenterSchema } from "../schemas/educational-center.schema";
import { plainToInstance } from "class-transformer";
import { BranchOfficeMapper } from "../../../../branch-office/adapters/persistence/mappers/branch-office.mapper";
import { EducationalCenterNameVO } from "src/core/educational-center/value-objects/educational-center.name.vo";

export class EducationalCenterMapper{
    static toDomain(schema?: EducationalCenterSchema): EducationalCenterEntity{
        const educationalCenterEntity = plainToInstance(EducationalCenterEntity, schema);
        if(!schema) return educationalCenterEntity;
        educationalCenterEntity.name = EducationalCenterNameVO.set(schema.name);
        educationalCenterEntity.branchOffices = BranchOfficeMapper.toDomainList(schema?.branchOffices);
        return educationalCenterEntity;
    }

    static toPersistence(entity?: EducationalCenterEntity): EducationalCenterSchema{
        const educationalCenterSchema = plainToInstance(EducationalCenterSchema, entity);
        if(!entity) return educationalCenterSchema;
        educationalCenterSchema.name = entity.name.get();
        educationalCenterSchema.branchOffices = BranchOfficeMapper.toPersistenceList(entity?.branchOffices);
        return educationalCenterSchema;
    }   
}