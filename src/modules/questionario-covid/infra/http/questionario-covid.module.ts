import MedicalOpinionRepository from '@modules/questionario-covid/repositories/MedicalOpinionRepository';
import UserQuestionsRepository from '@modules/questionario-covid/repositories/UserQuestionsRepository';
import UsersRepository from '@modules/questionario-covid/repositories/UserRepository';
import UsersPermissionRepository from '@modules/questionario-covid/repositories/UsersPermissionRepository';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated.middleware';
import { ListController } from '../../controllers/list/list.controller';
import { MedicalOpinionController } from '../../controllers/medical-opinion/medical-opinion.controller';
import { QuestionarioCovidController } from '../../controllers/questionario-covid/questionario-covid.controller';
import { QuestionsController } from '../../controllers/questions/questions.controller';
import { CreateUpdateListService } from '../../services/create-update-list/create-update-list.service';
import { GetAllUsersInfoService } from '../../services/get-all-users-info/get-all-users-info.service';
import { GetUserHealthDataService } from '../../services/get-user-health-data/get-user-health-data.service';
import { SaveUserAnswerService } from '../../services/save-user-answer/save-user-answer.service';
import { SetMedicalOpinionService } from '../../services/set-medical-opinion/set-medical-opinion.service';
import { UserFullInfoService } from '../../services/user-full-info/user-full-info.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MedicalOpinionRepository,
      UserQuestionsRepository,
      UsersRepository,
      UsersPermissionRepository,
    ]),
  ],
  controllers: [
    MedicalOpinionController,
    ListController,
    QuestionarioCovidController,
    QuestionsController,
  ],
  providers: [
    GetAllUsersInfoService,
    GetUserHealthDataService,
    SaveUserAnswerService,
    SetMedicalOpinionService,
    UserFullInfoService,
    CreateUpdateListService,
  ],
})
export class QuestionarioCovidModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(ensureAuthenticated)
      .exclude({
        path: '/questionario-covid/questions',
        method: RequestMethod.GET,
      })
      .exclude('/questionario-covid/list')
      .forRoutes(
        MedicalOpinionController,
        ListController,
        QuestionarioCovidController,
        QuestionsController,
      );
  }
}
