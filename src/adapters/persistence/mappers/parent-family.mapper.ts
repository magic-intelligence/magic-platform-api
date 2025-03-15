import { ParentFamilyEntity } from "src/core/parent-family/domain/entities/parent-family.entity";
import { ParentFamilySchema } from "../schemas/parent-family.schema";
import { plainToInstance } from "class-transformer";
import { RelationshipMapper } from "./relationship.mapper";
import { AddressMapper } from "./address.mapper";
import { BranchMapper } from "./branch.mapper";
import { StudentFamilyMapper } from "./student-family.mapper";

export class ParentFamilyMapper {
    static toDomain(parentFamilySchema?: ParentFamilySchema): ParentFamilyEntity {
        const parentFamilyEntity = plainToInstance(ParentFamilyEntity, parentFamilySchema);
        
        if( !parentFamilySchema ) return parentFamilyEntity;
        
        parentFamilyEntity.branch = BranchMapper.toDomain(parentFamilySchema.branch);
        parentFamilyEntity.address = AddressMapper.toDomain(parentFamilySchema.address);
        parentFamilyEntity.relationship = RelationshipMapper.toDomain(parentFamilySchema.relationship);
        parentFamilyEntity.studentFamilies = StudentFamilyMapper.toDomainList(parentFamilySchema.studentFamilies);
        return parentFamilyEntity;
    }

    static toPersistence(parentFamilyEntity?: ParentFamilyEntity): ParentFamilySchema {
        const parentFamilySchema = plainToInstance(ParentFamilySchema, parentFamilyEntity);
        
        if( !parentFamilyEntity ) return parentFamilySchema;

        parentFamilySchema.branch = BranchMapper.toPersistence(parentFamilyEntity.branch);
        parentFamilySchema.address = AddressMapper.toPersistence(parentFamilyEntity.address);
        parentFamilySchema.relationship = RelationshipMapper.toPersistence(parentFamilyEntity.relationship);
        parentFamilySchema.studentFamilies = StudentFamilyMapper.toPersistenceList(parentFamilyEntity.studentFamilies);
        return parentFamilySchema;
    }

    static toPersistenceList(parentFamilies?: ParentFamilyEntity[]){
        return parentFamilies?.map(item => this.toPersistence(item));
    }

    static toDomainList(parentFamilies?: ParentFamilySchema[]){
        return parentFamilies?.map(item => this.toDomain(item));
    }
}