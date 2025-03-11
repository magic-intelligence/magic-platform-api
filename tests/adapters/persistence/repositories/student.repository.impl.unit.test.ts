import { StudentRepositoryImpl } from 'src/adapters/persistence/repositories/student.repository.impl';
import { StudentSchema } from 'src/adapters/persistence/schemas';
import { Transactional } from 'src/infraestructure/database/typeorm/transactions/transactional.decorator';
import { StudentEntity } from 'src/core/student/domain/entities/student.entity';
import { DataSource, EntityManager } from 'typeorm';
import createMemoryDatabase from 'src/infraestructure/database/pg-mem/create.memory.database';
import { TransactionContext } from 'src/infraestructure/database/typeorm/transactions/transaction.context';

describe('StudentRepositoryImpl', () => {
  let studentRepositoryImpl: StudentRepositoryImpl;
  let transactional: Transactional;
  let db: DataSource;

  afterAll(async ()=>{
    db = await createMemoryDatabase([StudentSchema]);
    
    transactional = new Transactional( await new TransactionContext());
    studentRepositoryImpl = new StudentRepositoryImpl(db.getRepository(StudentSchema), transactional);
  });

  it('should be defined', () => {
    expect(studentRepositoryImpl).toBeDefined();
  });

  it('should return a student', async () => {
    const student = new StudentSchema();
      student.brothersNumber= 1;
      student.entryTime= '12:30';
      student.exitTime= '12:30';
      student.familyStatusId= '45a7fc8b-f96e-4a22-be0d-0c74fde0ad3e';
      student.allergyDescription= undefined;
      student.nickname= 'TestPrueba'

    const result = await studentRepositoryImpl.save(student);

    expect(result).toBeInstanceOf(StudentEntity);
    console.log(result);
    
  });

  it('Verificar que esté definido el repository', () => {
    expect(studentRepositoryImpl).toBeDefined();
  });

  it('Debe llamar al método execute del Transactional', async () => {
    await transactional.getManager();
    expect(transactional.getManager).toHaveBeenCalled();
  });
});