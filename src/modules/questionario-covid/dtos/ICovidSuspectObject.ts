import UserModel from '../infra/typeorm/entities/UserModel';

export interface ICovidSuspect {
  user: UserModel;
  questions: string[];
}

export interface ICovidSuspectResponse {
  covidSuspect: boolean;
  userSymptoms: string;
  userStatus: string;
  showDashboard: boolean;
}
