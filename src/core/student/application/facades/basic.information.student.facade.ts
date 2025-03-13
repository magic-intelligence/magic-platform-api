import { BasicInformationStudentUseCase } from "../use-cases/basic.information.student.use.case";
import { StudentEntity } from "../../domain/entities/student.entity";
import { Inject, Logger } from "@nestjs/common";
import { StudentFamilyService } from "src/core/student-family/application/service/student-family.service";
import { TRANSACTION_PORT, TransactionPort } from "src/shared/ports/transaction.port";
import { CreateStudentDTO } from "src/adapters/http/dtos/student/create.student.dto";

export class BasicInformationStudentFacade {
    logger = new Logger('BasicInformationFacade');
    constructor(
        @Inject()
        private readonly studentFamilyService: StudentFamilyService,
        @Inject()
        private readonly basicInformationStudentUseCase: BasicInformationStudentUseCase,
        @Inject(TRANSACTION_PORT)
        private readonly transaction: TransactionPort,
    ){}

    async saveStudent(dto: CreateStudentDTO): Promise<StudentEntity>{
        return this.transaction.run<StudentEntity>(async ()=>{
            const student = await this.basicInformationStudentUseCase.execute(dto);
            
            await this.studentFamilyService.save({
                parentFamilyId: dto.parentFamilyId,
                studentId: student.studentId
            });

            return student;
        });
    }
}