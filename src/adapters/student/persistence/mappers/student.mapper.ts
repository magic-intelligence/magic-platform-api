import { plainToInstance } from "class-transformer";
import { StudentEntity } from "src/core/student/domain/entities/student.entity";
import { FamilyStatusMapper } from "../../../family-status/persistence/mappers/family-status.mapper";
import { StudentFamilyMapper } from "../../../student-family/persistence/mappers/student-family.mapper";
import { BranchOfficeMapper } from "../../../branch-office/persistence/mappers/branch-office.mapper";
import { StudentSchema } from "../schemas/student.schema";
export class StudentMapper {
    static toDomain(studentSchema?: StudentSchema): StudentEntity {
        const entity = plainToInstance(StudentEntity, studentSchema);

        if( !studentSchema ) return entity;

        entity.branch = BranchOfficeMapper.toDomain(studentSchema.branch);
        entity.familyStatus = FamilyStatusMapper.toDomain(studentSchema.familyStatus);
        entity.studentFamilies = StudentFamilyMapper.toDomainList(studentSchema.studentFamilies);
        return entity;
    }

    static toPersistence(studentEntity?: StudentEntity): StudentSchema {
        const schema = plainToInstance(StudentSchema, studentEntity);

        if( !studentEntity ) return schema;

        schema.branch = BranchOfficeMapper.toPersistence(studentEntity.branch);
        schema.familyStatus = FamilyStatusMapper.toPersistence(studentEntity.familyStatus);
        schema.studentFamilies = StudentFamilyMapper.toPersistenceList(studentEntity.studentFamilies);
        return schema;
    }

    static toDomainList(students?: StudentSchema[]){
        return students?.map((student) => this.toDomain(student));
    }

    static toPersistenceList(students?: StudentEntity[]){
        return students?.map((student) => this.toPersistence(student));
    }
}
