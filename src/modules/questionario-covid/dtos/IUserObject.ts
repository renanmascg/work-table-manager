export default interface IUserObject {
  userId: string;
  name: string;
  email: string;
  userStatus: string;
  userSymptoms: string;
  covidSuspect: boolean;
  alreadyAnswer: boolean;
  allowUseBooking?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
