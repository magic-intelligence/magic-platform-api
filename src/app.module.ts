import { EmergencyContactModule } from './core/emergency-contact/emergency-contact.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './infraestructure/database/typeorm/typeorm-config.module';
import { StudentModule } from './core/student/student.module';
import { TransactionModule } from './infraestructure/database/typeorm/transactions/transaction.module';
import { BranchOfficeModule } from './core/branch-office/branch-office.module';
import { AddressModule } from './core/address/address.module';
import { EducationalCenterModule } from './core/educational-center/adapters/educational-center.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    TypeormConfigModule,
    EmergencyContactModule,
    StudentModule,
    BranchOfficeModule,
    AddressModule,
    TransactionModule,
    EducationalCenterModule,
  ],
})
export class AppModule {}
