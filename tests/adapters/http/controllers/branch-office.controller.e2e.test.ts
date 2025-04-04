import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import  * as request from 'supertest';
import { AppModule } from "src/app.module";

describe('Pruebas EndToEnd a branch.controller.ts', ()=>{
    let app: INestApplication;

    beforeAll( async ()=>{
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile(); 

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll( async ()=>{
        await app.close();
    });

    test('/branch (POST) debe registrar una sucursal(Branch)', async ()=>{
        const response = await request(app.getHttpServer())
            .post('/branches')
            .send({
                name: 'Sucursal Nueva',
                city: 'Ometepec', 
                district: 'Ometepec', 
                exteriorNumber: 'NA', 
                interiorNumber: '14', 
                postalCode: 41700, 
                state: 'Guerrero', 
                street: 'Juan Ruiz de Alarcon'
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('branchId');
    });
});