import questCovidConstants from '@shared/constants/questionario_covid';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateUserQuestionModel1597405193156
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'boavolta_userquestion',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'NEWID()',
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'userFeelingGood',
            type: 'bit',
          },
          {
            name: 'userSymptomStatus',
            type: 'varchar',
            enum: questCovidConstants.SYMPTOMS_STATUS,
          },
          {
            name: 'questions',
            type: 'varchar',
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

    await queryRunner.createForeignKey(
      'boavolta_userquestion',
      new TableForeignKey({
        name: 'useridQuestionForeignKey',
        columnNames: ['userId'],
        referencedColumnNames: ['userId'],
        referencedTableName: 'boavolta_users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'boavolta_userquestion',
      'useridQuestionForeignKey',
    );

    await queryRunner.dropTable('boavolta_userquestion');
  }
}
