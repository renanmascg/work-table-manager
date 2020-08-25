import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated.middleware';
import { RefeitorioController } from './controllers/refeitorio/refeitorio.controller';
import { BookRefeitorioMesaService } from './services/book-refeitorio-mesa/book-refeitorio-mesa.service';
import { CheckoutRefeitorioService } from './services/checkout/checkout.service';

@Module({
  controllers: [RefeitorioController],
  providers: [BookRefeitorioMesaService, CheckoutRefeitorioService],
})
export class RefeitorioModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ensureAuthenticated).forRoutes(RefeitorioController);
  }
}
