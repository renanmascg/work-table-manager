import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated.middleware';
import { FIREBASE_REPOSITORY_NAME } from '@shared/constants/providers';
import { BookingMesaController } from './controllers/booking-mesa/booking-mesa.controller';
import { UsersController } from './controllers/users/users.controller';
import { CheckinService } from './services/checkin/checkin.service';
import { CheckoutService } from './services/checkout/checkout.service';
import { CreateMesaService } from './services/create-mesa/create-mesa.service';
import { InitializeUserService } from './services/initialize-user/initialize-user.service';

@Module({
  controllers: [BookingMesaController, UsersController],
  providers: [
    CheckinService,
    CheckoutService,
    CreateMesaService,
    InitializeUserService,
  ],
})
export class GestaomesasModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ensureAuthenticated).exclude('/gestaomesas/create-mesa');
  }
}
