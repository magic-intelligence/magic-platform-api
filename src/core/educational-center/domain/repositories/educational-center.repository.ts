import { BaseRepository } from "src/core/shared/domain/base.repository";
import { EducationalCenterEntity } from "../entities/educational-center.entity";

export const EDUCATIONAL_CENTER_REPOSITORY = "EDUCATIONAL_CENTER_REPOSITORY";

export interface EducationalCenterRepository extends BaseRepository<EducationalCenterEntity>{}