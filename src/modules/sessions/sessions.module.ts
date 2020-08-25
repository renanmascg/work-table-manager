import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated.middleware';
import { AuthenticateSessionsService } from './services/authenticate-sessions/authenticate-sessions.service';
import { SessionsController } from './controllers/sessions/sessions.controller';

@Module({
  controllers: [SessionsController],
  providers: [AuthenticateSessionsService],
})
export class SessionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ensureAuthenticated).forRoutes('/sessions/validate-token');
  }
}
