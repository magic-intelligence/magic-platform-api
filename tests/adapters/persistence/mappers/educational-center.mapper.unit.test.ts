import { EducationalCenterMapper } from "src/adapters/persistence/mappers/educational-center.mapper";
import { EducationalCenterSchema } from "src/adapters/persistence/schemas/educational-center.schema";
import { EducationalCenterEntity } from "src/core/educational-center/domain/entities/educational-center.entity";

// Metodología: Test Driven Development
// Ciclo de la metodología{TDD}: Red-Green-Refactor
// Patron: Given-When-Then
describe('Pruebas al educational-center.mapper.ts', ()=>{
    test('Convertir de EducationalCenterShema a EducationalCenterEntity',()=>{
        // Given
        const educationalCenterSchema:EducationalCenterSchema = {
            educationalCenterId: 1n,
            name: 'Magic Intelligence',
            isActive: true,
            createdAt: new Date('2025-03-12'),
            updatedAt: new Date('2025-03-12'),
        }

        // When
        const educationalCenterEntity = EducationalCenterMapper.toDomain(educationalCenterSchema);

        // Then
        expect(educationalCenterEntity).toMatchObject(educationalCenterSchema)
    });

    test('Convertir de EducationalCenterEntity a EducationalCenterSchema',()=>{
        // Given
        const educationalCenterEntity: EducationalCenterEntity = {
            educationalCenterId: 1n,
            name: 'Magic Intelligence',
            isActive: true,
            createdAt: new Date('2025-03-12'),
            updatedAt: new Date('2025-03-12'),
        }
        
        // When
        const educationalCenterSchema = EducationalCenterMapper.toPersistence(educationalCenterEntity);
        
        // Then
        expect(educationalCenterSchema).toMatchObject(educationalCenterEntity)
    });
});