import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyUpdateAtDefautValueNull1743779740316 implements MigrationInterface {
    name = 'ModifyUpdateAtDefautValueNull1743779740316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "family_status" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "family_status" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "relationship" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "relationship" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "parent_family" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parent_family" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "educational_center" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "educational_center" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "branch_office" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "branch_office" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "student_family" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student_family" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "emergency_contact" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "emergency_contact" ALTER COLUMN "updated_at" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emergency_contact" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "emergency_contact" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student_family" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "student_family" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "branch_office" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "branch_office" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "educational_center" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "educational_center" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "parent_family" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "parent_family" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "relationship" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "relationship" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "family_status" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "family_status" ALTER COLUMN "updated_at" SET NOT NULL`);
    }

}
