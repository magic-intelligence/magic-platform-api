import { INestApplication } from "@nestjs/common";
import { AppModule } from "src/app.module";
import { createMemoryDatabase } from "src/shared/utils/create.memory.database";
import {Test, TestingModule} from "@nestjs/testing";
import { DataSource } from "typeorm";
import { EducationalCenterOrmEntity } from "src/contexts/educational-center-management/educational-center/infraestruture/persistence/typeorm/entities/educational-center-orm-entity";
import * as request from 'supertest';

describe('EducationalCenterController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource; // Renombrado a dataSource para consistencia

  beforeAll(async () => {
    // 1. Se crea la BD en memoria antes de iniciar la app
    dataSource = await createMemoryDatabase();

    // 2. Se configura el módulo de pruebas de NestJS
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource) // Sobrescribe el DataSource por defecto
      .useValue(dataSource) // Usa nuestra base de datos en memoria
      .compile();

    // 3. Se crea y se inicializa la aplicación Nest
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    // 1. Destruir la conexión a la DB en memoria
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
    }
    // 2. Cerrar la aplicación Nest
    if (app) {
      await app.close();
    }
  });

  beforeEach(async () => {
    // Limpiar la tabla antes de cada prueba para asegurar independencia
    await dataSource.getRepository(EducationalCenterOrmEntity).clear();
  });

  // Espiar Date.now() para generar IDs predecibles en las entidades de dominio
  // Esto es útil si tu EducationalCenterEntity.create usa Date.now() para el ID
  // Si tu ID es autoincremental de la DB, puedes omitir esto.
  const fixedTimestamp = 1717088400000; // Un timestamp fijo
  jest.spyOn(Date, 'now').mockReturnValue(fixedTimestamp);
  afterAll(() => {
    jest.restoreAllMocks(); // Restaurar Date.now()
  });

  // --- POST /educational-centers ---
  describe('POST /educational-centers', () => {
    // GIVEN: Un DTO de request válido
    const validRequest = { name: 'Magic Intelligence Academy' };

    // WHEN: Se envía una petición POST con un nombre válido
    // THEN: Se debería crear un centro educativo y retornar 201
    test('Debe crear un centro educativo y retornar 201 CREATED', async () => {
      const response = await request(app.getHttpServer())
        .post('/educational-centers')
        .send(validRequest)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.educationalCenterId).toBeDefined(); // El ID debe ser un string BigInt
      expect(response.body.name).toBe(validRequest.name);
      expect(response.body.createdAt).toBeDefined();
      expect(response.body.updatedAt).toBeNull();
      expect(response.body.deletedAt).toBeNull();

      // Opcional: Verificar que la entidad existe en la base de datos
      const createdOrmEntity = await dataSource.getRepository(EducationalCenterOrmEntity).findOne({
        where: { educationalCenterId: BigInt(response.body.educationalCenterId) as any },
      });
      expect(createdOrmEntity).toBeDefined();
      expect(createdOrmEntity?.name).toBe(validRequest.name);
    });

    // WHEN: Se envía una petición POST con un nombre que ya existe
    // THEN: Se debería retornar 409 CONFLICT
    test('Debe retornar 409 CONFLICT si el centro educativo ya existe', async () => {
      // Primero, crear el centro educativo para que exista
      await request(app.getHttpServer())
        .post('/educational-centers')
        .send(validRequest)
        .expect(201); // Aseguramos que se creó

      // Intentar crearlo de nuevo con el mismo nombre
      const response = await request(app.getHttpServer())
        .post('/educational-centers')
        .send(validRequest)
        .expect(409); // Esperamos un 409 Conflict

      expect(response.body).toBeDefined();
      expect(response.body.message).toBe('Ya existe un centro educativo con ese nombre.');
    });

    // WHEN: Se envía una petición POST con un nombre inválido (ej. muy corto)
    // THEN: Se debería retornar 400 BAD REQUEST
    test('Debe retornar 400 BAD REQUEST si el nombre es demasiado corto', async () => {
      const invalidNameRequest = { name: 'ab' }; // Menos de 3 caracteres
      const response = await request(app.getHttpServer())
        .post('/educational-centers')
        .send(invalidNameRequest)
        .expect(400); // Esperamos un 400 Bad Request

      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual('El nombre debe tener como mínimo 3 caracteres.');
    });

    // WHEN: Se envía una petición POST con un nombre vacío
    // THEN: Se debería retornar 400 BAD REQUEST
    test('Debe retornar 400 BAD REQUEST si el nombre está vacío', async () => {
      const emptyNameRequest = { name: '' };
      const response = await request(app.getHttpServer())
        .post('/educational-centers')
        .send(emptyNameRequest)
        .expect(400);

      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual('El nombre no puede estar vacío.');
    });

    // WHEN: Se envía una petición POST sin nombre
    // THEN: Se debería retornar 400 BAD REQUEST
    test('Debe retornar 400 BAD REQUEST si falta el nombre', async () => {
      const noNameRequest = {}; // Objeto vacío
      const response = await request(app.getHttpServer())
        .post('/educational-centers')
        .send(noNameRequest)
        .expect(400);

      expect(response.body).toBeDefined();
      expect(response.body.message).toEqual('El nombre no puede estar vacío.'); // class-validator mensaje por defecto si no hay mensaje custom
    });
  });
})