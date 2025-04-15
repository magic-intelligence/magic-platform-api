import { AddressEntity } from "src/core/address/domain/entities/address.entity";
import { BranchOfficeEntity } from "src/core/branch-office/domain/entities/branch-office.entity";
import { RelationShipEntity } from "src/core/relationship/domain/entities/relationship.entity";
import { StudentFamilyEntity } from "src/core/student-family/domain/entities/student-family.entity";
import { BaseEntity } from "src/core/shared/domain/base.entity";
import { PersonGender } from "src/shared/value-object/person.gender";

export class ParentFamilyEntity extends BaseEntity{
    parentFamilyId: string;
    relationshipId: string;
    branchOfficeId: string;
    addressId?: string;
    name: string;
    paternalSurname: string;
    maternalSurname: string;
    birthday?: Date;
    phoneNumber?: string;
    gender: PersonGender;
    branchOffice?: BranchOfficeEntity;
    address?: AddressEntity;
    relationship?: RelationShipEntity;
    studentFamilies?: StudentFamilyEntity[];
}