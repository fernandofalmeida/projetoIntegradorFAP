import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateLicencaTable1704293947344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'licenca',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'total',
                        type: 'int',
                    },
                    {
                        name: 'utilizadas',
                        type: 'int',
                    },
                    {
                        name: 'disponivel',
                        type: 'int',
                    },
                    {
                        name: 'dataAquisicao',
                        type: 'timestamp',
                    },
                    {
                        name: 'dataExpiracao',
                        type: 'timestamp',
                    },
                    {
                        name: 'contratoId',
                        type: 'int',
                    },
                ],
            }), true);
    
             // Adição da chave estrangeira para contrato
    await queryRunner.createForeignKey('licenca', new TableForeignKey({
        columnNames: ['contratoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contrato',
        onDelete: 'CASCADE',
    }));

        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('licenca');
    }
}
