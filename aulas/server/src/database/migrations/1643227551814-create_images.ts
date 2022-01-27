import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1643227551814 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'images',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,//não pode ser negativa
                    isPrimary: true,//chave identificadora
                    isGenerated: true,//gerada automaticamente 
                    generationStrategy: 'increment'//auto-incremente
                },

                {
                    name: 'path',
                    type: 'varchar',
                },

                {
                    name: 'orphanage_id',
                    type: 'integer',
                }
            ],

            foreignKeys: [
                {
                    name: 'ImageOrphanage',
                    columnNames: ['orphanage_id'],
                    referencedTableName: 'orphanages',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
