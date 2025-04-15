import { BranchOfficeMapper } from "src/core/branch-office/adapters/persistence/mappers/branch-office.mapper";
import { BranchOfficeSchema } from "src/core/branch-office/adapters/persistence/schemas/branch-office.schema";
import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";

// Metodología: Test Driven Development
// Ciclo de la metodología{TDD}: Red-Green-Refactor
// Patron: Given-When-Then
describe('Pruebas al branch.mapper.ts', ()=>{
    test('Convertir de BranchOfficeShema a BranchOfficeEntity',()=>{
        // Given
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

        // When
        const branchOfficeEntity = BranchOfficeMapper.toDomain(branchOfficeSchema);

        // Then
        // Se espera que el objeto branchOfficeEntity contenga las propiedades de branchOfficeSchema
        expect(branchOfficeEntity).toMatchObject(branchOfficeSchema)
    });

    test('Convertir de BranchOfficeEntity a BranchOfficeSchema',()=>{
        // Given
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

        // When
        const branchOfficeSchema = BranchOfficeMapper.toPersistence(branchOfficeEntity);
        
        // Then
        // Se espera que el objeto branchOfficeSchema contenga las propiedades de branchOfficeEntity
        expect(branchOfficeSchema).toMatchObject(branchOfficeEntity)
    });
});