import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTypes1621098077652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('statements', 'type');

        await queryRunner.addColumn(
            'statements',
            new TableColumn({
                name: 'type',
                type: 'enum',
                enum: ['deposit', 'withdraw', 'transfer']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('statements', 'type');

        await queryRunner.addColumn(
            'statements',
            new TableColumn({
                name: 'type',
                type: 'enum',
                enum: ['deposit', 'withdraw']
            })
        );
    }

}
