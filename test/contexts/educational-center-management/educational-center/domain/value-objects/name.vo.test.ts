// Metodología: Test Driven Development
// Ciclo de la metodología{TDD}: Red-Green-Refactor

import { Name } from "src/contexts/educational-center-management/educational-center/domain/values-objects/name.vo";

// Patron: Given-When-Then
describe('Pruebas unitarias al Value Object name.vo.ts',()=>{
    const validName = 'Centro Educativo de Prueba';
    const shortName = 'CE';
    const longName = 'C'.repeat(251);
    const emptyName = '';

    test('Debe crear correctamente la instancia con el nombre del centro educativo.',()=>{
        // Given
        let name:Name;
        // When
        name = Name.create(validName);
        // Then
        expect(name.value).toBe(validName);
    });

    
    test('Debe lanzar una exception porque el nombre del centro educativo es muy corto.',()=>{
        // Given
        // When
        //Then 
        expect(()=>Name.create(shortName)).toThrowError('El nombre debe tener como mínimo 3 caracteres.');
    });
    
    test('Debe lanzar una exception porque el nombre del centro educativo sobre pasa los 250 caracteres.',()=>{
        // Given
        // When
        //Then 
        expect(()=>Name.create(longName)).toThrowError('El nombre no debe ser mayor a 250 caracteres.');
    });

    test('Debe lanzar una exception porque el nombre del centro educativo está vacío.',()=>{
        // Given
        // When
        //Then 
        expect(()=>Name.create(emptyName)).toThrowError('El nombre no puede estar vacío.');
    });

    test('Debe comparar dos nombres de centros educativos que sean iguales.',()=>{
        //Given
        const validNameVo = Name.create(validName);
        const name = Name.create('Centro Educativo de Prueba');
        //When
        const isEqual = validNameVo.equals(name);
        //Then
        expect(isEqual).toBeTruthy();
    });

    test('Debe comparar dos nombres de centros educativos que sean diferentes.',()=>{
        //Given
        const validNameVo = Name.create(validName);
        const name = Name.create('Este nombre es diferente');
        //When
        const isEqual = validNameVo.equals(name);
        //Then
        expect(isEqual).not.toBeTruthy();
    });

    test('Debe retornar la cadena de texto instanciada',()=>{
        // Given
        const name = Name.create('Nombre de un centro educativo');
        // When
        // Then
        expect(name.value).toEqual('Nombre de un centro educativo');
    });
})