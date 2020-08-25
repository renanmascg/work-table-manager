import UsersPermissionRepository from '@modules/questionario-covid/repositories/UsersPermissionRepository';
import { Injectable } from '@nestjs/common';
import AppError from '@shared/infra/http/error/appError';
import neatCSV from 'neat-csv';

@Injectable()
export class CreateUpdateListService {
  constructor(private usersPermission: UsersPermissionRepository) {}

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async exec(file: any): Promise<void> {
    try {
      if (!file) {
        throw new AppError('File CSV must be sent');
      }

      const jsonCsv = await neatCSV(file.buffer);

      await this.usersPermission.delete({});

      const newList = this.usersPermission.create(jsonCsv);

      await this.usersPermission.save(newList);
    } catch (e) {
      console.log(e);
      throw new AppError('Could Not read file');
    }
  }
}
