import UsersRepository from '@modules/users/infra/typeorm/repositories/usersRepository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersController from './infra/http/controllers/users/users.controller';
import { AuthenticateSessionsService } from './services/authenticate-sessions/authenticate-sessions.service';
import CreateUserService from './services/create-user/create-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UsersController],
  providers: [CreateUserService, AuthenticateSessionsService],
})
export default class UsersModule {}
