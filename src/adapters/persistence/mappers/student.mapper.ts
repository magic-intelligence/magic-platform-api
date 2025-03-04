import { plainToInstance } from "class-transformer";
import { StudentEntity } from "src/core/student/domain/entities/student.entity";
import { StudentSchema } from "../schemas";
import { FamilyStatusMapper } from "./family-status.mapper";
import { PersonMapper } from "./person.mapper";
import { StudentFamilyMapper } from "./student-family.mapper";
export class StudentMapper {
    static toDomain(studentSchema: StudentSchema): StudentEntity {
        const entity = plainToInstance(StudentEntity, studentSchema);

        if( studentSchema === undefined ) return entity;

        entity.familyStatus = FamilyStatusMapper.toDomain(studentSchema.familyStatus);
        entity.person = PersonMapper.toDomain(studentSchema.person);

        entity.studentFamilies = studentSchema.studentFamilies
            ? StudentFamilyMapper.toDomainList(studentSchema.studentFamilies)
            : undefined;

        return entity;
    }

    static toPersistence(studentEntity: StudentEntity): StudentSchema {
        const schema = plainToInstance(StudentSchema, studentEntity);

        if( studentEntity === undefined ) return schema; 

        schema.familyStatus = FamilyStatusMapper.toPersistence(studentEntity.familyStatus);
        schema.person = PersonMapper.toPersistence(studentEntity.person);

        schema.studentFamilies = studentEntity.studentFamilies
            ? StudentFamilyMapper.toPersistenceList(studentEntity.studentFamilies)
            : undefined;

        return schema;
    }

    static toDomainList(students: StudentSchema[]): StudentEntity[] {
        return students?.map((student) => this.toDomain(student));
    }

    static toPersistenceList(students: StudentEntity[]): StudentSchema[] {
        return students?.map((student) => this.toPersistence(student));
    }
}
