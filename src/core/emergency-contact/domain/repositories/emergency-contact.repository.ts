import { BaseRepository } from "src/core/shared/domain/base.repository";
import { EmergencyContactEntity } from "../entities/emergency-contact.entity";

export const EMERGENCY_CONTACT_REPOSITORY = 'EMERGENCY_CONTACT_REPOSITORY';

export interface EmergencyContactRepository extends BaseRepository<EmergencyContactEntity>{

}