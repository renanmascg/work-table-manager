import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { FIREBASE_REPOSITORY_NAME } from '@shared/constants/providers';
import IFirebaseRepository from '@shared/infra/firebase/repositories/IFirebaseRepository';
import gestaomesasConstants from '@shared/constants/gestaomesas';
import AppError from '@shared/infra/http/error/appError';
import IMesa from '@modules/gestaomesas/dtos/IMesa';
import { ModuleRef } from '@nestjs/core';
import FirebaseRepository from '@shared/infra/firebase/repositories/FirebaseRepository';

interface RequestDTO {
  mesa: number;
  andar: number;
  userId: string;
}

@Injectable()
export class CheckoutService implements OnModuleInit {
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

  public async exec({ mesa, andar, userId }: RequestDTO): Promise<void> {
    if (!mesa || !andar || !userId) {
      throw new AppError('Parameters must be sent');
    }

    const andarInfo = await this.firebaseRepository.getDocument({
      databaseName: '/lugares-andares',
      id: `andar${andar}`,
    });

    const mesaInfo: IMesa = andarInfo.get(`mesa-${mesa}`);

    await this.verifyMesaIsAvailable(mesaInfo, userId);

    await this.saveAtFirebase({
      mesa,
      andar,
      userId,
    });
  }

  private async verifyMesaIsAvailable(
    mesaInfo: IMesa,
    userId: string,
  ): Promise<void> {
    if (!mesaInfo || mesaInfo.usuarioId !== userId) {
      throw new AppError('User is not using this place!');
    }

    if (mesaInfo.status !== gestaomesasConstants.STATUS_EM_USO) {
      throw new AppError('This place is not available for booking.');
    }
  }

  private async saveAtFirebase({
    mesa,
    andar,
    userId,
  }: RequestDTO): Promise<void> {
    await this.firebaseRepository.createUpdateDocument({
      collectionName: '/lugares-andares',
      docId: `andar${andar}`,
      data: {
        [`mesa-${mesa}`]: {
          status: gestaomesasConstants.STATUS_DISPONIVEL,
          usuarioId: '',
        },
      },
    });

    await this.firebaseRepository.createUpdateDocument({
      collectionName: '/usuarios',
      docId: userId,
      data: {
        isUsandoMesa: false,
        andar: '',
        mesa: '',
      },
    });
  }
}
