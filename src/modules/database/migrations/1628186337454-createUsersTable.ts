import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class createusersTable1628186337454 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const TABLE_NAME = 'users';

        await queryRunner.createTable(
            new Table({
                name: 'users',
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
                        type: 'varchar(50)',
                    },
                    {
                        name: 'email',
                        type: 'varchar(50)',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar(200)',
                    },
                    {
                        name: 'enabled',
                        type: 'boolean',
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
        await queryRunner.dropTable('users');
    }
}
