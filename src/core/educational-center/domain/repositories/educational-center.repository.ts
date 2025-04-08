import { GenericRepository } from "src/core/shared/generic.repository";
import { EducationalCenterEntity } from "../entities/educational-center.entity";

export const EDUCATIONAL_CENTER_REPOSITORY = "EDUCATIONAL_CENTER_REPOSITORY";

export interface EducationalCenterRepository extends GenericRepository<EducationalCenterEntity>{}