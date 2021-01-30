import authConfig from '@config/auth';
import { IUserInfo } from '@modules/users/dtos/IUserInfo';
import UsersRepository from '@modules/users/infra/typeorm/repositories/usersRepository';
import { Injectable } from '@nestjs/common';
import AppError from '@shared/infra/http/error/appError';
import { compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  user: IUserInfo;
  token: string;
}

@Injectable()
export class AuthenticateSessionsService {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = this.generateAplicationToken(user.email);

    const userInfo = this.buildGenericUserInfoTerceiros(user.email);

    return {
      user: userInfo,
      token,
    };
  }

  private generateAplicationToken(email: string): string {
    return jwt.sign({}, authConfig.secret, {
      subject: Buffer.from(email).toString('base64'),
      expiresIn: authConfig.expiresIn,
    });
  }

  private buildGenericUserInfoTerceiros(email: string): IUserInfo {
    return {
      numeroCPF: '',
      loginColaborador: email,
      numeroMatricula: 12345,
      primeiroNome: email,
      nomeCompleto: email,
      enderecoEmail: `${email}@bv.com.br`,
      codigoEmpresa: 0,
      listaGrupoAD: [],
      identificadorGestor: false,
      isTerceiro: true,
    };
  }
}
