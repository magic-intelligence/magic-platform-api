import { GenericRepository } from "src/core/shared/generic.repository";
import { StudentEntity } from "../entities/student.entity";

export const STUDENT_REPOSITORY = 'STUDENT_REPOSITORY';

export interface StudentRepository extends GenericRepository<StudentEntity> {

}