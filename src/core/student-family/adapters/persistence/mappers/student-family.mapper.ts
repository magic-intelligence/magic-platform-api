import { StudentFamilyEntity } from "src/core/student-family/domain/entities/student-family.entity";
import { StudentFamilySchema } from "../schemas/student-family.schema";
import { StudentMapper } from "../../../../student/adapters/persistence/mappers/student.mapper";
import { ParentFamilyMapper } from "../../../../parent-family/adapters/persistence/mappers/parent-family.mapper";
import { plainToInstance } from "class-transformer";

export class StudentFamilyMapper{
    static toDomain(studentFamilySchema?: StudentFamilySchema): StudentFamilyEntity {
        const studentFamilyEntity = plainToInstance(StudentFamilyEntity, studentFamilySchema);

        if( !studentFamilySchema ) return studentFamilyEntity;

        studentFamilyEntity.parentFamily = ParentFamilyMapper.toDomain(studentFamilySchema.parentFamily);
        studentFamilyEntity.student = StudentMapper.toDomain(studentFamilySchema.student)

        return studentFamilyEntity;
    }

    static toPersistence(studentFamilyEntity?: StudentFamilyEntity): StudentFamilySchema {
        const studentFamilySchema = plainToInstance(StudentFamilySchema, studentFamilyEntity);

        if( !studentFamilyEntity ) return studentFamilySchema;

        studentFamilySchema.parentFamily = ParentFamilyMapper.toPersistence(studentFamilyEntity.parentFamily);
        studentFamilySchema.student = StudentMapper.toPersistence(studentFamilyEntity.student)

        return studentFamilySchema;
    }

    static toDomainList(studentFamiliesSchema?: StudentFamilySchema[]){
        return studentFamiliesSchema?.map((studentFamilySchema) => this.toDomain(studentFamilySchema));
    }

    static toPersistenceList(studentFamiliesEntity?: StudentFamilyEntity[]){
        return studentFamiliesEntity?.map((studentFamilyEntity) => this.toPersistence(studentFamilyEntity));
    }
}