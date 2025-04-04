import { CreateBranchOfficeDTO } from "src/adapters/http/dtos/branch-office/create.branch-office.dto";
import { BranchOfficeService } from "src/core/branch-office/application/services/branch-office.service";
import { CreateNewBranchOfficeUseCase } from "src/core/branch-office/application/use-cases/create.new.branch-office.use.case";
import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity"
describe('Pruebas al branch.service.ts', ()=>{
    let branchOfficeService: BranchOfficeService;
    let createNewBranchOfficeUseCase: jest.Mocked<CreateNewBranchOfficeUseCase>;

    beforeEach(() => {
        // Mock del caso de uso
        createNewBranchOfficeUseCase = {
            save: jest.fn(),
        } as unknown as jest.Mocked<CreateNewBranchOfficeUseCase>;

        // Instancia de BranchOfficeService con el mock inyectado
        branchOfficeService = new BranchOfficeService(createNewBranchOfficeUseCase);
    });

    test("Debe llamar a createNewBranchOfficeUseCase.save() con los datos correctos", async () => {
        // Arrange (Preparar datos)
        const dto: CreateBranchOfficeDTO = {
            addressId: 123n,
            educationalCenterId: 1n,
            name: "Sucursal Central",
        };

        // Mock de la respuesta esperada
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

        // Act (Ejecutar función)
        const result = await branchOfficeService.saveNewBranch(dto);

        // Assert (Verificar resultados)
        expect(createNewBranchOfficeUseCase.save).toHaveBeenCalledWith(dto);
        expect(result).toEqual(expectedResponse);
    });

});