interface ICreateUpdateDoc {
  collectionName: string;
  docId?: string;
  data: {
    [key: string]: unknown;
  };
}
