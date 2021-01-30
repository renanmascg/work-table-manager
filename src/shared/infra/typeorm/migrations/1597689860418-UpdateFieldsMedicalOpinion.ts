import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class UpdateFieldsMedicalOpinion1597689860418
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'boavolta_medicalopinion',
			new TableColumn({
				name: 'created_at',
				type: 'datetime',
				default: 'GETDATE()',
			}),
		);

		await queryRunner.addColumn(
			'boavolta_medicalopinion',
			new TableColumn({
				name: 'updated_at',
				type: 'datetime',
				default: 'GETDATE()',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('boavolta_medicalopinion', 'updated_at');

		await queryRunner.dropColumn('boavolta_medicalopinion', 'created_at');
	}
}
