import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateTelefoneTable1702385558636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'telefone',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'numero',
                    type: 'varchar',
                },
                {
                    name: 'contratoId',
                    type: 'int',
                },
            ],
        }), true);

        // Adição da chave estrangeira para contrato
    await queryRunner.createForeignKey('telefone', new TableForeignKey({
        columnNames: ['contratoId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contrato',
        onDelete: 'CASCADE',
    }));
           
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('telefone');
    }

}
