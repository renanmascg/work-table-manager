import admin from 'firebase-admin';
import configKeys from '@config/config_keys';

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
