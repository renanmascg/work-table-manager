import IUserObject from '@modules/questionario-covid/dtos/IUserObject';
import UserModel from '@modules/questionario-covid/infra/typeorm/entities/UserModel';
import UsersRepository from '@modules/questionario-covid/repositories/UserRepository';
import { Injectable } from '@nestjs/common';
import covidConstants from '@shared/constants/questionario_covid';
import AppError from '@shared/infra/http/error/appError';

interface IAllUsersResponse {
  numberNoSymptoms: number;
  numberLightSymptoms: number;
  numberSeriousSymptoms: number;
  totalNumber: number;
  usersWithCovidSuspect: IUserObject[];
}

@Injectable()
export class GetAllUsersInfoService {
  constructor(private usersRepository: UsersRepository) {}

  public async exec(data: string): Promise<IAllUsersResponse> {
    if (!data) {
      throw new AppError('Parameter missing');
    }

    try {
      const usersWithCovidSuspect = await this.getAllUsersWithCovid();

      const [
        numberNoSymptoms,
        numberLightSymptoms,
        numberSeriousSymptoms,
        totalNumber,
      ] = await this.getParsedUsersFromDay(data);

      const treatedUsers = this.generateListOfUsers(usersWithCovidSuspect);

      return {
        numberNoSymptoms,
        numberLightSymptoms,
        numberSeriousSymptoms,
        totalNumber,
        usersWithCovidSuspect: treatedUsers,
      };
    } catch (e) {
      console.error(e);
      throw new AppError('Error Saving Data');
    }
  }

  private async getAllUsersWithCovid(): Promise<UserModel[]> {
    const usersWithCovidSuspect = await this.usersRepository.find({
      where: [
        { covidSuspect: true },
        { userStatus: covidConstants.COLAB_STATUS_ORIENTADO_LIBERADO },
        { showDashboard: true },
      ],
    });
    return usersWithCovidSuspect;
  }

  private async getParsedUsersFromDay(data: string): Promise<number[]> {
    const usersFromDay = await this.usersRepository.findByDate(data);

    let numberNoSymptoms = 0;
    let numberLightSymptoms = 0;
    let numberSeriousSymptoms = 0;

    for (let i = 0; i < usersFromDay.length; i++) {
      if (usersFromDay[i].userSymptoms === 0) {
        numberNoSymptoms += 1;
      } else if (usersFromDay[i].userSymptoms === 1) {
        numberLightSymptoms += 1;
      } else {
        numberSeriousSymptoms += 1;
      }
    }
    const totalNumber = usersFromDay.length;
    return [
      numberNoSymptoms,
      numberLightSymptoms,
      numberSeriousSymptoms,
      totalNumber,
    ];
  }

  private generateListOfUsers(listUsers: UserModel[]): IUserObject[] {
    return listUsers.map(user => {
      return {
        alreadyAnswer: true,
        covidSuspect: user.covidSuspect,
        email: user.email,
        name: user.name,
        userId: user.userId,
        userStatus: user.userStatus,
        userSymptoms: covidConstants.SYMPTOMS_STATUS[user.userSymptoms],
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
    });
  }
}
