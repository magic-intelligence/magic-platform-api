import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BasicInformationStudentFacade } from "src/core/student/application/facades/basic.information.student.facade";
import { EmergencyContactUseCase } from "src/core/student/application/use-cases/emergency.contact.use.case";
import { CreateEmergencyContactDTO } from "../../../../emergency-contact/adapters/http/dtos/create.emergency-contcat.dto";
import { CreateStudentDTO } from "../dtos/create.student.dto";

@Controller('students')
export class StudentController{
    constructor(
        private readonly basicInformationStudentFacade: BasicInformationStudentFacade,
        private readonly emergencyContactUseCase: EmergencyContactUseCase,
    ){}

    @Post('basic-information')
    async register(@Body() dto: CreateStudentDTO){
        return await this.basicInformationStudentFacade.saveStudent(dto);
    }
    @Post('emergency-contact')
    async registerEmergencyContact(@Body() dto: CreateEmergencyContactDTO){
        return await this.emergencyContactUseCase.save(dto);
    }

    @Get(':studentId/family')
    async findAll(@Param('studentId') studentId: string){
        return this.emergencyContactUseCase.findFamilyByIdForStudent(studentId);
    }
}