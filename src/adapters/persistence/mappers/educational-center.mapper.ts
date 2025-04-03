import { EducationalCenterEntity } from "src/core/educational-center/domain/entities/educational-center.entity";
import { EducationalCenterSchema } from "../schemas/educational-center.schema";
import { plainToInstance } from "class-transformer";

export class EducationalCenterMapper{
    static toDomain(schema: EducationalCenterSchema): EducationalCenterEntity{
        const educationalCenterEntity = plainToInstance(EducationalCenterEntity, schema);
        if(!schema) return educationalCenterEntity;
        return educationalCenterEntity;
    }

    static toPersistence(entity: EducationalCenterEntity): EducationalCenterSchema{
        const educationalCenterSchema = plainToInstance(EducationalCenterSchema, entity);
        if(!entity) return educationalCenterSchema;
        return educationalCenterSchema;
    }   
}