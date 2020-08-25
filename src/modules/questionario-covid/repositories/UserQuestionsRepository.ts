import UserQuestionModel from '@modules/questionario-covid/infra/typeorm/entities/UserQuestionModel';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserQuestionModel)
class UserQuestionsRepository extends Repository<UserQuestionModel> {}

export default UserQuestionsRepository;
