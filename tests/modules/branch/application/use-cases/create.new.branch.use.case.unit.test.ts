import { CreateNewBranchUseCase } from "src/core/branch/application/use-cases/create.new.branch.use.case";
import { BranchEntity } from "src/core/branch/domain/entities/branch.entity";
import { BranchRepository } from "src/core/branch/domain/repository/branch.repository";

describe('Pruebas al create.new.branch.use.case.ts', ()=>{
    let branchRepository: jest.Mocked<BranchRepository>;
    let createNewBranchUseCase: CreateNewBranchUseCase;

    beforeEach(()=>{
        branchRepository = {
            delete: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
        } as unknown as jest.Mocked<BranchRepository>

        createNewBranchUseCase = new CreateNewBranchUseCase(branchRepository);
    });

    test('Debe registrar una Branch correctamente', async ()=>{
        const branch: BranchEntity = {
            branchId: '1',
            addressId: '1',
            name: 'Sucursal Nueva',
            isActive: true,
            createdAt: new Date("2025-03-11T20:58:06.331Z"),
            updatedAt: new Date("2025-03-11T20:58:06.331Z"),
        }

        branchRepository.save.mockResolvedValue(branch);

        const result = await createNewBranchUseCase.save({
            addressId: '1',
            name: 'Sucursal Nueva'
        });

        expect(result).toEqual(branch);
    });
});