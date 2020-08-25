import { IRefeitorioInfo } from '@modules/refeitorio/dtos/IRefeitorioInfo';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import gestaomesasConstants from '@shared/constants/gestaomesas';
import { FIREBASE_REPOSITORY_NAME } from '@shared/constants/providers';
import IFirebaseRepository from '@shared/infra/firebase/repositories/IFirebaseRepository';
import AppError from '@shared/infra/http/error/appError';

@Injectable()
export class CheckoutRefeitorioService implements OnModuleInit {
  private firebaseRepository: IFirebaseRepository;

  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit(): Promise<void> {
    this.firebaseRepository = await this.moduleRef.get(
      FIREBASE_REPOSITORY_NAME,
      {
        strict: false,
      },
    );
  }

  public async exec(userId: string): Promise<void> {
    const refeitorioInfo = await this.verifyUserBookedMesa(userId);

    await this.checkoutUser(refeitorioInfo, userId);
  }

  private async verifyUserBookedMesa(userId: string): Promise<IRefeitorioInfo> {
    const userInfo = await this.firebaseRepository.getDocument({
      databaseName: '/usuarios',
      id: userId,
    });

    if (!userInfo.exists || !userInfo.get('isUsingRefeitorio')) {
      throw new AppError('User does not book any mesa.');
    }

    return userInfo.get('refeitorioInfo') as IRefeitorioInfo;
  }

  private async checkoutUser(
    refeitorioInfo: IRefeitorioInfo,
    userId: string,
  ): Promise<void> {
    await this.firebaseRepository.createUpdateDocument({
      collectionName: '/lugares-andares',
      docId: `andar${refeitorioInfo.andar}`,
      data: {
        [`mesa-${refeitorioInfo.mesa}`]: {
          status: gestaomesasConstants.STATUS_DISPONIVEL,
          usuarioId: '',
        },
      },
    });

    await this.firebaseRepository.createUpdateDocument({
      collectionName: '/usuarios',
      docId: userId,
      data: {
        isUsingRefeitorio: false,
        refeitorioInfo: {},
      },
    });
  }
}
