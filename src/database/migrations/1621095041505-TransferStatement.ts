import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class TransferStatement1621095041505 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'statements',
            new TableColumn({
                name: 'receiver_id',
                type: 'uuid',
            })
        );

        await queryRunner.createForeignKey(
            'statements',
            new TableForeignKey({
                name: 'FKReceiver',
                columnNames: ['receiver_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('statements', 'FKReceiver');
        await queryRunner.dropColumn('statements','receiver_id');
    }

}
