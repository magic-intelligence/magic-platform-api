import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { EducationalCenterOrmEntity } from 'src/contexts/educational-center-management/educational-center/infraestruture/persistence/typeorm/entities/educational-center-orm-entity';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // entities: [`${__dirname}/../../../core/**/*.schema.{ts,js}`],
  entities: [EducationalCenterOrmEntity],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
  synchronize: false,
  migrationsTableName: 'migrations',
});

export default AppDataSource;