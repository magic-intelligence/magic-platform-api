import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './config/database/typeorm/transactions/transaction.module';
// import { EducationalCenterModule } from './core/educational-center/adapters/educational-center.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventModule } from './config/events/event.module';
import { TypeormConfigModule } from './config/database/typeorm/typeorm-config.module';
import { EducationalCenterModule } from './contexts/educational-center-management/educational-center/educational-center.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    TypeormConfigModule,
    EventModule,
    TransactionModule,
    EducationalCenterModule,
  ],
})
export class AppModule {}
