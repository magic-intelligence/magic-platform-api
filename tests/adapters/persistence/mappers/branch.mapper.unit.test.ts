import { BranchMapper } from "src/adapters/persistence/mappers/branch.mapper";
import { BranchSchema } from "src/adapters/persistence/schemas";
import { BranchEntity } from "src/core/branch/domain/entities/branch.entity";

describe('Pruebas al branch.mapper.ts', ()=>{
    test('Convertir de BranchShema a BranchEntity',()=>{
        const branchSchema:BranchSchema = {
            branchId: '1',
            addressId: '1',
            name: 'Sucursal',
            isActive: true,
            createdAt: new Date('2025-03-12'),
            updatedAt: new Date('2025-03-12'),
            address: undefined,
            parentFamilies: undefined,
            students: undefined,
        }

        const branchEntity = BranchMapper.toDomain(branchSchema);

        expect(branchEntity).toMatchObject(branchSchema)
    });

    test('Convertir de BranchEntity a BranchSchema',()=>{
        const branchEntity: BranchEntity = {
            branchId: '1',
            addressId: '1',
            name: 'Sucursal',
            isActive: true,
            createdAt: new Date('2025-03-12'),
            updatedAt: new Date('2025-03-12'),
            address: undefined,
            parentFamilies: undefined,
            students: undefined,
        }

        const branchSchema = BranchMapper.toPersistence(branchEntity);
        
        expect(branchSchema).toMatchObject(branchEntity)
    });
});