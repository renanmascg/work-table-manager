import questCovidConstants from '@shared/constants/questionario_covid';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUser1597259917253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'boavolta_users',
        columns: [
          {
            name: 'userId',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'covidSuspect',
            type: 'bit',
            default: 0,
          },
          {
            name: 'lastTimeAnswered',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'userStatus',
            type: 'varchar',
            enum: questCovidConstants.COLABORADOR_STATUS,
            default: "'Sem Acompanhamento'",
          },
          {
            name: 'userSymptoms',
            type: 'varchar',
            enum: questCovidConstants.SYMPTOMS_STATUS,
            default: "'SEM_SINTOMAS'",
          },
          {
            name: 'showDashboard',
            type: 'bit',
            default: 0,
          },
          {
            name: 'allowUseBooking',
            type: 'bit',
            default: 0,
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('boavolta_users');
  }
}
