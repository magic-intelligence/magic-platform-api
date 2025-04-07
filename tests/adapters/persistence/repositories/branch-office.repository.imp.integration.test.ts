import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { BranchOfficeRepositoryImpl } from "src/adapters/persistence/repositories/branch-office.repository.impl";
import { BranchOfficeSchema } from "src/adapters/persistence/schemas";
import { AppModule } from "src/app.module";
import { Transactional } from "src/infraestructure/database/typeorm/transactions/transactional.decorator";
import { createMemoryDatabase } from "src/shared/utils/pg-mem/create.memory.database";
import { DataSource } from "typeorm";

// Metodología: Behavior Driven Development
// Patron: Given-When-Then
describe('Pruebas al branch.repository.impl.ts', ()=>{
    let app: INestApplication;
    let datasource: DataSource;
    let repository: BranchOfficeRepositoryImpl;
    let transactional: Transactional;

    beforeAll(async ()=>{
        datasource = await createMemoryDatabase();

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                {
                  provide: Transactional,
                  useValue: {
                    getManager: () => datasource.manager, // Simula el transactional manager
                  },
                },
                BranchOfficeRepositoryImpl,
              ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
        transactional = moduleFixture.get<Transactional>(Transactional);
        repository = moduleFixture.get<BranchOfficeRepositoryImpl>(BranchOfficeRepositoryImpl);
    });

    afterAll(async () => {
        if (datasource && datasource.isInitialized) {
            await datasource.destroy();
        }
        if (app) {
            await app.close();
        }
    });

    test('Debe guardar una sucursal(Branch)', async () => {
        const branch: BranchOfficeSchema = {
          branchOfficeId: 1n,
          addressId: 1n,
          educationalCenterId: 1n,
          name: 'Sucursal Nueva',
          isActive: true,
          createdAt: new Date('2025-03-11T20:58:06.331Z'),
          updatedAt: new Date('2025-03-11T20:58:06.331Z'),
        };
    
        const result = await repository.save(branch);
        console.log(result, 'resultadoooooooooooooooooooooooooooooooo');
        expect(result).not.toBeNull();
      });
});