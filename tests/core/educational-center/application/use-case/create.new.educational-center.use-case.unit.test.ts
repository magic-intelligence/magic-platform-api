
import { CreateNewEducationalCenterUseCase } from "src/core/educational-center/application/use-case/create.new.educational-center.use-case";
import { EducationalCenterEntity } from "src/core/educational-center/domain/entities/educational-center.entity";
import { EducationalCenterRepository } from "src/core/educational-center/domain/repositories/educational-center.repository";

// Metodología: Test Driven Development
// Ciclo de la metodología{TDD}: Red-Green-Refactor
// Patron: Given-When-Then
describe('Pruebas el create.new.educational-center.use-case.ts', ()=>{
    // Given
    let educationalCenter: jest.Mocked<EducationalCenterRepository>;
    let createNewEducationalCenterUseCase: CreateNewEducationalCenterUseCase;

    // When
    beforeEach(()=>{
        educationalCenter = {
            delete: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
        } as unknown as jest.Mocked<EducationalCenterRepository>

        createNewEducationalCenterUseCase = new CreateNewEducationalCenterUseCase(educationalCenter);
    });
    
    // Then
    test('Debe registrar un EducationalCenter correctamente', async ()=>{
        // Given
        const educationalCenterEntity: EducationalCenterEntity = {
            educationalCenterId: 1n,
            name: 'Magic Intelligence A.P. de R.L. de C.V.',
            isActive: true,
            createdAt: new Date("2025-03-11T20:58:06.331Z"),
            updatedAt: new Date("2025-03-11T20:58:06.331Z"),
        }
        educationalCenter.save.mockResolvedValue(educationalCenterEntity);
        
        // When
        const result = await createNewEducationalCenterUseCase.save({
            name: 'Magic Intelligence A.P. de R.L. de C.V.'
        });

        // Then
        expect(result).toEqual(educationalCenterEntity);
    });
});