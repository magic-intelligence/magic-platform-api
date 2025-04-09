import { BaseRepository } from "src/core/shared/base.repository";
import { StudentFamilyEntity } from "../entities/student-family.entity";

export const STUDENT_FAMILY_REPOSITORY = 'STUDENT_FAMILY_REPOSITORY';

export interface StudentFamilyRepository extends BaseRepository<StudentFamilyEntity>{
    findAllByStudentId(id: string): Promise<StudentFamilyEntity[]>;
}