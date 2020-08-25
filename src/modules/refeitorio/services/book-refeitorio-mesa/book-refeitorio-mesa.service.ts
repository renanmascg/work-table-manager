import IMesa from '@modules/gestaomesas/dtos/IMesa';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import gestaomesasConstants from '@shared/constants/gestaomesas';
import { FIREBASE_REPOSITORY_NAME } from '@shared/constants/providers';
import IFirebaseRepository from '@shared/infra/firebase/repositories/IFirebaseRepository';
import AppError from '@shared/infra/http/error/appError';
import moment from 'moment';

interface RequestDTO {
  mesa: number;
  andar: number;
  userId: string;
}

@Injectable()
export class BookRefeitorioMesaService implements OnModuleInit {
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
      throw new AppError('Variables mesa and andar must be sent');
    }

    await this.verifyUserAlreadyBooked(userId);
    await this.verifyMesaIsAvailable(mesa, andar);
    await this.saveFirebaseInfo({ mesa, andar, userId });
  }

  private async verifyUserAlreadyBooked(userId: string) {
    const userInfo = await this.firebaseRepository.getDocument({
      databaseName: '/usuarios',
      id: userId,
    });

    if (userInfo.get('isUsingRefeitorio')) {
      throw new AppError('User already booked a place.');
    }
  }

  private async verifyMesaIsAvailable(mesa: number, andar: number) {
    const andarInfo = await this.firebaseRepository.getDocument({
      databaseName: '/lugares-andares',
      id: `andar${andar}`,
    });

    const mesaInfo: IMesa = andarInfo.get(`mesa-${mesa}`);

    if (
      !mesaInfo ||
      mesaInfo.status !== gestaomesasConstants.STATUS_DISPONIVEL
    ) {
      throw new AppError('Mesa is not available.');
    }
  }

  private async saveFirebaseInfo({ mesa, andar, userId }: RequestDTO) {
    const dataSaidaRefeitorio = moment(Date.now()).add(45, 'minutes');

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
        isUsingRefeitorio: true,
        refeitorioInfo: {
          dataSaidaRefeitorio,
          mesa,
          andar,
        },
      },
    });
  }
}
