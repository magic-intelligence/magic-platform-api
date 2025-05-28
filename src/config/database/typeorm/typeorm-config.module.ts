import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EducationalCenterOrmEntity } from 'src/contexts/educational-center-management/educational-center/infraestruture/persistence/typeorm/entities/educational-center-orm-entity';

@Module({
  imports: [
    ConfigModule, // <-- Asegura que ConfigService esté disponible
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction =
          configService.get<string>('NODE_ENV') === 'production';
        return {
          type: 'postgres',
          url: configService.get<string>('DATABASE_URL'),
          // entities: [`${__dirname}/../../../**/*.schema.{ts,js}`],
          entities: [EducationalCenterOrmEntity],
          synchronize: false,
          ...(isProduction && {
            ssl: {
              rejectUnauthorized: false,
            },
          }),
        };
      },
    }),
  ],
})
export class TypeormConfigModule {}
