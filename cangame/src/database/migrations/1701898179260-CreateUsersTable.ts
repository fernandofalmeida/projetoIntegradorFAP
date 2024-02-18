import { MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateUsersTable1701898179260 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: false,
                        isUnique: true // Garante que o nome de usuário seja único
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'nivelAcesso',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'dataCadastro',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        isNullable: false
                    }
                ]
            })
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}