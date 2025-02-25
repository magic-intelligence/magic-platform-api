import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { StudentEntity } from "../../../core/student/domain/entities/student.entity";
import { StudentRepository } from "../../../core/student/domain/repositories/student.repository"
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentSchema } from "../schemas/student.schema";
import { StudentMapper } from "../mappers/student.mapper";

@Injectable()
export class StudentRepositoryImpl implements StudentRepository{
    private logger = new Logger('StudentRepositoryImpl');
    constructor(
        @InjectRepository(StudentSchema)
        private readonly studentRepository: Repository<StudentSchema>, 
    ){}
    async save(student: StudentEntity): Promise<StudentEntity> {
        try {
            // Convertimos la entidad de dominio a entidad TypeORM
            const persistenceEntity = StudentMapper.toPersistence(student);
        
            // Guardamos en la base de datos
            const savedEntity = await this.studentRepository.save(persistenceEntity);
            
            // Convertimos de vuelta a entidad de dominio
            return StudentMapper.toDomain(savedEntity);
        } catch (error) {
            this.logger.error(error);
            console.log(error);
            throw new BadRequestException(error.detail);
        }
    }
    
    async findAll(): Promise<StudentEntity[]> {
        const studentsPersistence = await this.studentRepository.find();
        return StudentMapper.toDomainList(studentsPersistence);
    }
    findById(id: string): Promise<StudentEntity> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}