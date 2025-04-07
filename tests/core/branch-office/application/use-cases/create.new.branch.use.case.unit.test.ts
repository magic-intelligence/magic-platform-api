import { CreateNewBranchOfficeUseCase } from "src/core/branch-office/application/use-cases/create.new.branch-office.use.case";
import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";
import { BranchOfficeRepository } from "src/core/branch-office/domain/repository/branch-office.repository";

// Metodología: Test Driven Development
// Ciclo de la metodología{TDD}: Red-Green-Refactor
// Patron: Given-When-Then
describe('Pruebas al create.new.branch.use.case.ts', ()=>{
    // Given
    let branchOfficeRepository: jest.Mocked<BranchOfficeRepository>;
    let createNewBranchOfficeUseCase: CreateNewBranchOfficeUseCase;

    // When
    beforeEach(()=>{
        branchOfficeRepository = {
            delete: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
        } as unknown as jest.Mocked<BranchOfficeRepository>

        createNewBranchOfficeUseCase = new CreateNewBranchOfficeUseCase(branchOfficeRepository);
    });

    // Then
    test('Debe registrar una BranchOffice correctamente', async ()=>{
        // Given
        const branchOffice: BranchOfficeEntity = {
            branchOfficeId: 1n,
            educationalCenterId: 1n,
            addressId: 1n,
            name: 'Sucursal Nueva',
            isActive: true,
            createdAt: new Date("2025-03-11T20:58:06.331Z"),
            updatedAt: new Date("2025-03-11T20:58:06.331Z"),
        }
        branchOfficeRepository.save.mockResolvedValue(branchOffice);

        // When
        const result = await createNewBranchOfficeUseCase.save({
            addressId: 1n,
            educationalCenterId: 1n,
            name: 'Sucursal Nueva'
        });

        // Then
        expect(result).toEqual(branchOffice);
    });
});