import { EmergencyContactModule } from './core/emergency-contact/emergency-contact.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './infraestructure/database/typeorm/typeorm.module';
import { StudentModule } from './core/student/student.module';
import { TransactionModule } from './infraestructure/database/typeorm/transactions/transaction.module';
import { BranchOfficeModule } from './core/branch-office/branch-office.module';
import { AddressModule } from './core/address/address.module';
import { EducationalCenterModule } from './core/educational-center/educational-center.module';

@Module({
  imports: [
    EmergencyContactModule,
    ConfigModule.forRoot(),
    TypeormConfigModule,
    StudentModule,
    BranchOfficeModule,
    AddressModule,
    TransactionModule,
    EducationalCenterModule,
  ],
})
export class AppModule {}
