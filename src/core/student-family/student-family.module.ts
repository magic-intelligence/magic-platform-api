import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentFamilySchema } from "src/adapters/persistence/schemas";
import { STUDENT_FAMILY_REPOSITORY } from "./domain/repositories/student-family.repository";
import { StudentFamilyRepositoryImpl } from "src/adapters/persistence/repositories/student-family.repository.impl";
import { StudentFamilyService } from "./application/service/student-family.service";
import { TransactionModule } from "src/infraestructure/database/typeorm/transactions/transaction.module";

@Module({
    imports: [
            TypeOrmModule.forFeature([StudentFamilySchema]),
            TransactionModule
        ],
        providers:[
            {
                provide: STUDENT_FAMILY_REPOSITORY,
                useClass: StudentFamilyRepositoryImpl
            },
            StudentFamilyService
         ],
        controllers:[ ],
        exports:[
            STUDENT_FAMILY_REPOSITORY,
            StudentFamilyService
        ]
})

export class StudentFamilyModule{}