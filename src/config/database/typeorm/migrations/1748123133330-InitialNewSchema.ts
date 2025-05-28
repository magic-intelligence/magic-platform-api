import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialNewSchema1748123133330 implements MigrationInterface {
    name = 'InitialNewSchema1748123133330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "educational_center" ("educational_center_id" BIGSERIAL NOT NULL, "name" character varying(150) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_3b594e9bae6eda4733196ef69f8" UNIQUE ("name"), CONSTRAINT "PK_2cfbc88ac8043aa95e033068430" PRIMARY KEY ("educational_center_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "educational_center"`);
    }

}
