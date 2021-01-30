import { GestaomesasModule } from '@modules/gestaomesas/gestaomesas.module';
import { QuestionarioCovidModule } from '@modules/questionario-covid/infra/http/questionario-covid.module';
import { RefeitorioModule } from '@modules/refeitorio/refeitorio.module';
import UsersModule from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FIREBASE_REPOSITORY_NAME } from '@shared/constants/providers';
import FirebaseRepository from '@shared/infra/firebase/repositories/FirebaseRepository';

@Module({
  imports: [
    GestaomesasModule,
    RefeitorioModule,
    QuestionarioCovidModule,
    UsersModule,
    TypeOrmModule.forRoot(),
  ],
  providers: [
    {
      provide: FIREBASE_REPOSITORY_NAME,
      useClass: FirebaseRepository,
    },
  ],
})
export default class AppModule {}
