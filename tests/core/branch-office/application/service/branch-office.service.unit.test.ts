import { CreateBranchOfficeDTO } from "src/core/branch-office/adapters/http/dtos/create.branch-office.dto";
import { BranchOfficeService } from "src/core/branch-office/application/services/branch-office.service";
import { CreateNewBranchOfficeUseCase } from "src/core/branch-office/application/use-cases/create.new.branch-office.use.case";
import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity"

// Metodología: Test Driven Development
// Ciclo de la metodología{TDD}: Red-Green-Refactor
// Patron: Given-When-Then
describe('Pruebas al branch.service.ts', ()=>{
    // Given
    let branchOfficeService: BranchOfficeService;
    let createNewBranchOfficeUseCase: jest.Mocked<CreateNewBranchOfficeUseCase>;

    // When
    beforeEach(() => {
        // Mock del caso de uso
        createNewBranchOfficeUseCase = {
            save: jest.fn(),
        } as unknown as jest.Mocked<CreateNewBranchOfficeUseCase>;

        // Instancia de BranchOfficeService con el mock inyectado
        branchOfficeService = new BranchOfficeService(createNewBranchOfficeUseCase);
    });


    // Then
    test("Debe llamar a createNewBranchOfficeUseCase.save() con los datos correctos", async () => {
        // Given
        const dto: CreateBranchOfficeDTO = {
            addressId: 123n,
            educationalCenterId: 1n,
            name: "Sucursal Central",
        };
        const expectedResponse: BranchOfficeEntity = {
            name: "Sucursal Monterreyy",
            educationalCenterId: 1n,
            addressId: 6n,
            isActive: true,
            createdAt: new Date("2025-03-11T20:58:06.331Z"),
            updatedAt: new Date("2025-03-11T20:58:06.331Z"),
            branchOfficeId: 5n
        };
        createNewBranchOfficeUseCase.save.mockResolvedValue(expectedResponse);

        // When
        const result = await branchOfficeService.saveNewBranch(dto);

        // Then
        expect(createNewBranchOfficeUseCase.save).toHaveBeenCalledWith(dto);
        expect(result).toEqual(expectedResponse);
    });

});