import { EntityRepository, Repository } from 'typeorm';
import UserEntity from '../entities/User';

@EntityRepository(UserEntity)
class UsersRepository extends Repository<UserEntity> {}

export default UsersRepository;
