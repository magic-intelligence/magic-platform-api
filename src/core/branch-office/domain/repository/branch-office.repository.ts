import { GenericRepository } from "src/shared/repositories/generic.repository";
import { BranchOfficeEntity } from "../entities/branch-office.entity";

export const BRANCH_OFFICE_REPOSITORY = 'BRANCH_OFFICE_REPOSITORY';

export interface BranchOfficeRepository extends GenericRepository<BranchOfficeEntity> {

}