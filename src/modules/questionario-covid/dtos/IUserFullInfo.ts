import IMedicalHistory from './IMedicalHistory';
import IUserObject from './IUserObject';

export default interface IUserFullInfo {
  user: IUserObject;
  lastQuestionId: string;
  medicalHistory: IMedicalHistory[];
}
