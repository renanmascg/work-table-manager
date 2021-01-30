import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import questCovidConstants from '@shared/constants/questionario_covid';

export default class CreateMedicalOpinionModel1597673437107
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'boavolta_medicalopinion',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'NEWID()',
					},
					{
						name: 'questionId',
						type: 'varchar',
					},
					{
						name: 'userStatus',
						type: 'varchar',
						enum: questCovidConstants.COLABORADOR_STATUS,
					},
					{
						name: 'opinion',
						type: 'varchar',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('boavolta_medicalopinion');
	}
}
