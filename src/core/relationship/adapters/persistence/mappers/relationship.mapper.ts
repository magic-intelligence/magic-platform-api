import { RelationShipEntity } from "src/core/relationship/domain/entities/relationship.entity";
import { plainToInstance } from "class-transformer";
import { ParentFamilyMapper } from "../../../../parent-family/adapters/persistence/mappers/parent-family.mapper";
import { RelationshipSchema } from "../schemas/relationship.schema";

export class RelationshipMapper {
    static toDomain(relationshipSchema?: RelationshipSchema): RelationShipEntity {
        const entity = plainToInstance(RelationShipEntity, relationshipSchema);
        
        if(!entity) return entity;

        entity.parentFamilies = ParentFamilyMapper.toDomainList(relationshipSchema?.parentFamilies);

        return entity;
    }

    static toPersistence(relationshipEntity?: RelationShipEntity): RelationshipSchema {
        const schema = plainToInstance(RelationshipSchema, relationshipEntity);

        if(!schema) return schema;

        schema.parentFamilies = ParentFamilyMapper.toPersistenceList(relationshipEntity?.parentFamilies);
        
        return schema;
    }

    static toDomainList(relationshipSchemas?: RelationshipSchema[]){
        return relationshipSchemas?.map(item => this.toDomain(item));
    }

    static toPersistenceList(relationshipEntities?: RelationShipEntity[]){
        return relationshipEntities?.map(item => this.toPersistence(item));
    }
}