import { Module } from '@nestjs/common';
import { GestaomesasModule } from '@modules/gestaomesas/gestaomesas.module';
import { SessionsModule } from '@modules/sessions/sessions.module';
import { RefeitorioModule } from '@modules/refeitorio/refeitorio.module';
import { FIREBASE_REPOSITORY_NAME } from '@shared/constants/providers';
import FirebaseRepository from '@shared/infra/firebase/repositories/FirebaseRepository';

@Module({
  imports: [GestaomesasModule, SessionsModule, RefeitorioModule],
  providers: [
    {
      provide: FIREBASE_REPOSITORY_NAME,
      useClass: FirebaseRepository,
    },
  ],
})
export default class AppModule {}
