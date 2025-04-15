import { Inject, Injectable } from "@nestjs/common";
import { CreateEmergencyContactDTO } from "src/core/emergency-contact/adapters/http/dtos/create.emergency-contcat.dto";
import { StudentFamilyPresenter } from "src/core/student-family/adapters/http/presenters/student-family.presenter";
import { EmergencyContactService } from "src/core/emergency-contact/application/services/emergecy-contact.service";
import { StudentFamilyService } from "src/core/student-family/application/service/student-family.service";

@Injectable()
export class EmergencyContactUseCase{
    constructor(
        @Inject()
        private readonly studentFamilyService: StudentFamilyService,
        @Inject()
        private readonly emergencyContactService: EmergencyContactService,
    ){}

    // Retorna todos los familiares donde el id del estudiante sea igual al del parametro
    async findFamilyByIdForStudent(id: string){
        return StudentFamilyPresenter.toHttpList(await this.studentFamilyService.findAllByStudentId(id));
    }

    async save(dto: CreateEmergencyContactDTO){
        return await this.emergencyContactService.save(dto);
    }
} 