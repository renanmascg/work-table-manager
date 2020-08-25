import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import IFirebaseRepository from '@shared/infra/firebase/repositories/IFirebaseRepository';
import gestaomesasConstants from '@shared/constants/gestaomesas';
import { FIREBASE_REPOSITORY_NAME } from '@shared/constants/providers';
import IMesa from '@modules/gestaomesas/dtos/IMesa';
import AppError from '@shared/infra/http/error/appError';
import { ModuleRef } from '@nestjs/core';

interface RequestDTO {
  mesa: number;
  andar: number;
  userId: string;
}

@Injectable()
export class CheckinService implements OnModuleInit {
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

    await this.verifyMesaIsAvailable(mesaInfo);

    await this.verifyUserStatus(userId);

    await this.saveAtFirebase({
      mesa,
      andar,
      userId,
    });
  }

  private async verifyMesaIsAvailable(mesaInfo: IMesa): Promise<void> {
    if (!mesaInfo) {
      throw new AppError('Mesa does not exists!');
    }

    if (mesaInfo.status !== gestaomesasConstants.STATUS_DISPONIVEL) {
      throw new AppError('This place is not available for booking.');
    }
  }

  private async verifyUserStatus(userId: string): Promise<void> {
    const userInfo = await this.firebaseRepository.getDocument({
      databaseName: '/usuarios',
      id: userId,
    });

    const isUsandoMesa: boolean = userInfo.get('isUsandoMesa');

    if (isUsandoMesa) {
      throw new AppError('You already using another place.');
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
          status: gestaomesasConstants.STATUS_EM_USO,
          usuarioId: userId,
        },
      },
    });

    await this.firebaseRepository.createUpdateDocument({
      collectionName: '/usuarios',
      docId: userId,
      data: {
        isUsandoMesa: true,
        andar,
        mesa,
        checkinHoje: true,
      },
    });
  }
}
