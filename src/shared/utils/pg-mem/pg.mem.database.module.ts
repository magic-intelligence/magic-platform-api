import { Module } from '@nestjs/common';
import { DataType, newDb } from 'pg-mem';
import { DataSource } from 'typeorm';

@Module({
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        const db = newDb();

        db.public.registerFunction({
            name: 'current_database',
            returns: DataType.text,
            implementation: ()=> 'test_db'
        });

        db.public.registerFunction({
            name: 'version',
            returns: DataType.text,
            implementation: ()=> 'PostgreSQL 15.0'
        });

        const dataSource = new DataSource({
          type: 'postgres',
          database: ':memory:',
          synchronize: true,
          entities: [`${__dirname}/../../../**/*.schema.{ts,js}`],
        });

        await dataSource.initialize();
        return dataSource;
      },
    },
  ],
  exports: [DataSource],
})
export class PgMemDatabaseModule {}
