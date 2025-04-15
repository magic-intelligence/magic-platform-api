import { StudentFamilyEntity } from "src/core/student-family/domain/entities/student-family.entity";
import { StudentFamilyRepository } from "src/core/student-family/domain/repositories/student-family.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentFamilyMapper } from "../mappers/student-family.mapper";
import { Transactional } from "src/infraestructure/database/typeorm/transactions/transactional.decorator";
import { handlerExceptionError } from "src/shared/exceptions/handler.exception.error";
import { NotFoundException } from "@nestjs/common";
import { StudentFamilySchema } from "../schemas/student-family.schema";

export class StudentFamilyRepositoryImpl implements StudentFamilyRepository{
    constructor(
        @InjectRepository(StudentFamilySchema)
        private readonly studentRepository: Repository<StudentFamilySchema>,
        private readonly transactional: Transactional,
    ){}
    async save(student: StudentFamilyEntity): Promise<StudentFamilyEntity> {
        const manager = this.transactional.getManager();
        const repo = manager.getRepository(StudentFamilySchema);
        try{
            const studentFamilySchema = StudentFamilyMapper.toPersistence(student);
            const savedStudentFamily = await repo.save(studentFamilySchema);
            return StudentFamilyMapper.toDomain(savedStudentFamily);
        } catch (error) {
            return handlerExceptionError(error);
        }
    }
    findAll(): Promise<StudentFamilyEntity[]> {
        throw new Error("Method not implemented.");
    }
    
    async findById(id: string): Promise<StudentFamilyEntity> {
        throw new Error("Method not implemented.");
    }
    async findAllByStudentId(id: string): Promise<StudentFamilyEntity[]> {
        try {
            const studentFamiliesSchema:StudentFamilySchema[] = await this.studentRepository.find({
                where: {
                    studentId: id
                },
                relations: ['parentFamily', 'parentFamily.relationship']
            });

            const students = StudentFamilyMapper.toDomainList(studentFamiliesSchema);

            if(students?.length === 0 )
               throw new NotFoundException(`student with id ${id} not found in the database`);
            return students || [];
        
        } catch (error) {
            return handlerExceptionError(error);
        }

    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}