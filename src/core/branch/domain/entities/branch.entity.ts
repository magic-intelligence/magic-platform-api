import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { ParentFamilyEntity } from "src/core/parent-family/domain/entities/parent-family.entity";
import { StudentEntity } from "src/core/student/domain/entities/student.entity";
import { BaseEntity } from "src/shared/types/entities/base.entity";

export class BranchEntity extends BaseEntity{
    branchId: string;
    addressId: string;
    name: string;
    address?: AddressEntity;
    parentFamilies?: ParentFamilyEntity[];
    students?: StudentEntity[];
}