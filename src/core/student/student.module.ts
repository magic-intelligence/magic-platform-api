import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { STUDENT_REPOSITORY } from "./domain/repositories/student.repository";
import { StudentRepositoryImpl } from "src/core/student/adapters/persistence/repositories/student.repository.impl";
import { BasicInformationStudentUseCase } from "./application/use-cases/basic.information.student.use.case";
import { StudentController } from "src/core/student/adapters/http/controllers/student.controller";
import { StudentSchema } from "src/core/student/adapters/persistence/schemas/student.schema";
import { BasicInformationStudentFacade } from "./application/facades/basic.information.student.facade";
import { StudentFamilyModule } from "../student-family/student-family.module";
import { TransactionModule } from "src/infraestructure/database/typeorm/transactions/transaction.module";
import { EmergencyContactUseCase } from "./application/use-cases/emergency.contact.use.case";
import { EmergencyContactModule } from "../emergency-contact/emergency-contact.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([StudentSchema]),
        StudentFamilyModule,
        TransactionModule,
        EmergencyContactModule
    ],
    providers:[
        {
            provide: STUDENT_REPOSITORY,
            useClass: StudentRepositoryImpl
        },
        BasicInformationStudentUseCase,
        BasicInformationStudentFacade,
        EmergencyContactUseCase,
     ],
    controllers:[ StudentController ],
    exports:[]
})

export class StudentModule{}