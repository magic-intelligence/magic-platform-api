import { GenericRepository } from "src/core/shared/generic.repository";
import { EmergencyContactEntity } from "../entities/emergency-contact.entity";

export const EMERGENCY_CONTACT_REPOSITORY = 'EMERGENCY_CONTACT_REPOSITORY';

export interface EmergencyContactRepository extends GenericRepository<EmergencyContactEntity>{

}