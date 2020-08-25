import { IUserInfo } from './IUserInfo';

export default interface AuthResponse {
  userData: IUserInfo;
  token: string;
  userDataMocked?: IUserInfo;
}
