import CustomFirebaseAdmin from '@shared/infra/firebase';
import AppError from '@shared/infra/http/error/appError';
import { IGetDocument } from '../dtos/IGetDocument';
import IFirebaseRepository from './IFirebaseRepository';

class FirebaseRepository implements IFirebaseRepository {
  firebaseDB: CustomFirebaseAdmin;

  constructor() {
    this.firebaseDB = new CustomFirebaseAdmin();
  }

  public async createUpdateDocument({
    collectionName,
    docId,
    data,
  }: ICreateUpdateDoc): Promise<void> {
    try {
      if (docId) {
        await this.firebaseDB.firebase
          .firestore()
          .collection(collectionName)
          .doc(docId)
          .set({ ...data }, { merge: true });
      } else {
        await this.firebaseDB.firebase
          .firestore()
          .collection(collectionName)
          .add(data);
      }
    } catch (e) {
      throw new AppError('Error saving data at Firebase');
    }
  }

  public async getDocument({
    databaseName,
    id,
  }: IGetDocument): Promise<
    FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
  > {
    try {
      const doc = await this.firebaseDB.firebase
        .firestore()
        .collection(databaseName)
        .doc(id)
        .get();

      return doc;
    } catch (e) {
      throw new AppError('Error Trying to consult firebase');
    }
  }
}

export default FirebaseRepository;
