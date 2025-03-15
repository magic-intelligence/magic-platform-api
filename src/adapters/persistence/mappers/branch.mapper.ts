import { BranchEntity } from "src/core/branch/domain/entities/branch.entity";
import { BranchSchema } from "../schemas";
import { AddressMapper } from "./address.mapper";
import { plainToInstance } from "class-transformer";
import { StudentMapper } from "./student.mapper";
import { ParentFamilyMapper } from "./parent-family.mapper";

export class BranchMapper{
    static toDomain(branchSchema?: BranchSchema): BranchEntity {

        const branchEntity = plainToInstance(BranchEntity, branchSchema);

        if(!branchSchema) return branchEntity;

        branchEntity.students = StudentMapper.toDomainList(branchSchema.students);
        branchSchema.parentFamilies = ParentFamilyMapper.toDomainList(branchSchema.parentFamilies);
        branchEntity.address = AddressMapper.toDomain(branchSchema.address);
        return branchEntity;
    }
    
    static toPersistence(branchEntity?: BranchEntity): BranchSchema {
        const branchSchema = plainToInstance(BranchSchema, branchEntity);

        if(!branchEntity ) return branchSchema;

        branchSchema.students = StudentMapper.toPersistenceList(branchEntity.students);
        branchSchema.parentFamilies = ParentFamilyMapper.toPersistenceList(branchEntity.parentFamilies);
        branchSchema.address = AddressMapper.toPersistence(branchEntity.address);
        return branchSchema;
    }

    static toDomainList(branchSchemas?: BranchSchema[]){
        return branchSchemas?.map(item => this.toDomain(item));
    }

    static toPersistenceList(branchEntities?: BranchEntity[]){
        return branchEntities?.map(item => this.toPersistence(item));
    }
    
}   