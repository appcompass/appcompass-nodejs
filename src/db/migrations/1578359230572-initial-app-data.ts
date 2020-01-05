import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialAppData1578359230572 implements MigrationInterface {
  name = 'initialAppData1578359230572';

  public async up(queryRunner: QueryRunner): Promise<any> {
    //   await queryRunner.query('ALTER TABLE "role_permission" DROP CONSTRAINT "role_permission_permission_id_foreign"', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" DROP CONSTRAINT "role_permission_role_id_foreign"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_permission_id_foreign"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_user_id_foreign"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "user_role_role_id_foreign"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "user_role_user_id_foreign"', undefined);
    //   await queryRunner.query('DROP INDEX "role_permission_role_id_index"', undefined);
    //   await queryRunner.query('DROP INDEX "role_permission_permission_id_index"', undefined);
    //   await queryRunner.query('DROP INDEX "user_permission_user_id_index"', undefined);
    //   await queryRunner.query('DROP INDEX "user_permission_permission_id_index"', undefined);
    //   await queryRunner.query('DROP INDEX "user_role_user_id_index"', undefined);
    // await queryRunner.query('DROP INDEX "user_role_role_id_index"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" DROP COLUMN "created_at"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" DROP COLUMN "updated_at"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" DROP COLUMN "created_at"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" DROP COLUMN "updated_at"', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" DROP COLUMN "created_at"', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" DROP COLUMN "updated_at"', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()', undefined);
    //   await queryRunner.query('CREATE INDEX "user_permission_user_id_index" ON "user_permission" ("user_id") ', undefined);
    //   await queryRunner.query('CREATE INDEX "user_permission_permission_id_index" ON "user_permission" ("permission_id") ', undefined);
    //   await queryRunner.query('CREATE INDEX "user_role_user_id_index" ON "user_role" ("user_id") ', undefined);
    //   await queryRunner.query('CREATE INDEX "user_role_role_id_index" ON "user_role" ("role_id") ', undefined);
    //   await queryRunner.query('CREATE INDEX "role_permission_role_id_index" ON "role_permission" ("role_id") ', undefined);
    //   await queryRunner.query('CREATE INDEX "role_permission_permission_id_index" ON "role_permission" ("permission_id") ', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_permission_id_foreign" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_foreign" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_role_id_foreign" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permission_id_foreign" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    //   await queryRunner.query('ALTER TABLE "role_permission" DROP CONSTRAINT "role_permission_permission_id_foreign"', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" DROP CONSTRAINT "role_permission_role_id_foreign"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "user_role_role_id_foreign"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" DROP CONSTRAINT "user_role_user_id_foreign"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_permission_id_foreign"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" DROP CONSTRAINT "user_permission_user_id_foreign"', undefined);
    //   await queryRunner.query('DROP INDEX "role_permission_permission_id_index"', undefined);
    //   await queryRunner.query('DROP INDEX "role_permission_role_id_index"', undefined);
    //   await queryRunner.query('DROP INDEX "user_role_role_id_index"', undefined);
    // await queryRunner.query('DROP INDEX "user_role_user_id_index"', undefined);
    //   await queryRunner.query('DROP INDEX "user_permission_permission_id_index"', undefined);
    //   await queryRunner.query('DROP INDEX "user_permission_user_id_index"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" DROP COLUMN "updated_at"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" DROP COLUMN "created_at"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" DROP COLUMN "updated_at"', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" DROP COLUMN "created_at"', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" DROP COLUMN "updated_at"', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" DROP COLUMN "created_at"', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()', undefined);
    //   await queryRunner.query('CREATE INDEX "user_role_role_id_index" ON "user_role" ("role_id") ', undefined);
    //   await queryRunner.query('CREATE INDEX "user_role_user_id_index" ON "user_role" ("user_id") ', undefined);
    //   await queryRunner.query('CREATE INDEX "user_permission_permission_id_index" ON "user_permission" ("permission_id") ', undefined);
    //   await queryRunner.query('CREATE INDEX "user_permission_user_id_index" ON "user_permission" ("user_id") ', undefined);
    //   await queryRunner.query('CREATE INDEX "role_permission_permission_id_index" ON "role_permission" ("permission_id") ', undefined);
    //   await queryRunner.query('CREATE INDEX "role_permission_role_id_index" ON "role_permission" ("role_id") ', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    //   await queryRunner.query('ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_foreign" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    //   await queryRunner.query('ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_permission_id_foreign" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_role_id_foreign" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    //   await queryRunner.query('ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permission_id_foreign" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION', undefined);
    // );
  }
}
