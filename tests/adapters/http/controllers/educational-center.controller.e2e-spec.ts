import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { createMemoryDatabase } from 'src/shared/utils/pg-mem/create.memory.database';
import { DataSource } from 'typeorm';
import { AppModule } from 'src/app.module';

// Metodología: Behavior Driven Development
// Patron: Given-When-Then
describe('Pruebas al educational-center.controller.e2e-spec.ts', () => {
    // Given
    let app: INestApplication;
    let datasource: DataSource;

    // When
    beforeAll(async () => {
        // Se crea la BD en memoria antes de iniciar la app
        datasource = await createMemoryDatabase();

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        })
        .overrideProvider(DataSource) 
        .useValue(datasource)
        .compile(); // Sobrescribe el DataSource con pg-mem

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    // When
    afterAll(async () => {
        if (datasource && datasource.isInitialized) {
            await datasource.destroy();
        }
        if (app) {
            await app.close();
        }
    });

    // Then
    test('Se hace la petición y debe crear un centro educativo', async () => {
        const response = await request(app.getHttpServer())
            .post('/educational-centers')
            .send({ name: 'Magic Intelligence' })
            .expect(201);

        expect(response.body).toBeDefined();
        expect(response.body.educationalCenterId).toBeDefined();
        expect(response.body.name).toBe('Magic Intelligence');
    });
    
    // Then
    test('Debe devolver un codigo http 409, cuando ya hya un centro con el mismo nombre', async () => {            
            await request(app.getHttpServer())
            .post('/educational-centers')
            .send({ name: 'Magic Intelligence' })
            .expect(409);
        });
});
