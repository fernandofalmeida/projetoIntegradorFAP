import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateGestorTable1702035423371 implements MigrationInterface {
    
        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(new Table({
                name: 'gestor',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'cargo',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'telefone',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'contratoId',
                        type: 'int',
                    },
                ],
            }), true);
    
            // Adição da chave estrangeira para endereco
        await queryRunner.createForeignKey('gestor', new TableForeignKey({
            columnNames: ['contratoId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'contrato',
            onDelete: 'CASCADE',
        }));

        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable('gestor');
        }
    
    }
    