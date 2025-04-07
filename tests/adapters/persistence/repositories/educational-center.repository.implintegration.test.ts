import { EducationalCenterRepositoryImpl } from 'src/adapters/persistence/repositories/educational-center.repository.impl';
import { EducationalCenterSchema } from 'src/adapters/persistence/schemas/educational-center.schema';
import { createMemoryDatabase } from 'src/shared/utils/pg-mem/create.memory.database';
import { DataSource } from 'typeorm';

// Metodología: Behavior Driven Development
// Patron: Given-When-Then
describe('Pruebas al educational-center.repository.impl.ts', () => {
  let datasource: DataSource;
  let repository: EducationalCenterRepositoryImpl;

  beforeAll(async () => {
    datasource = await createMemoryDatabase();
    repository = new EducationalCenterRepositoryImpl(
      datasource.getRepository(EducationalCenterSchema),
    );
  });

  afterAll(async () => {
    if (datasource && datasource.isInitialized) {
      await datasource.destroy();
    }
  });

  // Then
  test('Debe guardar un centro educativo(EducativeCenter)', async () => {
    // Given
    const schema: EducationalCenterSchema = {
      name: 'Magic Intelligence',
    };
    // When
    const result = await repository.save(schema);
    console.log('result', result);
    // Then
    expect(result).not.toBeNull();
  });

  // Then
  test('Debe lanzar un error por centro educativo duplicado', async () => {
    // Given
    const schema: EducationalCenterSchema = {
      name: 'Magic Intelligence',
    };
    // Then
    await expect(repository.save(schema)).rejects.toThrow();
  });
});
