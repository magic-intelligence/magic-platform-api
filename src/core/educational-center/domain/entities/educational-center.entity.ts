import { BaseEntity } from "src/shared/types/entities/base.entity";

export class EducationalCenterEntity extends BaseEntity{
    educationalCenterId?: bigint;
    name: string;
}