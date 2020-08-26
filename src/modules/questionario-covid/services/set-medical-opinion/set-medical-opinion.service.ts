import IUserObject from '@modules/questionario-covid/dtos/IUserObject';
import MedicalOpinionRepository from '@modules/questionario-covid/repositories/MedicalOpinionRepository';
import UserQuestionsRepository from '@modules/questionario-covid/repositories/UserQuestionsRepository';
import UsersRepository from '@modules/questionario-covid/repositories/UserRepository';
import { Injectable } from '@nestjs/common';
import covidConstants from '@shared/constants/questionario_covid';
import AppError from '@shared/infra/http/error/appError';
import moment from 'moment';

interface RequestDTO {
  questionId: string;
  opinion: string;
  userStatus: string;
}

@Injectable()
export class SetMedicalOpinionService {
  constructor(
    private medicalRepository: MedicalOpinionRepository,
    private userRepository: UsersRepository,
    private userQuestionRepository: UserQuestionsRepository,
  ) {}

  public async exec({
    questionId,
    opinion,
    userStatus,
  }: RequestDTO): Promise<IUserObject> {
    if (!questionId || !userStatus) {
      throw new AppError('Send correct variables!');
    }

    const question = await this.userQuestionRepository.findOne({
      id: questionId,
    });

    if (!question) {
      throw new AppError('Question does not exists');
    }

    if (userStatus === covidConstants.COLAB_STATUS_ORIENTADO_LIBERADO) {
      await this.userRepository.update(
        { userId: question.userId },
        {
          userStatus,
          userSymptoms: 0,
          covidSuspect: false,
          showDashboard: true,
        },
      );
    } else {
      await this.userRepository.update(
        { userId: question.userId },
        {
          userStatus,
        },
      );
    }

    try {
      if (!opinion || opinion === '') {
        opinion = 'Nenhuma Observação';
      }

      const medicalOpinion = this.medicalRepository.create({
        questionId,
        opinion,
        userStatus,
      });

      await this.medicalRepository.save(medicalOpinion);

      const user = await this.userRepository.findOne(question.userId);

      if (!user) {
        throw new AppError('User does not exists');
      }

      return {
        userId: question.userId,
        alreadyAnswer: this.userAnsweredToday(user.lastTimeAnswered),
        name: user.name,
        covidSuspect: user.covidSuspect,
        email: user.email,
        userStatus: user.userStatus,
        userSymptoms: covidConstants.SYMPTOMS_STATUS[user.userSymptoms],
        allowUseBooking: user.allowUseBooking,
      };
    } catch (error) {
      console.log(error);
      throw Error('Erro ao salvar o banco de dados');
    }
  }

  private userAnsweredToday(data: Date) {
    const today = moment();

    if (!data) {
      return false;
    }

    if (moment(data).isSame(today, 'day')) {
      return true;
    }
    return false;
  }
}
