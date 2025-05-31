import { validate } from "class-validator";
import { RegisterEducationalCenterRequestDto } from "src/contexts/educational-center-management/educational-center/presentation/http/dtos/register-educational-center-request.dto";

describe('Pruebas al dto de preentacion, register-educational-center-request.dto.ts', ()=>{
    // Dado un RegisterEducationalCenterRequestDto
  describe('Dado un RegisterEducationalCenterRequestDto', () => {

    // Cuando se proporciona un nombre válido
    describe('Cuando se proporciona un nombre válido', () => {
      it('Entonces no debería tener errores de validación', async () => {
        const dto = new RegisterEducationalCenterRequestDto();
        dto.name = 'Nombre de Centro Válido';
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
      });
    });

    // Cuando el nombre está vacío
    describe('Cuando el nombre está vacío', () => {
      it('Entonces debería tener un error "El nombre no puede estar vacío."', async () => {
        const dto = new RegisterEducationalCenterRequestDto();
        dto.name = ''; // Nombre vacío
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
        expect(errors[0].constraints?.isNotEmpty).toBe('El nombre no puede estar vacío.');
      });
    });

    // Cuando el nombre no es un string
    describe('Cuando el nombre no es un string', () => {
      it('Entonces debería tener un error "El nombre no puede ser un número."', async () => {
        const dto = new RegisterEducationalCenterRequestDto();
        // @ts-ignore para simular un tipo incorrecto en runtime
        dto.name = 123; // Número en lugar de string
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isString');
        expect(errors[0].constraints?.isString).toBe('El nombre no puede ser un número.');
      });
    });

    // Cuando el nombre es demasiado corto
    describe('Cuando el nombre es demasiado corto', () => {
      it('Entonces debería tener un error "El nombre debe tener como mínimo 3 caracteres."', async () => {
        const dto = new RegisterEducationalCenterRequestDto();
        dto.name = 'ab'; // Menos de 3 caracteres
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('minLength');
        expect(errors[0].constraints?.minLength).toBe('El nombre debe tener como mínimo 3 caracteres.');
      });
    });

    // Cuando el nombre es demasiado largo
    describe('Cuando el nombre es demasiado largo', () => {
      it('Entonces debería tener un error "El nombre no debe ser mayor a 250 caracteres."', async () => {
        const dto = new RegisterEducationalCenterRequestDto();
        dto.name = 'a'.repeat(251); // Más de 250 caracteres
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('maxLength');
        expect(errors[0].constraints?.maxLength).toBe('El nombre no debe ser mayor a 250 caracteres.');
      });
    });

    // Cuando el nombre es nulo o indefinido
    describe('Cuando el nombre es nulo o indefinido', () => {
      it('Entonces debería tener errores para isNotEmpty y isString (o solo isNotEmpty)', async () => {
        const dto = new RegisterEducationalCenterRequestDto();
        // @ts-ignore
        dto.name = null;
        let errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        // class-validator puede reportar isNotEmpty y isString para null/undefined
        const messages = errors.map(e => Object.values(e.constraints || {})).flat();
        expect(messages).toContain('El nombre no puede estar vacío.');

        // @ts-ignore
        dto.name = undefined;
        errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
        const messagesUndefined = errors.map(e => Object.values(e.constraints || {})).flat();
        expect(messagesUndefined).toContain('El nombre no puede estar vacío.');
      });
    });
  });
});