import { STUDENT_FAMILY_REPOSITORY, StudentFamilyRepository } from "../../domain/repositories/student-family.repository";
import { Inject } from "@nestjs/common";
import { CreateStudentFamilyDTO } from "src/adapters/student-family/http/dtos/create.student-family.dto";
import { StudentFamilyEntity } from "../../domain/entities/student-family.entity";

export class StudentFamilyService {
    constructor(
        @Inject(STUDENT_FAMILY_REPOSITORY)
        private readonly studentFamilyRepository: StudentFamilyRepository,
    ) {}

    async save(dto: CreateStudentFamilyDTO): Promise<StudentFamilyEntity> {

        const studentFamily = new StudentFamilyEntity();
        studentFamily.parentFamilyId = dto.parentFamilyId;
        studentFamily.studentId = dto.studentId;
        
        return await this.studentFamilyRepository.save( studentFamily);
    }

    async findAllByStudentId(id: string): Promise<StudentFamilyEntity[]>{
        const student = await this.studentFamilyRepository.findAllByStudentId(id);
        return student;
    }
}