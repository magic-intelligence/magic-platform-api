import { CreateStudentDTO } from "../../../../../src/adapters/http/dtos/student/create.student.dto";
import { BasicInformationStudentUseCase } from "../../../../../src/core/student/application/use-cases/basic.information.student.use.case";
import { StudentRepository } from "../../../../../src/core/student/domain/repositories/student.repository";

describe('Informacion básica del estudiante',()=>{
    let useCase: BasicInformationStudentUseCase;
    let studentRepository: StudentRepository;

    const dto = new CreateStudentDTO();
    dto.brothersNumber= 1;
    dto.entryTime= '49:30';
    dto.exitTime= '12:30';
    dto.familyStatusId= '45a7fc8b-f96e-4a22-be0d-0c74fde0ad3e';
    dto.allergyDescription= undefined;
    dto.nickname= 'TestPrueba';

    beforeEach(()=>{
        studentRepository = {
            delete: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn()
        };

        useCase = new BasicInformationStudentUseCase(studentRepository);
    });



    it('Insertar la informacion basica',async()=>{
        await useCase.execute(dto);
        expect(studentRepository.save).toHaveBeenCalled();
    });
});