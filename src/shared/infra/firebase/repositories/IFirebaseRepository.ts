import { IGetDocument } from '../dtos/IGetDocument';

abstract class IFirebaseRepository {
  public abstract async createUpdateDocument({
    collectionName,
    docId,
    data,
  }: ICreateUpdateDoc): Promise<void>;

  public abstract async getDocument({
    databaseName,
    id,
  }: IGetDocument): Promise<
    FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
  >;
}

export default IFirebaseRepository;
