import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { EducationalCenterEntity } from "src/core/educational-center/domain/entities/educational-center.entity";
import { ParentFamilyEntity } from "src/core/parent-family/domain/entities/parent-family.entity";
import { StudentEntity } from "src/core/student/domain/entities/student.entity";
import { BaseEntity } from "src/shared/types/entities/base.entity";

export class BranchOfficeEntity extends BaseEntity{
    branchOfficeId?: bigint;
    addressId: bigint;
    educationalCenterId: bigint;
    name: string;
    address?: AddressEntity;
    educationalCenter?: EducationalCenterEntity;
    parentFamilies?: ParentFamilyEntity[];
    students?: StudentEntity[];
}