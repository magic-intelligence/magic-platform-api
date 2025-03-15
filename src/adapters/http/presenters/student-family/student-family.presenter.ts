import { StudentFamilyEntity } from "src/core/student-family/domain/entities/student-family.entity";

export class StudentFamilyPresenter {
    static toHttp(studentFamily: StudentFamilyEntity){
        return {
            id: studentFamily.studentFamilyId,
            studentId: studentFamily.studentId,
            parentFamily:{
                name: studentFamily.parentFamily?.name,
                paternalSurname: studentFamily.parentFamily?.paternalSurname,
                maternalSurname: studentFamily.parentFamily?.maternalSurname,
                relationship: studentFamily.parentFamily?.relationship?.name,
                description: studentFamily.parentFamily?.relationship?.description,
            }
        }
    }

    static toHttpList(studentFamilies: StudentFamilyEntity[]){
        return {
            studentFamilies: studentFamilies.map(item => this.toHttp(item))
        };
    }
}