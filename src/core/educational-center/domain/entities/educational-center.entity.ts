import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";
import { BaseEntity } from "src/shared/types/entities/base.entity";

export class EducationalCenterEntity extends BaseEntity{
    educationalCenterId?: bigint;
    name: string;
    branchOffices?: BranchOfficeEntity[];
}