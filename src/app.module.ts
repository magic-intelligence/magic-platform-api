import { EmergencyContactModule } from './core/emergency-contact/emergency-contact.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './infraestructure/database/typeorm/typeorm-config.module';
import { StudentModule } from './core/student/student.module';
import { TransactionModule } from './infraestructure/database/typeorm/transactions/transaction.module';
import { BranchOfficeModule } from './core/branch-office/branch-office.module';
import { AddressModule } from './core/address/address.module';
import { EducationalCenterCoreModule } from './core/educational-center/educational-center.core.module';
import { EducationalCenterAdapterModule } from './adapters/educational-center/educational-center.adapter.module';

@Module({
  imports: [
    TypeormConfigModule,
    ConfigModule.forRoot(),
    EmergencyContactModule,
    StudentModule,
    BranchOfficeModule,
    AddressModule,
    TransactionModule,
    EducationalCenterCoreModule,
    EducationalCenterAdapterModule,
  ],
})
export class AppModule {}
