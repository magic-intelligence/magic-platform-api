import { CreateBranchDTO } from "src/adapters/http/dtos/branch/create.branch.dto";
import { BranchService } from "src/core/branch/application/services/branch.service";
import { CreateNewBranchUseCase } from "src/core/branch/application/use-cases/create.new.branch.use.case";
import { BranchEntity } from "src/core/branch/domain/entities/branch.entity";

describe('Pruebas al branch.service.ts', ()=>{
    let branchService: BranchService;
    let createNewBranchUseCase: jest.Mocked<CreateNewBranchUseCase>;

    beforeEach(() => {
        // Mock del caso de uso
        createNewBranchUseCase = {
            save: jest.fn(),
        } as unknown as jest.Mocked<CreateNewBranchUseCase>;

        // Instancia de BranchService con el mock inyectado
        branchService = new BranchService(createNewBranchUseCase);
    });

    test("Debe llamar a createNewBranchUseCase.save() con los datos correctos", async () => {
        // Arrange (Preparar datos)
        const dto: CreateBranchDTO = {
            addressId: "123",
            name: "Sucursal Central",
        };

        // Mock de la respuesta esperada
        const expectedResponse: BranchEntity = {
            name: "Sucursal Monterreyy",
            addressId: "6",
            isActive: true,
            createdAt: new Date("2025-03-11T20:58:06.331Z"),
            updatedAt: new Date("2025-03-11T20:58:06.331Z"),
            branchId: "5"
        };
        createNewBranchUseCase.save.mockResolvedValue(expectedResponse);

        // Act (Ejecutar función)
        const result = await branchService.saveNewBranch(dto);

        // Assert (Verificar resultados)
        expect(createNewBranchUseCase.save).toHaveBeenCalledWith(dto);
        expect(result).toEqual(expectedResponse);
    });

});