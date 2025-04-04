import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchema1743744724262 implements MigrationInterface {
    name = 'CreateSchema1743744724262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "relationship" ("is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "relationship_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_0a24f2db5ddc1bb8fbc79738b5e" PRIMARY KEY ("relationship_id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "address_id" BIGSERIAL NOT NULL, "postal_code" integer NOT NULL, "street" text NOT NULL, "interior_number" character varying(10), "exterior_number" character varying(10), "district" text NOT NULL, "city" text NOT NULL, "state" character varying(100) NOT NULL, CONSTRAINT "PK_db4aae0a059fd4ef7709cb802b0" PRIMARY KEY ("address_id"))`);
        await queryRunner.query(`CREATE TABLE "educational_center" ("is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "educational_center_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_3b594e9bae6eda4733196ef69f8" UNIQUE ("name"), CONSTRAINT "PK_2cfbc88ac8043aa95e033068430" PRIMARY KEY ("educational_center_id"))`);
        await queryRunner.query(`CREATE TABLE "branch_office" ("is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "branch_office_id" BIGSERIAL NOT NULL, "address_id" bigint NOT NULL, "educational_center_id" bigint NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_ed90edcfa924ec9ec45da7c66d7" UNIQUE ("name"), CONSTRAINT "REL_b60100709d7f1bba4028c87bf9" UNIQUE ("address_id"), CONSTRAINT "PK_7471928922911b9a2539c74a98e" PRIMARY KEY ("branch_office_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."parent_family_gender_enum" AS ENUM('f', 'm')`);
        await queryRunner.query(`CREATE TABLE "parent_family" ("is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "parent_family_id" BIGSERIAL NOT NULL, "relationship_id" bigint NOT NULL, "branch_id" bigint NOT NULL, "address_id" bigint, "name" character varying NOT NULL, "paternal_surname" character varying NOT NULL, "maternal_surname" character varying NOT NULL, "birthday" TIMESTAMP, "phone_number" character varying(20), "gender" "public"."parent_family_gender_enum" NOT NULL, CONSTRAINT "UQ_b77526c268a965a61960c287fda" UNIQUE ("phone_number"), CONSTRAINT "REL_0a1404285dc33daf195dfbacf5" UNIQUE ("address_id"), CONSTRAINT "PK_7b5ca5c0fcadf10f615ae516f34" PRIMARY KEY ("parent_family_id"))`);
        await queryRunner.query(`CREATE TABLE "student_family" ("is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "student_family_id" BIGSERIAL NOT NULL, "student_id" bigint NOT NULL, "parent_family_id" bigint NOT NULL, CONSTRAINT "PK_7e3ef5323dd2c92ffcec72ad461" PRIMARY KEY ("student_family_id"))`);
        await queryRunner.query(`CREATE TABLE "family_status" ("is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "family_status_id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_8aedb214677b5ce2a0bace6c436" PRIMARY KEY ("family_status_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."student_gender_enum" AS ENUM('f', 'm')`);
        await queryRunner.query(`CREATE TABLE "student" ("is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "student_id" BIGSERIAL NOT NULL, "family_status_id" bigint NOT NULL, "branch_id" bigint NOT NULL, "name" character varying NOT NULL, "paternal_surname" character varying NOT NULL, "maternal_surname" character varying NOT NULL, "nickname" character varying, "birthday" date, "gender" "public"."student_gender_enum" NOT NULL, "grace_minutes" integer, "enrollment_mount" double precision, "enrollment_due_date" TIMESTAMP, "monthly_mount" double precision, "monthly_due_date" TIMESTAMP, "material_mount" double precision, "material_due_date" TIMESTAMP, "entry_time" TIME NOT NULL, "exit_time" TIME NOT NULL, "brothers_number" integer NOT NULL, "allergy_description" text, CONSTRAINT "PK_be3689991c2cc4b6f4cf39087fa" PRIMARY KEY ("student_id"))`);
        await queryRunner.query(`CREATE TABLE "emergency_contact" ("is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "emergency_contact_id" BIGSERIAL NOT NULL, "student_family_id" bigint NOT NULL, "priority_level" integer NOT NULL, CONSTRAINT "UQ_97a4ba7872af4c496c479f56414" UNIQUE ("priority_level"), CONSTRAINT "REL_86deb4ac2d34063bd0f962a5ae" UNIQUE ("student_family_id"), CONSTRAINT "PK_8ce5dc80a2df250fe7356119d24" PRIMARY KEY ("emergency_contact_id"))`);
        await queryRunner.query(`ALTER TABLE "branch_office" ADD CONSTRAINT "FK_b60100709d7f1bba4028c87bf99" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branch_office" ADD CONSTRAINT "FK_7c9270071c3b4602ae58b2de238" FOREIGN KEY ("educational_center_id") REFERENCES "educational_center"("educational_center_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parent_family" ADD CONSTRAINT "FK_709545c5d9e7eded178338274ad" FOREIGN KEY ("branch_id") REFERENCES "branch_office"("branch_office_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parent_family" ADD CONSTRAINT "FK_0a1404285dc33daf195dfbacf50" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parent_family" ADD CONSTRAINT "FK_73902f1a792f393562f5ca3903f" FOREIGN KEY ("relationship_id") REFERENCES "relationship"("relationship_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_family" ADD CONSTRAINT "FK_1526c4a0d6537d80f13558343d7" FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_family" ADD CONSTRAINT "FK_7d60cd5a31c6e3d741609cc07b5" FOREIGN KEY ("parent_family_id") REFERENCES "parent_family"("parent_family_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_b83dd3b0fb5eeef379eabd4995d" FOREIGN KEY ("branch_id") REFERENCES "branch_office"("branch_office_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_39e682b52a55177c20475b1a19e" FOREIGN KEY ("family_status_id") REFERENCES "family_status"("family_status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emergency_contact" ADD CONSTRAINT "FK_86deb4ac2d34063bd0f962a5ae4" FOREIGN KEY ("student_family_id") REFERENCES "student_family"("student_family_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emergency_contact" DROP CONSTRAINT "FK_86deb4ac2d34063bd0f962a5ae4"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_39e682b52a55177c20475b1a19e"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_b83dd3b0fb5eeef379eabd4995d"`);
        await queryRunner.query(`ALTER TABLE "student_family" DROP CONSTRAINT "FK_7d60cd5a31c6e3d741609cc07b5"`);
        await queryRunner.query(`ALTER TABLE "student_family" DROP CONSTRAINT "FK_1526c4a0d6537d80f13558343d7"`);
        await queryRunner.query(`ALTER TABLE "parent_family" DROP CONSTRAINT "FK_73902f1a792f393562f5ca3903f"`);
        await queryRunner.query(`ALTER TABLE "parent_family" DROP CONSTRAINT "FK_0a1404285dc33daf195dfbacf50"`);
        await queryRunner.query(`ALTER TABLE "parent_family" DROP CONSTRAINT "FK_709545c5d9e7eded178338274ad"`);
        await queryRunner.query(`ALTER TABLE "branch_office" DROP CONSTRAINT "FK_7c9270071c3b4602ae58b2de238"`);
        await queryRunner.query(`ALTER TABLE "branch_office" DROP CONSTRAINT "FK_b60100709d7f1bba4028c87bf99"`);
        await queryRunner.query(`DROP TABLE "emergency_contact"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TYPE "public"."student_gender_enum"`);
        await queryRunner.query(`DROP TABLE "family_status"`);
        await queryRunner.query(`DROP TABLE "student_family"`);
        await queryRunner.query(`DROP TABLE "parent_family"`);
        await queryRunner.query(`DROP TYPE "public"."parent_family_gender_enum"`);
        await queryRunner.query(`DROP TABLE "branch_office"`);
        await queryRunner.query(`DROP TABLE "educational_center"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "relationship"`);
    }

}
