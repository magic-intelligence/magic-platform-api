import { Test, TestingModule } from '@nestjs/testing';
import { BranchRepositoryImpl } from 'src/adapters/persistence/repositories/branch.repository.impl';
import {
  AddressSchema,
  BranchSchema,
  FamilyStatusSchema,
  ParentFamilySchema,
  RelationshipSchema,
  StudentFamilySchema,
  StudentSchema,
} from 'src/adapters/persistence/schemas';
import { TransactionModule } from 'src/infraestructure/database/typeorm/transactions/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { createMemoryDatabase } from 'src/shared/utils/pg-mem/create.memory.database';
import { Transactional } from 'src/infraestructure/database/typeorm/transactions/transactional.decorator';
import { AddressModule } from 'src/core/address/address.module';
import { BranchModule } from 'src/core/branch/branch.module';
import { INestApplication } from '@nestjs/common';

describe('Pruebas al branch.repository.impl.ts', () => {
  let app: INestApplication;
  let db: DataSource;
  let repository: BranchRepositoryImpl;
  let transactional: Transactional;

  beforeAll(async () => {
    jest.setTimeout(10000); // 10 segundos
    // Crear la BD en memoria
    db = await createMemoryDatabase();

    // Inicializar el módulo de pruebas
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'test',
          password: 'test',
          database: 'test',
          entities: [
            AddressSchema,
            BranchSchema,
            FamilyStatusSchema,
            ParentFamilySchema,
            RelationshipSchema,
            StudentFamilySchema,
            StudentSchema,
          ],
          synchronize: true,
        }),
        BranchModule,
        AddressModule,
        TransactionModule,
      ],
      providers: [
        {
          provide: Transactional,
          useValue: {
            getManager: () => db.manager, // Simula el transactional manager
          },
        },
        BranchRepositoryImpl,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    transactional = module.get<Transactional>(Transactional);
    repository = module.get<BranchRepositoryImpl>(BranchRepositoryImpl);
  });

  afterAll(async () => {
    await db.destroy();
    await app.close();
  });

  test('Debe guardar una sucursal(Branch)', async () => {
    jest.setTimeout(10000); // 10 segundos
    const branch: BranchSchema = {
      branchId: '1',
      addressId: '1',
      name: 'Sucursal Nueva',
      isActive: true,
      createdAt: new Date('2025-03-11T20:58:06.331Z'),
      updatedAt: new Date('2025-03-11T20:58:06.331Z'),
    };

    const result = await repository.save(branch);
    console.log(result);
    expect(result).not.toBeNull();
  });
});
