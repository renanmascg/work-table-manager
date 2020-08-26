import IUserObject from '@modules/questionario-covid/dtos/IUserObject';
import UsersRepository from '@modules/questionario-covid/repositories/UserRepository';
import UsersPermissionRepository from '@modules/questionario-covid/repositories/UsersPermissionRepository';
import { Injectable } from '@nestjs/common';
import covidConstants from '@shared/constants/questionario_covid';
import AppError from '@shared/infra/http/error/appError';
import moment from 'moment';

interface RequestDTO {
  userId: string;
  name: string;
  email: string;
}

@Injectable()
export class GetUserHealthDataService {
  constructor(
    private usersRepository: UsersRepository,
    private usersPermissionRepository: UsersPermissionRepository,
  ) {}

  public async exec({ userId, name, email }: RequestDTO): Promise<IUserObject> {
    if (!name || !email) {
      throw new AppError('Variables must be sent.');
    }

    try {
      let user = await this.usersRepository.findOne({
        where: { userId },
      });

      if (!user) {
        user = this.usersRepository.create({
          userId,
          name,
          email,
        });

        await this.usersRepository.save(user);
      }

      const alreadyAnswer = this.userAnsweredToday(user.lastTimeAnswered);

      const userPermission = await this.usersPermissionRepository.findOne({
        email: user.email,
      });

      if (!userPermission) {
        user.allowUseBooking = false;
      } else {
        user.allowUseBooking = userPermission.usarPlataforma || false;
      }

      const userObject: IUserObject = {
        userId: user.userId,
        name: user.name,
        email: user.email,
        userStatus: user.userStatus,
        userSymptoms: covidConstants.SYMPTOMS_STATUS[user.userSymptoms],
        covidSuspect: user.covidSuspect,
        allowUseBooking: user.allowUseBooking,
        alreadyAnswer,
      };

      return userObject;
    } catch (error) {
      throw new AppError('Something wrong consulting user data');
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
