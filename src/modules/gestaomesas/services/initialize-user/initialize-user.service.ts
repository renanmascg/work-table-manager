import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { FIREBASE_REPOSITORY_NAME } from '@shared/constants/providers';
import IFirebaseRepository from '@shared/infra/firebase/repositories/IFirebaseRepository';

interface RequestDTO {
  identificadorGestor: boolean;
  userId: string;
}

@Injectable()
export class InitializeUserService implements OnModuleInit {
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

  public async exec({
    identificadorGestor,
    userId,
  }: RequestDTO): Promise<void> {
    if (identificadorGestor === undefined) {
      return;
    }

    const user = await this.firebaseRepository.getDocument({
      databaseName: '/usuarios',
      id: userId,
    });

    if (user.exists) {
      return;
    }

    await this.firebaseRepository.createUpdateDocument({
      collectionName: '/usuarios',
      docId: userId,
      data: {
        identificadorGestor,
        isUsandoMesa: false,
        possuiAgendamento: false,
        agendamentos: [],
        checkinHoje: false,
      },
    });
  }
}
