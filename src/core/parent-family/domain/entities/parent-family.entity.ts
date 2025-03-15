import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { BranchEntity } from "src/core/branch/domain/entities/branch.entity";
import { RelationShipEntity } from "src/core/relationship/domain/entities/relationship.entity";
import { StudentFamilyEntity } from "src/core/student-family/domain/entities/student-family.entity";
import { BaseEntity } from "src/shared/types/entities/base.entity";
import { PersonGender } from "src/shared/value-object/person.gender";

export class ParentFamilyEntity extends BaseEntity{
    parentFamilyId: string;
    relationshipId: string;
    branchId: string;
    addressId?: string;
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    birthday?: Date;
    phoneNumber?: string;
    gender: PersonGender;
    branch?: BranchEntity;
    address?: AddressEntity;
    relationship?: RelationShipEntity;
    studentFamilies?: StudentFamilyEntity[];
}