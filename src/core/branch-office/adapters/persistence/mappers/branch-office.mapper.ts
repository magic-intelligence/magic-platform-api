import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";
import { AddressMapper } from "../../../../address/adapters/persistence/mappers/address.mapper";
import { plainToInstance } from "class-transformer";
import { StudentMapper } from "../../../../student/adapters/persistence/mappers/student.mapper";
import { ParentFamilyMapper } from "../../../../parent-family/adapters/persistence/mappers/parent-family.mapper";
import { EducationalCenterMapper } from "../../../../educational-center/adapters/persistence/mappers/educational-center.mapper";
import { BranchOfficeSchema } from "../schemas/branch-office.schema";

export class BranchOfficeMapper{
    static toDomain(branchOfficeSchema?: BranchOfficeSchema): BranchOfficeEntity {

        const branchOfficeEntity = plainToInstance(BranchOfficeEntity, branchOfficeSchema);

        if(!branchOfficeSchema) return branchOfficeEntity;

        branchOfficeEntity.students = StudentMapper.toDomainList(branchOfficeSchema.students);
        branchOfficeEntity.parentFamilies = ParentFamilyMapper.toDomainList(branchOfficeSchema.parentFamilies);
        branchOfficeEntity.address = AddressMapper.toDomain(branchOfficeSchema.address);
        branchOfficeEntity.educationalCenter = EducationalCenterMapper.toDomain(branchOfficeSchema.educationalCenter);
        return branchOfficeEntity;
    }
    
    static toPersistence(branchOfficeEntity?: BranchOfficeEntity): BranchOfficeSchema {
        const branchOfficeSchema = plainToInstance(BranchOfficeSchema, branchOfficeEntity);

        if(!branchOfficeEntity ) return branchOfficeSchema;

        branchOfficeSchema.students = StudentMapper.toPersistenceList(branchOfficeEntity.students);
        branchOfficeSchema.parentFamilies = ParentFamilyMapper.toPersistenceList(branchOfficeEntity.parentFamilies);
        branchOfficeSchema.address = AddressMapper.toPersistence(branchOfficeEntity.address);
        branchOfficeSchema.educationalCenter = EducationalCenterMapper.toPersistence(branchOfficeEntity.educationalCenter);
        return branchOfficeSchema;
    }

    static toDomainList(branchOfficeSchemas?: BranchOfficeSchema[]){
        return branchOfficeSchemas?.map(item => this.toDomain(item));
    }

    static toPersistenceList(branchOfficeEntities?: BranchOfficeEntity[]){
        return branchOfficeEntities?.map(item => this.toPersistence(item));
    }
    
}   