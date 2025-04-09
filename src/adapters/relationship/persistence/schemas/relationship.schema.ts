import { BaseSchema } from "src/adapters/shared/base.schema";
import { Column, OneToMany, PrimaryGeneratedColumn, Entity as Schema } from "typeorm";
import { ParentFamilySchema } from "../../../parent-family/persistence/schemas/parent-family.schema";

@Schema({name: 'relationship'})
export class RelationshipSchema extends BaseSchema {
    @PrimaryGeneratedColumn('increment', {name: 'relationship_id', type: 'bigint'})
    relationshipId: string;
    @Column({name: 'name', nullable: false})
    name: string;
    @Column({name: 'description', nullable: true})
    description: string;

    @OneToMany(()=> ParentFamilySchema, (parentFamily)=> parentFamily.relationship)
    parentFamilies?: ParentFamilySchema[];
}