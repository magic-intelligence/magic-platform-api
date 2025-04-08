import { CreateEducationalCenterDTO } from "src/adapters/educational-center/http/dtos/create.educational-center.dto";
import { EducationalCenterService } from "src/core/educational-center/application/services/educational-center.service";
import { CreateNewEducationalCenterUseCase } from "src/core/educational-center/application/use-case/create.new.educational-center.use-case";

// Metodología: Test Driven Development
// Ciclo de la metodología{TDD}: Red-Green-Refactor
// Patron: Given-When-Then
describe('Pruebas el educational-center.service.ts', ()=>{
    // Given
    let educationalCenterService: EducationalCenterService;
    let createNewEducationalCenterUseCase: jest.Mocked<CreateNewEducationalCenterUseCase>;
    // When
    beforeEach(()=>{
        createNewEducationalCenterUseCase = {
            save: jest.fn(),
        } as unknown as jest.Mocked<CreateNewEducationalCenterUseCase>;

        educationalCenterService = new EducationalCenterService(createNewEducationalCenterUseCase);
    });

    // Then
    test('Debe llamar al caso de uso createNewEducativeCenterUseCase.save()',async ()=>{
        // Given
        const dto: CreateEducationalCenterDTO = {
            name: 'Magic Intelligence',
        }

        // Mock de la respuesta esperada
        const expectedResponse = {
            educationalCenterId: 1n,
            name: 'Magic Intelligence',
            isActive: true,
            createdAt: new Date("2025-03-11T20:58:06.331Z"),
            updatedAt: new Date("2025-03-11T20:58:06.331Z"),
        };
        createNewEducationalCenterUseCase.save.mockResolvedValue(expectedResponse);

        // When
        const result = await educationalCenterService.saveNewEducationalCenter(dto);

        // Then
        expect(createNewEducationalCenterUseCase.save).toHaveBeenCalledWith(dto);
        expect(result).toEqual(expectedResponse);
    });


})