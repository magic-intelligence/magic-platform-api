import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './config/database/typeorm/typeorm-config.module';
import { EducationalCenterModule } from './contexts/educational-center-management/educational-center/educational-center.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    TypeormConfigModule,
    EducationalCenterModule,
  ],
})
export class AppModule {}
