import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueEducationalCenter1743712973327 implements MigrationInterface {
    name = 'AddUniqueEducationalCenter1743712973327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "educational_center" ADD CONSTRAINT "UQ_3b594e9bae6eda4733196ef69f8" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "educational_center" DROP CONSTRAINT "UQ_3b594e9bae6eda4733196ef69f8"`);
    }

}
