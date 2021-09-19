import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createPermissionsTable1629153350398 implements MigrationInterface {
    public TABLE_NAME = 'permissions';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.TABLE_NAME,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'reference',
                        type: 'varchar',
                    },
                    {
                        name: 'resource',
                        type: 'varchar',
                    },
                    {
                        name: 'action',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                    },
                    {
                        name: 'deleted_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.TABLE_NAME);
    }
}
