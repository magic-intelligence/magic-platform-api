import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { Student } from "../../../modules/student/domain/student";
import { StudentRepository } from "../../../modules/student/domain/student.repository"
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentTypeormEntity } from "../entities/student.typeorm.entity";
import { StudentMapper } from "../mappers/student.mapper";

@Injectable()
export class StudentTypeOrmRepository implements StudentRepository{
    private logger = new Logger('StudentTypeOrmRepository');
    constructor(
        @InjectRepository(StudentTypeormEntity)
        private readonly studentRepository: Repository<StudentTypeormEntity>, 
    ){}
    async save(student: Student): Promise<Student> {
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
    
    async findAll(): Promise<Student[]> {
        const studentsPersistence = await this.studentRepository.find();
        return StudentMapper.toDomainList(studentsPersistence);
    }
    findById(id: string): Promise<Student> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}