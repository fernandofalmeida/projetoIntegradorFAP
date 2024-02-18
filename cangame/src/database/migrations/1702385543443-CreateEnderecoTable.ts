import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateEnderecoTable1702385543443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'endereco',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'UF',
                    type: 'varchar',
                },
                {
                    name: 'cidade',
                    type: 'varchar',
                },
                {
                    name: 'bairro',
                    type: 'varchar',
                },
                {
                    name: 'rua',
                    type: 'varchar',
                },
                {
                    name: 'numero',
                    type: 'int',
                },
                {
                    name: 'comp',
                    type: 'varchar',
                },
                {
                    name: 'cep',
                    type: 'varchar',
                },
            ],
        }), 
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('endereco');
    }

}
