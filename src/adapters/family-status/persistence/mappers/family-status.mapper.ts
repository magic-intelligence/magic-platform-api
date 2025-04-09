import { FamilyStatusEntity } from "src/core/family-status/domain/entities/family-status.entity";
import { plainToInstance } from "class-transformer";
import { StudentMapper } from "../../../student/persistence/mappers/student.mapper";
import { FamilyStatusSchema } from "../schemas/family-status.schema";


export class FamilyStatusMapper{
    static toDomain(familyStatusSchema?: FamilyStatusSchema): FamilyStatusEntity{
        const entity = plainToInstance(FamilyStatusEntity, familyStatusSchema);

        if(!entity) return entity;

        entity.students = StudentMapper.toDomainList(familyStatusSchema?.students);
        
        return entity;
    }

    static toPersistence(familyStatusEntity?: FamilyStatusEntity): FamilyStatusSchema{
        const schema = plainToInstance(FamilyStatusSchema, familyStatusEntity);

        if(!schema) return schema;

        schema.students = StudentMapper.toPersistenceList(familyStatusEntity?.students);
        
        return schema;
    }

    static toDomainList(familyStatusSchemas?: FamilyStatusSchema[]){
        return familyStatusSchemas?.map(item => this.toDomain(item));
    }

    static toPersitenceList(familyStatusEntity?: FamilyStatusEntity[]){
        return familyStatusEntity?.map(item => this.toPersistence(item));
    }
}