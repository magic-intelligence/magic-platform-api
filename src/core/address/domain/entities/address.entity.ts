import { BaseEntity } from "src/core/shared/base.entity";

export class AddressEntity extends BaseEntity{
    addressId?: bigint;
    postalCode: number;
    street: string;
    interiorNumber: string;
    exteriorNumber: string;
    district: string;
    city: string;
    state: string;
}