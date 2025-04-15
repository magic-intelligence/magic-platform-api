import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AddressRepositoryImpl } from 'src/core/address/adapters/persistence/repositories/address.repository.impl';
import { AddressSchema } from 'src/core/address/adapters/persistence/schemas/address.schema';
import { AppModule } from 'src/app.module';
import { Transactional } from 'src/infraestructure/database/typeorm/transactions/transactional.decorator';
import { createMemoryDatabase } from 'src/shared/utils/create.memory.database';
import { DataSource } from 'typeorm';

// Metodología: Behavior Driven Development
// Patron: Given-When-Then
describe('Pruebas al address.repository.impl.ts', () => {
  // Given
  let app: INestApplication;
  let datasource: DataSource;
  let repository: AddressRepositoryImpl;
  let transactional: Transactional;

  // When
  beforeAll(async () => {
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
        AddressRepositoryImpl,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    transactional = moduleFixture.get<Transactional>(Transactional);
    repository = moduleFixture.get<AddressRepositoryImpl>(
      AddressRepositoryImpl,
    );
  });

  afterAll(async () => {
    if (datasource && datasource.isInitialized) {
      await datasource.destroy();
    }
    if (app) {
      await app.close();
    }
  });

  // Then
  test('Debe guardar una dirección', async () => {
    // Given
    const address: AddressSchema = {
      city: 'Ometepec',
      district: 'Ometepec',
      exteriorNumber: 'NA',
      interiorNumber: '14',
      postalCode: 41700,
      state: 'Guerrero',
      street: 'Juan Ruiz de Alarcon',
    };
    // When
    const result = await repository.save(address);
    console.log('Resulta: ' + result);
    // Then
    expect(result).not.toBeNull();
  });
});
