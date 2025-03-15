import { DataSource } from "typeorm";
import { DataType, newDb} from 'pg-mem';
import { AddressSchema, BranchSchema, FamilyStatusSchema, ParentFamilySchema, RelationshipSchema, StudentFamilySchema, StudentSchema } from "src/adapters/persistence/schemas";
export async function createMemoryDatabase():Promise<DataSource>{
  const db = newDb();

  db.public.registerFunction({
    name: 'current_database',
    returns: DataType.text,
    implementation: () => 'test_db',
  });
  db.public.registerFunction({
    name: 'version',
    returns: DataType.text,
    implementation: () => 'PostgreSQL 15',
  });

  db.public.many(`
    CREATE VIEW pg_views AS 
    SELECT NULL::text AS schemaname, NULL::text AS viewname 
    WHERE false;
  `);

  db.public.many(`
    CREATE TABLE pg_tables (
      schemaname text,
      tablename text
    );
  `);

  const dataSource = db.adapters.createTypeormDataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    synchronize: true,
    dropSchema: true,
    entities: [AddressSchema,
      BranchSchema,
      FamilyStatusSchema,
      ParentFamilySchema,
      RelationshipSchema,
      StudentFamilySchema,
      StudentSchema,],
  });

  await dataSource.initialize();
  return dataSource;
}