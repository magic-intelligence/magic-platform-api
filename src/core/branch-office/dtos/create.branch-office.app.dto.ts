import { BaseIdVO } from "src/core/shared/domain/base.id.vo";
import { BranchOfficeNameVO } from "../value-objects/branch-office.name.vo";

export class CreateBranchOfficeAppDto{
    name: BranchOfficeNameVO;
    addressId: BaseIdVO;
    educationalCenterId: BaseIdVO;
}