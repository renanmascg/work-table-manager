import User from '@modules/users/infra/typeorm/entities/User';
import { Injectable } from '@nestjs/common';
import AppError from '@shared/infra/http/error/appError';
import { hash } from 'bcryptjs';
import UsersRepository from '../../infra/typeorm/repositories/usersRepository';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export default class CreateUserService {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    this.usersRepository.save(user);

    return user;
  }
}
