import { BranchOfficeMapper } from "src/adapters/persistence/mappers/branch-office.mapper";
import { BranchOfficeSchema } from "src/adapters/persistence/schemas";
import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";

describe('Pruebas al branch.mapper.ts', ()=>{
    test('Convertir de BranchOfficeShema a BranchOfficeEntity',()=>{
        const branchOfficeSchema:BranchOfficeSchema = {
            branchOfficeId: 1n,
            educationalCenterId: 1n,
            addressId: 1n,
            name: 'Sucursal',
            isActive: true,
            createdAt: new Date('2025-03-12'),
            updatedAt: new Date('2025-03-12'),
            address: undefined,
            parentFamilies: undefined,
            students: undefined,
        }

        const branchOfficeEntity = BranchOfficeMapper.toDomain(branchOfficeSchema);

        expect(branchOfficeEntity).toMatchObject(branchOfficeSchema)
    });

    test('Convertir de BranchOfficeEntity a BranchOfficeSchema',()=>{
        const branchOfficeEntity: BranchOfficeEntity = {
            branchOfficeId: 1n,
            educationalCenterId: 1n,
            addressId: 1n,
            name: 'Sucursal',
            isActive: true,
            createdAt: new Date('2025-03-12'),
            updatedAt: new Date('2025-03-12'),
            address: undefined,
            parentFamilies: undefined,
            students: undefined,
        }

        const branchOfficeSchema = BranchOfficeMapper.toPersistence(branchOfficeEntity);
        
        expect(branchOfficeSchema).toMatchObject(branchOfficeEntity)
    });
});