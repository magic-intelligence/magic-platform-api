import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";
import { BaseEntity } from "src/core/shared/domain/base.entity";
import { EducationalCenterNameVO } from "../../value-objects/educational-center.name.vo";

export class EducationalCenterEntity extends BaseEntity{
    educationalCenterId?: bigint;
    name: EducationalCenterNameVO;
    branchOffices?: BranchOfficeEntity[];
}