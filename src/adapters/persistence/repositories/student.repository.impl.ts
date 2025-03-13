import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { StudentEntity } from "../../../core/student/domain/entities/student.entity";
import { StudentRepository } from "../../../core/student/domain/repositories/student.repository"
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentSchema } from "../schemas/student.schema";
import { StudentMapper } from "../mappers/student.mapper";
import { Transactional } from "src/infraestructure/database/typeorm/transactions/transactional.decorator";
import { handlerExceptionError } from "src/shared/exceptions/handler.exception.error";

@Injectable()
export class StudentRepositoryImpl implements StudentRepository{
    private logger = new Logger('StudentRepositoryImpl');
    constructor(
        // @InjectRepository(StudentSchema)
        // private readonly studentRepository: Repository<StudentSchema>,
        private readonly transactional: Transactional,
    ){}
    async save(student: StudentEntity): Promise<StudentEntity> {
        try {
            const manager = this.transactional.getManager();
            const transactionRepository = manager.getRepository(StudentSchema);
            const persistenceEntity = StudentMapper.toPersistence(student);
            const savedEntity = await transactionRepository.save(persistenceEntity);
            return StudentMapper.toDomain(savedEntity);
        } catch (error) {
            return handlerExceptionError(error);
        }
    }
    
    async findAll(): Promise<StudentEntity[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<StudentEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}