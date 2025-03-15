import { ParentFamilyEntity } from "src/core/parent-family/domain/entities/parent-family.entity";
import { BaseEntity } from "src/shared/types/entities/base.entity";

export class RelationShipEntity extends BaseEntity {
    relationshipId: string;
    name: string;
    description: string;
    parentFamilies?: ParentFamilyEntity[];
}