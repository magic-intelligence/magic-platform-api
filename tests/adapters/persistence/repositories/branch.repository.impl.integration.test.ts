import { Test, TestingModule } from "@nestjs/testing";
import { BranchRepositoryImpl } from "src/adapters/persistence/repositories/branch.repository.impl";
import { AddressSchema, BranchSchema, FamilyStatusSchema, ParentFamilySchema, RelationshipSchema, StudentFamilySchema, StudentSchema } from "src/adapters/persistence/schemas";
import { TransactionModule } from "src/infraestructure/database/typeorm/transactions/transaction.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { PgMemDatabaseModule } from "src/shared/utils/pg-mem/pg.mem.database.module";
import { Transactional } from "src/infraestructure/database/typeorm/transactions/transactional.decorator";

describe('Pruebas al branch.repository.impl.ts', ()=>{
    let repository: BranchRepositoryImpl;
    let dataSource: DataSource;

    
    beforeEach( async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                PgMemDatabaseModule,
                TransactionModule
            ],
            providers: [
                BranchRepositoryImpl,
                {
                    provide: Transactional,
                    useValue: {
                        execute: jest.fn(fn => fn())
                    }
                }
            ],
        }).compile();

        repository = module.get<BranchRepositoryImpl>(BranchRepositoryImpl);
        dataSource = module.get<DataSource>(DataSource);
    });
    
    afterAll( async ()=>{
        await dataSource.destroy();
    });

    test('Debe guardar una sucursal(Branch)', async ()=>{
        jest.setTimeout(10000);
        const branch: BranchSchema = {
            branchId: '1',
            addressId: '1',
            name: 'Sucursal Nueva',
            isActive: true,
            createdAt: new Date("2025-03-11T20:58:06.331Z"),
            updatedAt: new Date("2025-03-11T20:58:06.331Z"),
        }

        const result = await repository.save(branch);
        console.log(result);
        expect(result).not.toBeNull();
    });
});