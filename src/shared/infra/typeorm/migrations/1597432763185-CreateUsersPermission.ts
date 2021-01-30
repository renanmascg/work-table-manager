import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsersPermission1597432763185
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'boavolta_userspermission',
				columns: [
					{
						name: 'email',
						type: 'varchar',
						isUnique: true,
						isPrimary: true,
					},
					{
						name: 'usarPlataforma',
						type: 'bit',
						default: 0,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('boavolta_userspermission');
	}
}
