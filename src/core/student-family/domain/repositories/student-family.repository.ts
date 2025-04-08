import { GenericRepository } from "src/core/shared/generic.repository";
import { StudentFamilyEntity } from "../entities/student-family.entity";

export const STUDENT_FAMILY_REPOSITORY = 'STUDENT_FAMILY_REPOSITORY';

export interface StudentFamilyRepository extends GenericRepository<StudentFamilyEntity>{
    findAllByStudentId(id: string): Promise<StudentFamilyEntity[]>;
}