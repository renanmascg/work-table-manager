import authConfig from '@config/auth';
import { IToken } from '@modules/sessions/dtos/IToken';
import { Injectable } from '@nestjs/common';
import AppError from '@shared/infra/http/error/appError';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-extraneous-dependencies
import qs from 'qs';
import IAuthResponse from '../../dtos/IAuthResponse';
import { IUserInfo } from '../../dtos/IUserInfo';

interface RequestDTO {
  email: string;
  password: string;
  isProd: boolean;
}

@Injectable()
export class AuthenticateSessionsService {
  public async execute({
    email,
    password,
    isProd,
  }: RequestDTO): Promise<IAuthResponse> {
    if (!email || !password) {
      throw new AppError('Parameters missing', 401);
    }

    if (!isProd && email === 'teste.eht' && password === 'ehtTeste123') {
      return {
        userData: this.buildUserInfoTerceiros(email),
        token: this.generateAplicationToken(email),
        userDataMocked: this.buildUserInfoTerceiros(email),
      };
    }

    const bvToken = await this.getToken({ email, password, isProd });

    const userData = await this.getUserData(
      bvToken.access_token,
      email,
      isProd,
    );

    const appToken = this.generateAplicationToken(email);

    return {
      userData,
      token: appToken,
    };
  }

  private async getToken({
    email,
    password,
    isProd,
  }: RequestDTO): Promise<IToken> {
    try {
      const client_id = isProd
        ? authConfig.client_id_prod
        : authConfig.client_id_uat;

      const client_secret = isProd
        ? authConfig.client_secret_prod
        : authConfig.client_secret_uat;

      const baseURL = isProd
        ? 'https://api.bancovotorantim.com.br'
        : 'https://api-uat.bancovotorantim.com.br';

      const params = {
        client_id,
        client_secret,
        grant_type: 'password',
        password: `colaborador:${password}`,
        username: email,
      };

      const response = await axios.post(
        '/auth/oauth/v2/token',
        qs.stringify(params),
        {
          baseURL,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const tokenInfo: IToken = response.data;

      return tokenInfo;
    } catch (e) {
      throw new AppError('Error consulting token API', 401);
    }
  }

  private async getUserData(
    access_token: string,
    email: string,
    isProd: boolean,
  ): Promise<IUserInfo> {
    try {
      const response = await axios.get(
        '/v2/corporativo/integradorcanais/identidade-colaborador/obter',
        {
          baseURL: isProd
            ? 'https://api.bancovotorantim.com.br'
            : 'https://api-uat.bancovotorantim.com.br',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const userData = jwt.decode(response.data.token) as IUserInfo;

      userData.identificadorGestor =
        userData.listaGrupoAD[0].identificadorGestor;
      userData.isTerceiro = false;

      return userData;
    } catch (e) {
      return this.buildUserInfoTerceiros(email);
    }
  }

  private generateAplicationToken(email: string): string {
    return jwt.sign({}, authConfig.secret, {
      subject: Buffer.from(email).toString('base64'),
      expiresIn: authConfig.expiresIn,
    });
  }

  private buildUserInfoTerceiros(email: string): IUserInfo {
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
