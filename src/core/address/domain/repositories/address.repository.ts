import { BaseRepository } from "src/core/shared/base.repository";
import { AddressEntity } from "../entities/address.entity";

export const ADDRESS_REPOSITORY = 'ADDRESS_REPOSITORY';
 
export interface AddressRepository extends BaseRepository<AddressEntity>{

}