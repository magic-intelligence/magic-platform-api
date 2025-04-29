import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { EducationalCenterEntity } from "src/core/educational-center/domain/entities/educational-center.entity";
import { BaseEntity } from "src/core/shared/domain/base.entity";
import { BranchOfficeNameVO } from "../../value-objects/branch-office.name.vo";

export class BranchOfficeEntity extends BaseEntity{
    branchOfficeId?: bigint;
    addressId: bigint;
    educationalCenterId: bigint;
    name: BranchOfficeNameVO;
    address?: AddressEntity;
    educationalCenter?: EducationalCenterEntity;
}