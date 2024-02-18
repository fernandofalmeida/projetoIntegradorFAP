import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateContratoTable1701898179260 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'contrato',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'cnpj',
                        type: 'varchar',
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                    },
                    {
                        name: 'logotipo',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                    },
                    {
                        name: 'qtdLicencas',
                        type: 'int',
                    },
                    {
                        name: 'termo',
                        type: 'boolean',
                    },
                    {
                        name: 'administradorId',
                        type: 'int',
                    },
                    {
                        name: 'enderecoId',
                        type: 'int',
                    },
                ],
            }), true);

             // Adição da chave estrangeira para administrador
        await queryRunner.createForeignKey('contrato', new TableForeignKey({
            columnNames: ['administradorId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'administrador',
            onDelete: 'CASCADE',
        }));
    
            // Adição da chave estrangeira para endereco
        await queryRunner.createForeignKey('contrato', new TableForeignKey({
            columnNames: ['enderecoId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'endereco',
            onDelete: 'CASCADE',
        }));

        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('contrato');
    }
}
