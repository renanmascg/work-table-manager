import UsersPermission from '@modules/questionario-covid/infra/typeorm/entities/UsersPermissionModel';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UsersPermission)
class UsersPermissionRepository extends Repository<UsersPermission> {}

export default UsersPermissionRepository;
