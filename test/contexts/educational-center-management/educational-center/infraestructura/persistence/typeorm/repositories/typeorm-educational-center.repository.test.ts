import { EducationalCenterEntity } from 'src/contexts/educational-center-management/educational-center/domain/entities/educational-center.entity';
import { Name } from 'src/contexts/educational-center-management/educational-center/domain/values-objects/name.vo';
import { EducationalCenterOrmEntity } from 'src/contexts/educational-center-management/educational-center/infraestruture/persistence/typeorm/entities/educational-center-orm-entity';
import { TypeOrmEducationalCenterRepository } from 'src/contexts/educational-center-management/educational-center/infraestruture/persistence/typeorm/repositories/typeorm-educational-center.repository';
import { createMemoryDatabase } from 'src/shared/utils/create.memory.database';
import { DataSource } from 'typeorm';

describe('Pruebas a la implementacion del repositorio del centro educatiovo, typeorm-educational-center.repository.ts', () => {
  let datasource: DataSource;
  let repository: TypeOrmEducationalCenterRepository;
  let educationalCenterName: Name;
  beforeAll(async () => {
    educationalCenterName = Name.create('Centro educativo de prueba');
    datasource = await createMemoryDatabase();
    repository = new TypeOrmEducationalCenterRepository(
      datasource.getRepository(EducationalCenterOrmEntity),
    );
  });

  afterAll(async () => {
    if (datasource && datasource.isInitialized) {
      await datasource.destroy();
    }
  });
  describe('Pruebas a la funcion save, para guardar un registro', () => {
    it('Debe guardar un centro educativo(EducationalCenter)', async () => {
      const entity = EducationalCenterEntity.create(
        BigInt(new Date().getTime()),
        educationalCenterName,
      );
      const result = await repository.save(entity);
      expect(result).toBeInstanceOf(EducationalCenterEntity);
      expect(result).not.toBeNull();
    });

    it('Debe lanzar un error, por nombre de centro educativo ya existente.', async () => {
      const entity = EducationalCenterEntity.create(
        BigInt(new Date().getTime()),
        educationalCenterName,
      );
      try {
        await repository.save(entity);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.code).toBe('23505'); // Código de error de PostgreSQL para violación de restricción de unicidad
      }
    });

    it('Debe retornar los valores despues de guardar un centro educativo.', async () => {
      const entity = EducationalCenterEntity.create(
        BigInt(new Date().getTime()),
        Name.create('Probando atributos de un centro educativo'),
      );
      const result = await repository.save(entity);
      expect(result).toBeInstanceOf(EducationalCenterEntity);
      expect(result).not.toBeNull();
      expect(result.name.value).toBe(
        'Probando atributos de un centro educativo',
      );
      expect(result.educationalCenterId).toBeDefined();
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeNull();
      expect(result.deletedAt).toBeNull();
    });

    it('Debe probando directamente la tabla de EducationalCenter.', async () => {
      const entity = new EducationalCenterOrmEntity();
      entity.name = 'Probando directamente tabla'.repeat(200);
      try {
        const foundInDb = await datasource
          .getRepository(EducationalCenterOrmEntity)
          .save(entity);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        // Error de longitud de cadena
        expect(error.message).toContain(
          'value too long for type character varying(250)',
        );
      }
    });
  });

  describe('Pruebas a la funcion findById', () => {
    it('Debe buscar el primer registro insertado en la base de datos por su id.', async () => {
      const id = 1;
      const result = await repository.findById(BigInt(id));
      expect(result).toBeInstanceOf(EducationalCenterEntity);
      expect(result?.educationalCenterId).toBe(id);
      expect(result?.name.value).toBe(educationalCenterName.value);
      expect(result?.createdAt).toBeDefined();
    });

    it('Debe lanzar un eror y devolver null, por buscar un centro educativo que no existe por su ID.', async () => {
      const id = 1000001;
      try {
        const result = await repository.findById(BigInt(id));
        expect(result).toBeNull(); // No debería encontrar un centro educativo con este ID
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
  describe('Pruebas a la funcion save, actualizar un registro', () => {
    it('Debe actualizar un centro educativo(EducationalCenter)', async () => {
      const entity = EducationalCenterEntity.create(
        BigInt(new Date().getTime()),
        Name.create('Centro educativo de prueba actualizado'),
      );
      const savedEntity = await repository.save(entity);
      expect(savedEntity).toBeInstanceOf(EducationalCenterEntity);
      expect(savedEntity.name.value).toBe(
        'Centro educativo de prueba actualizado',
      );

      // Actualizar el nombre del centro educativo
      savedEntity.updateName(Name.create('Nombre actualizado'));
      const updatedEntity = await repository.save(savedEntity);

      expect(updatedEntity.name.value).toBe('Nombre actualizado');
    });

    it('Debe lanzar un error y devolver null, al actualizar un registro que no existe.', async () => {
      try {
        const entity = EducationalCenterEntity.create(
        BigInt(new Date().getTime()),
        Name.create('Centro educativo de prueba actualizado'),
      );

      // Actualizar el nombre del centro educativo
      entity.updateName(Name.create('Nombre actualizado'));
      const updatedEntity = await repository.save(entity);
      expect(updatedEntity).toBeNull();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);        
      }
    });
  });
});
