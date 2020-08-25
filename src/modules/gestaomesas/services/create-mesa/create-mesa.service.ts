import IMesa from '@modules/gestaomesas/dtos/IMesa';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { FIREBASE_REPOSITORY_NAME } from '@shared/constants/providers';
import IFirebaseRepository from '@shared/infra/firebase/repositories/IFirebaseRepository';
import AppError from '@shared/infra/http/error/appError';

interface RequestDTO {
  mesa: number;
  andar: number;
  status: string;
}

@Injectable()
export class CreateMesaService implements OnModuleInit {
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

  public async exec(data: RequestDTO): Promise<IMesa> {
    if (!data.mesa || !data.andar || !data.status) {
      throw new AppError('Parameters Missing');
    }

    await this.verifyMesaAlreadyExists(data);

    const newMesa = await this.createNewMesa(data);

    return newMesa;
  }

  private async verifyMesaAlreadyExists(data: RequestDTO): Promise<void> {
    const andarInfo = await this.firebaseRepository.getDocument({
      databaseName: '/lugares-andares',
      id: `andar${data.andar}`,
    });

    const mesa: IMesa = andarInfo.get(`mesa-${data.mesa}`);

    if (mesa !== undefined) {
      throw new AppError('Mesa Already exists at this Andar');
    }
  }

  private async createNewMesa(data: RequestDTO): Promise<IMesa> {
    const newMesa: IMesa = {
      agendamentos: [],
      usuarioId: '',
      andar: data.andar,
      mesa: data.mesa,
      status: data.status,
    };

    await this.firebaseRepository.createUpdateDocument({
      collectionName: '/lugares-andares',
      docId: `andar${data.andar}`,
      data: {
        [`mesa-${data.mesa}`]: newMesa,
      },
    });

    return newMesa;
  }
}
