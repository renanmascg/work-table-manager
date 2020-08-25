import configKeys from '@config/config_keys';
import admin from 'firebase-admin';

class CustomFirebaseAdmin {
  firebase: admin.app.App;

  constructor() {
    this.firebase = admin.initializeApp({
      ...configKeys.firebaseConfig,
      credential: admin.credential.cert(
        configKeys.firebaseAdminSdkServiceAccount as admin.ServiceAccount,
      ),
      databaseURL: 'https://gestao-lugares.firebaseio.com',
    });
  }
}

export default CustomFirebaseAdmin;
