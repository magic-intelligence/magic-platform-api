// import { CreateEducationalCenterDTO } from "src/core/educational-center/adapters/http/dtos/create.educational-center.dto";
// import { EducationalCenterService } from "src/core/educational-center/application/services/educational-center.service";
// import { CreateNewEducationalCenterUseCase } from "src/core/educational-center/application/use-case/create.new.educational-center.use-case";
// import { EducationalCenterEntity } from "src/core/educational-center/domain/entities/educational-center.entity";
// import { EducationalCenterRepository } from "src/core/educational-center/domain/repositories/educational-center.repository";
// import { EducationalCenterNameVO } from "src/core/educational-center/value-objects/educational-center.name.vo";

// // Metodología: Test Driven Development
// // Ciclo de la metodología{TDD}: Red-Green-Refactor
// // Patron: Given-When-Then
// describe('Pruebas el educational-center.service.ts', ()=>{
//     // Given
//     let educationalCenterService: EducationalCenterService;
//     let educationalCenter: jest.Mocked<EducationalCenterRepository>;
//     let createNewEducationalCenterUseCase: jest.Mocked<CreateNewEducationalCenterUseCase>;
//     // When
//     beforeEach(()=>{
//         educationalCenter = {
//                     delete: jest.fn(),
//                     findAll: jest.fn(),
//                     findById: jest.fn(),
//                     save: jest.fn(),
//                 } as unknown as jest.Mocked<EducationalCenterRepository>
                
//         createNewEducationalCenterUseCase = {
//             save: jest.fn(),
//         } as unknown as jest.Mocked<CreateNewEducationalCenterUseCase>;

//         educationalCenterService = new EducationalCenterService(educationalCenter);
//     });

//     // Then
//     test('Debe llamar al caso de uso createNewEducativeCenterUseCase.save()',async ()=>{
//         // Given
//         const entity: EducationalCenterEntity = {
//             name: EducationalCenterNameVO.create('Magic Intelligence'),
//         }

//         // Mock de la respuesta esperada
//         const expectedResponse = {
//             educationalCenterId: 1n,
//             name: EducationalCenterNameVO.create('Magic Intelligence'),
//             isActive: true,
//             createdAt: new Date("2025-03-11T20:58:06.331Z"),
//             updatedAt: new Date("2025-03-11T20:58:06.331Z"),
//         };
//         createNewEducationalCenterUseCase.execute.mockResolvedValue(expectedResponse);

//         // When
//         const result = await educationalCenterService.save(entity);

//         // Then
//         expect(createNewEducationalCenterUseCase.execute).toHaveBeenCalledWith(entity);
//         expect(result).toEqual(expectedResponse);
//     });


// })