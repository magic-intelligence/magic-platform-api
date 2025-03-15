import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchemas1741904422486 implements MigrationInterface {
    name = 'UpdateSchemas1741904422486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parent_family" DROP CONSTRAINT "FK_0a1404285dc33daf195dfbacf50"`);
        await queryRunner.query(`ALTER TABLE "parent_family" ADD CONSTRAINT "UQ_0a1404285dc33daf195dfbacf50" UNIQUE ("address_id")`);
        await queryRunner.query(`ALTER TABLE "parent_family" ADD CONSTRAINT "FK_0a1404285dc33daf195dfbacf50" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parent_family" DROP CONSTRAINT "FK_0a1404285dc33daf195dfbacf50"`);
        await queryRunner.query(`ALTER TABLE "parent_family" DROP CONSTRAINT "UQ_0a1404285dc33daf195dfbacf50"`);
        await queryRunner.query(`ALTER TABLE "parent_family" ADD CONSTRAINT "FK_0a1404285dc33daf195dfbacf50" FOREIGN KEY ("address_id") REFERENCES "address"("address_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
