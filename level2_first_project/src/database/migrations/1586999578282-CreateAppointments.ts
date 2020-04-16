/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1586999578282
implements MigrationInterface {
    /**
     * The up method has instructions for applying changes
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                ],
            }),
        );
    }

    /**
     * The down method undoes whatever the up method did
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }
}
