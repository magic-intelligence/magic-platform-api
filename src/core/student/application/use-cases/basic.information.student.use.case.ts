import { Inject, Injectable } from "@nestjs/common";
import { STUDENT_REPOSITORY, StudentRepository } from "../../domain/repositories/student.repository";
import { StudentEntity } from "../../domain/entities/student.entity";
import { CreateStudentDTO } from "src/adapters/student/http/dtos/create.student.dto";

@Injectable()
export class BasicInformationStudentUseCase{
    constructor(
        @Inject(STUDENT_REPOSITORY)
        private readonly studentRepository: StudentRepository,
    ){}

    async execute (dto: CreateStudentDTO){

        const student = new StudentEntity();
        student.nickname = dto.nickname;
        student.name = dto.name;
        student.paternalSurname = dto.paternalSurname;
        student.maternalSurname = dto.maternalSurname;
        student.gender = dto.gender;
        student.entryTime = dto.entryTime;
        student.exitTime = dto.exitTime;
        student.brothersNumber = dto.brothersNumber;
        student.familyStatusId = dto.familyStatusId;
        student.entryTime = dto.entryTime;
        student.branchId = dto.branchId;
        student.birthday = dto.birthday;
        
        return this.studentRepository.save(student);
    }
}