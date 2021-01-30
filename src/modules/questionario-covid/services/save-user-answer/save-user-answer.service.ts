import {
  ICovidSuspect,
  ICovidSuspectResponse,
} from '@modules/questionario-covid/dtos/ICovidSuspectObject';
import IUserObject from '@modules/questionario-covid/dtos/IUserObject';
import MedicalOpinionRepository from '@modules/questionario-covid/repositories/MedicalOpinionRepository';
import UserQuestionsRepository from '@modules/questionario-covid/repositories/UserQuestionsRepository';
import UsersRepository from '@modules/questionario-covid/repositories/UserRepository';
import { Injectable } from '@nestjs/common';
import covidConstants from '@shared/constants/questionario_covid';
import AppError from '@shared/infra/http/error/appError';

interface RequestDTO {
  userId: string;
  userFeelingGood: boolean;
  questions: string[];
}

@Injectable()
export class SaveUserAnswerService {
  constructor(
    private usersRepository: UsersRepository,
    private userQuestionsRepository: UserQuestionsRepository,
    private medicalRepository: MedicalOpinionRepository,
  ) {}

  public async exec({
    userId,
    userFeelingGood,
    questions,
  }: RequestDTO): Promise<IUserObject> {
    if (!userId || userFeelingGood === undefined || !questions) {
      throw new AppError('Params missing');
    }

    const user = await this.usersRepository.findOne({ userId });

    if (!user) {
      throw new AppError('User does not exists');
    }

    try {
      const covidSuspectData = this.isCovidSuspect({ questions, user });

      const listAnswer = questions
        .map(ans => ans.replace('\n', ' '))
        .toString();

      await this.usersRepository.update(
        { userId },
        {
          covidSuspect: covidSuspectData.covidSuspect,
          showDashboard: covidSuspectData.showDashboard,
          email: user.email,
          userStatus: covidSuspectData.userStatus,
          userSymptoms: covidSuspectData.userSymptoms,
          lastTimeAnswered: new Date(),
        },
      );

      const questionsUser = this.userQuestionsRepository.create({
        userId,
        email: user.email,
        userFeelingGood,
        userSymptomStatus: covidSuspectData.userSymptoms,
        questions: listAnswer,
      });

      await this.userQuestionsRepository.save(questionsUser);

      await this.createFirstMedicalOpinion(
        questionsUser.id,
        covidSuspectData.userStatus,
      );

      return {
        userId: user.userId,
        name: user.name,
        email: user.email,
        userStatus: covidSuspectData.userStatus,
        userSymptoms:
          covidConstants.SYMPTOMS_STATUS[covidSuspectData.userSymptoms],
        covidSuspect: covidSuspectData.covidSuspect,
        alreadyAnswer: true,
      };
    } catch (err) {
      console.log(err);
      throw new AppError('Something went wrong');
    }
  }

  private isCovidSuspect({
    questions,
    user,
  }: ICovidSuspect): ICovidSuspectResponse {
    let symptoms = 0;
    let covidSuspect = false;
    let userSymptoms = 0;
    let userStatus = covidConstants.COLAB_STATUS_NO_ACOMPANHAMENTO;
    let { showDashboard } = user;

    // Verify if user may have COVID
    for (let i = 0; i < questions.length; i++) {
      if (covidConstants.COVID_SYMPTOMS.includes(questions[i])) {
        symptoms += 1;
      }

      if (covidConstants.COVID_HARD_SYMPTOMS.includes(questions[i])) {
        covidSuspect = true;
      }
    }

    if (symptoms >= 2) covidSuspect = true;

    if (covidSuspect) {
      userSymptoms = 2;
      userStatus = covidConstants.COLAB_STATUS_AGUARDANDO_ACOMPANHAMENTO;
      showDashboard = true;
    } else if (symptoms > 0) {
      userSymptoms = 1;
    }

    return { covidSuspect, userSymptoms, userStatus, showDashboard };
  }

  private async createFirstMedicalOpinion(
    questionId: string,
    userStatus: string,
  ) {
    const opinion = 'Nenhuma Observação';

    const medicalOpinion = this.medicalRepository.create({
      questionId,
      opinion,
      userStatus,
    });

    await this.medicalRepository.save(medicalOpinion);
  }
}
