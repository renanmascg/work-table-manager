import UserModel from '@modules/questionario-covid/infra/typeorm/entities/UserModel';
import moment from 'moment';
import { Between, EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserModel)
class UsersRepository extends Repository<UserModel> {
  public async findByDate(data: string | Date): Promise<UserModel[]> {
    return this.find({
      where: {
        created_at: Between(
          moment(data)
            .startOf('day')
            .toDate(),
          moment(data)
            .endOf('day')
            .toDate(),
        ),
      },
    });
  }
}

export default UsersRepository;
