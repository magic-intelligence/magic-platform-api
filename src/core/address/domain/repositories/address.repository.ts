import { GenericRepository } from "src/core/shared/generic.repository";
import { AddressEntity } from "../entities/address.entity";

export const ADDRESS_REPOSITORY = 'ADDRESS_REPOSITORY';
 
export interface AddressRepository extends GenericRepository<AddressEntity>{

}