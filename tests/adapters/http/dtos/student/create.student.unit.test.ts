import { validate } from "class-validator";
import { CreateStudentDTO } from "../../../../../src/adapters/http/dtos/student/create.student.dto";

describe('Pruebas al create.student.dto.ts',()=>{
const createStudentDTO = new CreateStudentDTO();
    createStudentDTO.brothersNumber= 1;
    createStudentDTO.entryTime= '12:30';
    createStudentDTO.exitTime= '12:30';
    createStudentDTO.familyStatusId= '11';
    createStudentDTO.allergyDescription= undefined;
    createStudentDTO.nickname= 'TestPrueba';

    it('Validacion de los tipos de datos proporcionados',async()=>{
        const error = await validate(createStudentDTO);
        expect(error.length).toBe(0);
    });
});