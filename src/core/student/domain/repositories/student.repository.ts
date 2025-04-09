import { BaseRepository } from "src/core/shared/base.repository";
import { StudentEntity } from "../entities/student.entity";

export const STUDENT_REPOSITORY = 'STUDENT_REPOSITORY';

export interface StudentRepository extends BaseRepository<StudentEntity> {

}