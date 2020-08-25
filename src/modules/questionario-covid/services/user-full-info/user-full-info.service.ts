import IMedicalHistory from '@modules/questionario-covid/dtos/IMedicalHistory';
import IUserFullInfo from '@modules/questionario-covid/dtos/IUserFullInfo';
import IUserObject from '@modules/questionario-covid/dtos/IUserObject';
import UserModel from '@modules/questionario-covid/infra/typeorm/entities/UserModel';
import UsersRepository from '@modules/questionario-covid/repositories/UserRepository';
import { Injectable } from '@nestjs/common';
import covidConstants from '@shared/constants/questionario_covid';
import AppError from '@shared/infra/http/error/appError';
import moment from 'moment';

interface IQuestionAndMedicalHistory {
  medicalHistory: IMedicalHistory[];
  lastQuestionId: string;
}

@Injectable()
export class UserFullInfoService {
  constructor(private usersRepository: UsersRepository) {}

  public async exec(userId: string): Promise<IUserFullInfo> {
    if (!userId) {
      throw new AppError('Parameter missing');
    }

    const user = await this.getUserInfo(userId);

    const questionAndMedicalHistory = this.getQuestionAndMedicalHistory(user);

    const userObject: IUserObject = {
      alreadyAnswer: this.userAnsweredToday(user.lastTimeAnswered),
      covidSuspect: user.covidSuspect,
      email: user.email,
      name: user.name,
      userId: user.userId,
      userStatus: user.userStatus,
      userSymptoms: user.userSymptoms,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return {
      user: userObject,
      lastQuestionId: questionAndMedicalHistory.lastQuestionId,
      medicalHistory: questionAndMedicalHistory.medicalHistory,
    };
  }

  private async getUserInfo(userId: string): Promise<UserModel> {
    try {
      const user = await this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.questions', 'question')
        .leftJoinAndSelect('question.opinion', 'opinion')
        .where({ userId })
        .orderBy('question.created_at', 'DESC')
        .getOne();

      if (!user) {
        throw new AppError('User does not exists.');
      }

      return user;
    } catch (e) {
      console.log(e);
      throw new AppError('Error consulting user info');
    }
  }

  private getQuestionAndMedicalHistory(
    user: UserModel,
  ): IQuestionAndMedicalHistory {
    try {
      const questionsHardSymptoms = user.questions.filter(
        quest =>
          quest.userSymptomStatus === covidConstants.SYMPTOMS_STATUS_HARD,
      );

      const lastQuestionId = questionsHardSymptoms[0].id;

      const medicalHistory: IMedicalHistory[][] = questionsHardSymptoms.map(
        quest => {
          const formatedOpinions: IMedicalHistory[] = quest.opinion.map(op => {
            return {
              createdAt: op.created_at,
              opinion: op.opinion,
              status: op.userStatus,
              symptoms: quest.questions,
            };
          });
          return formatedOpinions;
        },
      );

      let listOpinions: IMedicalHistory[] = [];

      for (let i = 0; i < medicalHistory.length; i++) {
        listOpinions = listOpinions.concat(medicalHistory[i]);
      }

      listOpinions.sort((a, b) => {
        const c = new Date(a.createdAt);
        const d = new Date(b.createdAt);

        if (c > d) {
          return -1;
        }
        if (c < d) {
          return 1;
        }
        return 0;
      });

      return {
        medicalHistory: listOpinions,
        lastQuestionId,
      };
    } catch (e) {
      throw new AppError('Something went wrong generating medical history');
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
