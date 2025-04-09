import { Module } from '@nestjs/common';
import { EMERGENCY_CONTACT_REPOSITORY } from './domain/repositories/emergency-contact.repository';
import { EmergencyContactRepositoryImpl } from 'src/adapters/emergency-contact/persistence/repositories/emergency-contact.repository.impl';
import { EmergencyContactService } from './application/services/emergecy-contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyContactSchema } from 'src/adapters/emergency-contact/persistence/schemas/emergency-contact.schema';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmergencyContactSchema]),
    ],
    controllers: [],
    providers: [
        {
            provide: EMERGENCY_CONTACT_REPOSITORY,
            useClass: EmergencyContactRepositoryImpl
        },
        EmergencyContactService
    ],
    exports: [
        EMERGENCY_CONTACT_REPOSITORY,
        EmergencyContactService
    ]
})
export class EmergencyContactModule {}
