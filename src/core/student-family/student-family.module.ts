import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { STUDENT_FAMILY_REPOSITORY } from "./domain/repositories/student-family.repository";
import { StudentFamilyRepositoryImpl } from "src/core/student-family/adapters/persistence/repositories/student-family.repository.impl";
import { StudentFamilyService } from "./application/service/student-family.service";
import { TransactionModule } from "src/infraestructure/database/typeorm/transactions/transaction.module";
import { StudentFamilySchema } from "src/core/student-family/adapters/persistence/schemas/student-family.schema";

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