import { newDb } from 'pg-mem';
import { DataSource, EntitySchema, EntityTarget } from 'typeorm';

export default async function createMemoryDatabase (entities: EntityTarget<any>[]) {
  const db = newDb();


  // Registrar la función current_database()
  // db.public.registerFunction({
  //   name: 'current_database',
  //   args:[DataType.text],
  //   returns: DataType.text,
  //   implementation: () => 'pg_mem',
  // });

  db.public.registerFunction({name: 'current_timestamp', implementation:()=> new Date()});

  const dataSource = db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities,
    synchronize: true,
  });

  await dataSource.initialize();

  return dataSource;
};
