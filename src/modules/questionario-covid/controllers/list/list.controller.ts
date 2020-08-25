/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CreateUpdateListService } from '@modules/questionario-covid/services/create-update-list/create-update-list.service';
import {
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('questionario-covid')
export class ListController {
  constructor(private createUpdateList: CreateUpdateListService) {}

  @Post('/list')
  @UseInterceptors(FileInterceptor('lista'))
  public async updateList(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @UploadedFile() file: any,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      await this.createUpdateList.exec(file);

      return res.status(204).json({ status: 'List Created' });
    } catch (error) {
      return res.status(error.status).json({ err: error.message });
    }
  }
}
